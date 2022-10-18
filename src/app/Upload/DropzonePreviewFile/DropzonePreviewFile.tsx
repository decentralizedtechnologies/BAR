import clsx from "clsx";
import fileSize from "filesize";
import { useSubscription } from "../../../hooks/useSubscription/useSubscription";
import styles from "./DropzonePreviewFile.module.scss";
import { DropzonePreviewFileProps } from "./DropzonePreviewFile.types";

export const DropzonePreviewFile: React.FC<DropzonePreviewFileProps> = ({ file }) => {
  const progress: number = useSubscription(0, file.progressObservable);
  const ipfsResult = useSubscription({}, file.ipfsResultObservable);

  const { name } = file;

  return (
    <div className={styles["dropzone-preview-file"]}>
      {ipfsResult.path ? (
        <a
          href={`https://infura-ipfs.io/ipfs/${ipfsResult.path && ipfsResult.path}`}
          target="_blank"
          rel="nofollow"
          className={clsx(styles["dropzone-preview-file__file-name"])}
        >
          {ipfsResult.path && name}
        </a>
      ) : (
        <p className={styles["dropzone-preview-file__file-name"]}>{name}</p>
      )}

      <div
        className={clsx(styles["dropzone-preview-file__progress-rail"], {
          [styles["dropzone-preview-file__progress-rail--hide"]]: ipfsResult.path,
        })}
      >
        <div className={styles["dropzone-preview-file__progress-track"]} style={{ width: `${progress}%` }} />
      </div>

      <p className={styles["dropzone-preview-file__file-size"]}>
        {`${progress.toFixed(0)}%`} of {fileSize(file.upload.total)}
      </p>
    </div>
  );
};
