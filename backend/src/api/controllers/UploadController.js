const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const multer = require("multer");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");
const mv = require("mv");

// Initialize Firebase storage
// const storage = getStorage(require("../../config/firebaseConfig"));
// // Multer configuration
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// Set up storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  try {
    const storageRef = ref(storage, `files/${req.file.originalname}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    return res.send({
      message: "file uploaded to firebase storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
      success: true,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
};

const handleFileUpload = upload.single("file");

const uploadFileLocally = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ success: false, message: "No file uploaded" });
  }

  res.send({ success: true, filePath: req.file.path });
};

const uploadFolder = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      res.status(500).send("Error parsing form data");
      return;
    }

    console.log("files:", files);

    const folderName = fields.folderName;
    const folderPath = `./uploads/${folderName}`;

    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating folder:", err);
        res.status(500).send("Error creating folder");
        return;
      }

      // Array to store asynchronous file move promises
      const movePromises = [];

      for (const fileArray of Object.values(files)) {
        for (const file of fileArray) {
          const oldPath = file.filepath;
          const originalFilename = file.originalFilename.split("/").pop();
          const newPath = `${folderPath}/${originalFilename}`;

          // Move the file to the folder asynchronously
          movePromises.push(
            new Promise((resolve, reject) => {
              mv(oldPath, newPath, (err) => {
                if (err) {
                  console.error("Error moving file:", err);
                  reject(err);
                } else {
                  resolve();
                }
              });
            })
          );
        }
      }

      // Wait for all file move promises to resolve
      Promise.all(movePromises)
        .then(() => {
          res.send({
            success: true,
            message: "Folder uploaded successfully",
            folderPath,
          });
        })
        .catch((err) => {
          console.error("Error moving files:", err);
          res.status(500).send("Error moving files");
        });
    });
  });
};

module.exports = {
  upload,
  uploadFile,
  uploadFileLocally,
  handleFileUpload,
  uploadFolder,
};
