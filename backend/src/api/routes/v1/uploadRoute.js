const express = require("express");
const router = express.Router();
const { upload, uploadFile, uploadFileLocally, uploadFolder } = require("../../controllers/UploadController");

router.post("/file", upload.single("file"), uploadFile);
router.post("/localFile", upload.single("file"), uploadFileLocally);
router.post("/localFolder", uploadFolder);

module.exports = router;
