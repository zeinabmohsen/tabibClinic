import styles from "./styles/index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../utils/Http";
import { addAttachmentToRecord } from "../../actions/MedicalRecordActions";
import classNames from "classnames";

export default function AddAttachmentModal({ selectedRecord, setAttachModal }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState([]);

  const handleAddAttachment = useCallback(async () => {
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      const attachment = await axios.post("/upload/localFile", fileData);

      await dispatch(
        addAttachmentToRecord(selectedRecord, {
          attachment: attachment.data.filePath,
        })
      );

      setAttachModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, file, selectedRecord]);

  const handleSetFile = (e) => {
    setFile(e.target.files[0]);
  };
  console.log("folder", folder);

  const handleFolderUpload = useCallback(async () => {
    try {
      const folderData = new FormData();
      folderData.append("folderName", "tes2t");
      // folder[0].webkitRelativePath.split("/")[0]); //setting folder name

      // add the original folder path to the form data
      folderData.append("folderPath", folder[0])


      folder.forEach((file) => {
        folderData.append("files", file);
      });

      const attachment = await axios.post("/upload/localFolder", folderData);

      console.log(attachment);

      // await dispatch(
      //   addAttachmentToRecord(selectedRecord, {
      //     attachment: attachment.data.filePath,
      //   })
      // );

      // setAttachModal(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, folder, selectedRecord]);

  const handleSetFolder = (e) => {
    let files = e.target.files;
    let filesArray = Array.from(files);
    setFolder(filesArray);
  };

  useEffect(() => {
    console.log("folder changed", folder);
  }, [folder]);

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        // handleAddAttachment();
        handleFolderUpload();
      }}
    >
      <div className={styles.uploadContainer}>
        <div
          className={styles.upload}
          onClick={() => {
            document.getElementById("dropzone-file").click();
          }}
        >
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faFile} />
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            multiple
            required
            onChange={(e) => {
              handleSetFile(e);
            }}
          />
        </div>
        <div
          className={styles.upload}
          onClick={() => {
            document.getElementById("dropzone-folder").click();
          }}
        >
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faFolder} />
          </div>
          <input
            id="dropzone-folder"
            type="file"
            class="hidden"
            webkitdirectory="true"
            onChange={(e) => {
              handleSetFolder(e);
            }}
          />
        </div>
      </div>
      <div className={styles.fileContainer}>
        {file && (
          <div
            key={file.name}
            className={styles.file}
            onClick={() => {
              setFile(null);
            }}
          >
            <p>{file?.name}</p>
            <div
              onClick={() =>
                setFile((prev) => {
                  prev = null;
                  return prev;
                })
              }
              className={styles.delete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )}
      </div>
      {folder.length > 0 && (
        <div className={styles.folderContainer}>
          {folder.map((file, index) => (
            <div
              key={index}
              className={styles.file}
              onClick={() => {
                setFolder((prev) => {
                  prev = prev.filter((item) => item !== file);
                  return prev;
                });
              }}
            >
              <p>{file.name}</p>
              <div
                onClick={() =>
                  setFolder((prev) => {
                    prev = prev.filter((item) => item !== file);
                    return prev;
                  })
                }
                className={styles.delete}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className={classNames({
          [styles.button]: true,
          [styles.disabled]: !file && folder.length === 0,
        })}
        onClick={() => {
          if (!file && folder.length === 0) {
            return;
          }
          // handleAddAttachment();
          handleFolderUpload(); 
        }}
      >
        Create
      </button>
    </form>
  );
}
