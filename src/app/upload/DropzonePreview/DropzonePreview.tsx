import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage";
import { IPFSFile } from "../../../types/IPFSFile";
import { IconButton } from "../../../ui/iconButton/IconButton";
import { FilesIcon } from "../../../ui/icons/FilesIcon";
import { DropzonePreviewFile } from "../DropzonePreviewFile/DropzonePreviewFile";
import { DropzonePreviewLocalFile } from "../DropzonePreviewLocalFile/DropzonePreviewLocalFile";
import styles from "./DropzonePreview.module.scss";
import { DropzonePreviewProps } from "./DropzonePreview.types";

export const DropzonePreview: React.FC<DropzonePreviewProps> = ({ files, onClickFileAction }) => {
  const ls = useLocalStorage();
  const [displayDropzonePreview, setDisplayDropzonePreview] = useState(false);
  const localFiles = ls.get<IPFSFile[]>("files", "[]");

  const handleDisplayDropzonePreview = () => setDisplayDropzonePreview(!displayDropzonePreview);

  useEffect(() => {
    setDisplayDropzonePreview(files.length > 0);
  }, [files]);

  return (
    <>
      {displayDropzonePreview && (
        <div
          className={styles["dropzone-preview__dismiss-overlay"]}
          onClick={handleDisplayDropzonePreview}
        />
      )}
      <div
        id="dropzone-preview"
        className={clsx(styles["dropzone-preview"], {
          [styles["dropzone-preview__visible"]]: displayDropzonePreview,
        })}
      >
        <div className={styles["dropzone-preview__top"]}>
          <IconButton
            size="s"
            color="primary"
            onClick={handleDisplayDropzonePreview}
            variant="outlined"
          >
            <FilesIcon />
          </IconButton>
        </div>
        <div className={styles["dropzone-preview__info-text-box"]}>
          <p>
            Your files are stored in the Inter Planetary File System network — IPFS. A reference
            to your files is stored in your browser local storage. The BAR doesn’t store your
            files or any data associated to them. Uploading the same file should generate the same
            IPFS ID, this is how you know it’s original.
          </p>
        </div>
        <div className={styles["dropzone-preview__files"]}>
          {files.map((file, i) => (
            <DropzonePreviewFile key={`${file.upload.uuid}-${i}`} file={file} />
          ))}
          {localFiles.map((file, i) => (
            <DropzonePreviewLocalFile
              key={`${file.path}-${i}`}
              file={file}
              onClickFileAction={onClickFileAction}
            />
          ))}
        </div>
      </div>
    </>
  );
};
