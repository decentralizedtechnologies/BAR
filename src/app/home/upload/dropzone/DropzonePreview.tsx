import clsx from "clsx";
import { DropzoneFile } from "dropzone";
import { UnixFSEntry } from "ipfs-core-types/src/files";
import { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { useSubscription } from "../../../../hooks/useSubscription/useSubscription";
import { IconButton } from "../../../../ui/iconButton/IconButton";
import { FilesIcon } from "../../../../ui/icons/FilesIcon";
import styles from "./DropzonePreview.module.scss";

export type DropzoneFileExtended = {
  progressObservable: Observable<number>;
  ipfsResultObservable: Observable<UnixFSEntry>;
  setIpfsResult: (key: string, value: UnixFSEntry) => void;
  setProgress: (key: string, value: number) => void;
} & DropzoneFile;

export type DropzonePreviewFileProps = {
  file: DropzoneFileExtended;
};

export type DropzonePreviewProps = {
  files: DropzoneFileExtended[];
};

export const DropzonePreviewFile: React.FC<DropzonePreviewFileProps> = ({ file }) => {
  const progress = useSubscription(0, file.progressObservable);
  const ipfsResult = useSubscription({}, file.ipfsResultObservable);

  const { name } = file;

  return (
    <div className={styles["dropzone-preview-file"]}>
      <p className={styles["dropzone-preview-file__file-name"]}>{name}</p>
      <div
        className={clsx(styles["dropzone-preview-file__progress-rail"], {
          [styles["dropzone-preview-file__progress-rail--hide"]]: ipfsResult.path,
        })}
      >
        <div
          className={styles["dropzone-preview-file__progress-track"]}
          style={{ width: `${progress}%` }}
        />
      </div>
      <a
        href={`https://ipfs.infura.io/ipfs/${ipfsResult.path && ipfsResult.path}`}
        target="_blank"
        rel="nofollow"
        className={clsx(styles["dropzone-preview-file__ipfs-path"], {
          [styles["dropzone-preview__ipfs-path--hide"]]: !ipfsResult.path,
        })}
      >
        {ipfsResult.path && ipfsResult.path}
      </a>
      <p className={styles["dropzone-preview-file__file-size"]}>350 of 5000 KB</p>
    </div>
  );
};

export const DropzonePreview: React.FC<DropzonePreviewProps> = ({ files }) => {
  const [displayDropzonePreview, setDisplayDropzonePreview] = useState(false);

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
      <div className={styles["dropzone-preview__wrapper"]}>
        <IconButton color="dark" onClick={handleDisplayDropzonePreview}>
          <FilesIcon />
        </IconButton>
        <div
          id="dropzone-preview"
          className={clsx(styles["dropzone-preview"], {
            [styles["dropzone-preview__visible"]]: displayDropzonePreview,
          })}
        >
          <div className={styles["dropzone-preview__info-text-box"]}>
            <p>
              Your files are stored in the Inter Planetary File System network — IPFS. A reference
              to your files is stored in your browser local storage. The BAR doesn’t store your
              files or any data associated to them. Uploading the same file should generate the
              same IPFS ID, this is how you know it’s original.
            </p>
          </div>
          <div className={styles["dropzone-preview__files"]}>
            {files.map((file) => (
              <DropzonePreviewFile key={file.upload.uuid} file={file} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
