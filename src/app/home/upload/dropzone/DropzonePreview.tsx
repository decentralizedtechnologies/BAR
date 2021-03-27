import clsx from "clsx";
import { DropzoneFile } from "dropzone";
import filesize from "filesize";
import { UnixFSEntry } from "ipfs-core-types/src/files";
import { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { IPFSResponse } from "../../../../hooks/useIPFS/IPFSResponse";
import { useLocalStorage } from "../../../../hooks/useLocalStorage/useLocalStorage";
import { useSubscription } from "../../../../hooks/useSubscription/useSubscription";
import { Button } from "../../../../ui/button/Button";
import { FilesIcon } from "../../../../ui/icons/FilesIcon";
import styles from "./DropzonePreview.module.scss";

export type DropzoneFileExtended = {
  progressObservable: Observable<number>;
  ipfsResultObservable: Observable<UnixFSEntry>;
  setIpfsResult: (key: string, value: IPFSResponse) => void;
  setProgress: (key: string, value: number) => void;
} & DropzoneFile;

export type IPFSFile = {
  name: string;
} & IPFSResponse;

export type DropzonePreviewFileProps = {
  file: DropzoneFileExtended;
};

export type DropzonePreviewLocalFileProps = {
  file: IPFSFile;
};

export type DropzonePreviewProps = {
  files: DropzoneFileExtended[];
};

export const DropzonePreviewFile: React.FC<DropzonePreviewFileProps> = ({ file }) => {
  const progress: number = useSubscription(0, file.progressObservable);
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
        {ipfsResult.path && "open"}
      </a>
      <p className={styles["dropzone-preview-file__file-size"]}>
        {`${progress.toFixed(0)}%`} of {filesize(file.upload.total)}
      </p>
    </div>
  );
};

export const DropzonePreviewLocalFile: React.FC<DropzonePreviewLocalFileProps> = ({ file }) => {
  return (
    <div className={styles["dropzone-preview-file"]}>
      <p className={styles["dropzone-preview-file__file-name"]}>{file.name}</p>
      <a
        href={`https://ipfs.infura.io/ipfs/${file.path && file.path}`}
        target="_blank"
        rel="nofollow"
        className={clsx(styles["dropzone-preview-file__ipfs-path"], {
          [styles["dropzone-preview__ipfs-path--hide"]]: !file.path,
        })}
      >
        {file.path && "open"}
      </a>
      <p className={styles["dropzone-preview-file__file-size"]}>{filesize(file.size)} — local</p>
    </div>
  );
};

export const DropzonePreview: React.FC<DropzonePreviewProps> = ({ files }) => {
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
      <div className={styles["dropzone-preview__wrapper"]}>
        <Button
          size="s"
          color="dark"
          rightIcon={<FilesIcon />}
          onClick={handleDisplayDropzonePreview}
          variant="outlined"
        >
          Your files
        </Button>
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
            {localFiles.map((file) => (
              <DropzonePreviewLocalFile key={file.path} file={file} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
