import clsx from "clsx";
import fileSize from "filesize";
import { useState } from "react";
import { FileActionType } from "../../../types/FileActionType";
import { ChevronRightCircleIcon } from "../../../ui/icons/ChevronRightCircleIcon";
import { VerticalEllipsisIcon } from "../../../ui/icons/VerticalEllipsisIcon";
import styles from "./DropzonePreviewLocalFile.module.scss";
import { DropzonePreviewLocalFileProps } from "./DropzonePreviewLocalFile.types";

export const DropzonePreviewLocalFile: React.FC<DropzonePreviewLocalFileProps> = ({ file, onClickFileAction }) => {
  const [isActionsMenuVisible, displayActionsMenu] = useState(false);

  const handleDisplayActionsMenu = () => displayActionsMenu(!isActionsMenuVisible);

  return (
    <div className={styles["dropzone-preview-file"]} onClick={handleDisplayActionsMenu}>
      <div className={styles["dropzone-preview-file__actions"]}>
        <VerticalEllipsisIcon />
      </div>
      <a
        href={`https://infura-ipfs.io/ipfs/${file.path && file.path}`}
        target="_blank"
        rel="nofollow"
        className={clsx(styles["dropzone-preview-file__file-name"])}
      >
        {file.path && file.name && file.name}
      </a>
      <p className={styles["dropzone-preview-file__file-size"]}>{fileSize(file.size)} — local</p>

      {isActionsMenuVisible && (
        <div className={styles["dropzone-preview-file__menu"]}>
          <a
            className={clsx(
              styles["dropzone-preview-file__menu--action"],
              styles["dropzone-preview-file__menu--action-link"],
            )}
            href={`https://infura-ipfs.io/ipfs/${file.path && file.path}`}
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
        <div className={styles["dropzone-preview-file__menu--dismiss-overlay"]} onClick={handleDisplayActionsMenu} />
      )}
    </div>
  );
};
