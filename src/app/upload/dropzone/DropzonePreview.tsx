import clsx from "clsx";
import { DropzoneFile } from "dropzone";
import filesize from "filesize";
import { UnixFSEntry } from "ipfs-core-types/src/files";
import { useEffect, useState } from "react";
import { Observable } from "rxjs";
import { IPFSResponse } from "../../../hooks/useIPFS/IPFSResponse";
import { useLocalStorage } from "../../../hooks/useLocalStorage/useLocalStorage";
import { useSubscription } from "../../../hooks/useSubscription/useSubscription";
import { FileActionType } from "../../../types/FileActionType";
import { IconButton } from "../../../ui/iconButton/IconButton";
import { ChevronRightCircleIcon } from "../../../ui/icons/ChevronRightCircleIcon";
import { FilesIcon } from "../../../ui/icons/FilesIcon";
import { VerticalEllipsisIcon } from "../../../ui/icons/VerticalEllipsisIcon";
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
  onClickFileAction: (type: FileActionType, file: IPFSFile) => void;
};

export type DropzonePreviewProps = {
  files: DropzoneFileExtended[];
  onClickFileAction: (type: FileActionType, file: IPFSFile) => void;
};

export const DropzonePreviewFile: React.FC<DropzonePreviewFileProps> = ({ file }) => {
  const progress: number = useSubscription(0, file.progressObservable);
  const ipfsResult = useSubscription({}, file.ipfsResultObservable);

  const { name } = file;

  return (
    <div className={styles["dropzone-preview-file"]}>
      {ipfsResult.path ? (
        <a
          href={`https://ipfs.infura.io/ipfs/${ipfsResult.path && ipfsResult.path}`}
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
        <div
          className={styles["dropzone-preview-file__progress-track"]}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className={styles["dropzone-preview-file__file-size"]}>
        {`${progress.toFixed(0)}%`} of {filesize(file.upload.total)}
      </p>
    </div>
  );
};

export const DropzonePreviewLocalFile: React.FC<DropzonePreviewLocalFileProps> = ({
  file,
  onClickFileAction,
}) => {
  const [isActionsMenuVisible, displayActionsMenu] = useState(false);

  const handleDisplayActionsMenu = () => displayActionsMenu(!isActionsMenuVisible);

  return (
    <div className={styles["dropzone-preview-file"]} onClick={handleDisplayActionsMenu}>
      <div className={styles["dropzone-preview-file__actions"]}>
        <VerticalEllipsisIcon />
      </div>
      <a
        href={`https://ipfs.infura.io/ipfs/${file.path && file.path}`}
        target="_blank"
        rel="nofollow"
        className={clsx(styles["dropzone-preview-file__file-name"])}
      >
        {file.path && file.name && file.name}
      </a>
      <p className={styles["dropzone-preview-file__file-size"]}>{filesize(file.size)} — local</p>

      {isActionsMenuVisible && (
        <div className={styles["dropzone-preview-file__menu"]}>
          <a
            className={clsx(
              styles["dropzone-preview-file__menu--action"],
              styles["dropzone-preview-file__menu--action-link"]
            )}
            href={`https://ipfs.infura.io/ipfs/${file.path && file.path}`}
            target="_blank"
          >
            <div>
              <p>Open file</p>
            </div>
            <div>
              <ChevronRightCircleIcon />
            </div>
          </a>
          <div
            className={styles["dropzone-preview-file__menu--action"]}
            onClick={() => onClickFileAction(FileActionType.share_file, file)}
          >
            <div>
              <p>Share file</p>
            </div>
            <div>
              <ChevronRightCircleIcon />
            </div>
          </div>
          <div
            className={styles["dropzone-preview-file__menu--action"]}
            onClick={() => onClickFileAction(FileActionType.ethereum_create_erc721, file)}
          >
            <div>
              <span>ethereum</span>
              <p>Create an ERC721 contract</p>
            </div>
            <div>
              <ChevronRightCircleIcon />
            </div>
          </div>
          <div
            className={styles["dropzone-preview-file__menu--action"]}
            onClick={() => onClickFileAction(FileActionType.ethereum_erc721_add_file, file)}
          >
            <div>
              <span>ethereum</span>
              <p>Add file to an existing ERC721 contract</p>
            </div>
            <div>
              <ChevronRightCircleIcon />
            </div>
          </div>
          <div
            className={styles["dropzone-preview-file__menu--action"]}
            onClick={() => onClickFileAction(FileActionType.arweave_pin_to_permaweb, file)}
          >
            <div>
              <span>arweave</span>
              <p>Pin file to the Arweave permaweb</p>
            </div>
            <div>
              <ChevronRightCircleIcon />
            </div>
          </div>
          <div
            className={styles["dropzone-preview-file__menu--action"]}
            onClick={() => onClickFileAction(FileActionType.filecoin_pin, file)}
          >
            <div>
              <span>filecoin</span>
              <p>Pin file to the Filecoin chain</p>
            </div>
            <div>
              <ChevronRightCircleIcon />
            </div>
          </div>
        </div>
      )}

      {isActionsMenuVisible && (
        <div
          className={styles["dropzone-preview-file__menu--dismiss-overlay"]}
          onClick={handleDisplayActionsMenu}
        />
      )}
    </div>
  );
};

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
