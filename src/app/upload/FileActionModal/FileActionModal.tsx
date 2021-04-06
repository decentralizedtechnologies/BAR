import { FileActionType } from "../../../types/FileActionType";
import { Button } from "../../../ui/button/Button";
import { Modal } from "../../../ui/modal/Modal";
import { IPFSFile } from "../dropzone/DropzonePreview";
import styles from "./FileActionModal.module.scss";

export const FileActionModal: React.FC<{
  fileActionType: FileActionType;
  onClose: () => void;
  file: IPFSFile;
}> = ({ fileActionType, onClose, file }) => {
  return (
    <Modal
      isOpened={fileActionType !== undefined}
      withCloseIcon
      onClose={onClose}
      aria-labelledby="File Actions Modal"
    >
      {fileActionType === FileActionType.ethereum_create_erc721 && (
        <>
          <Modal.Header className={styles["file-action-modal__header"]}>
            <span>ethereum</span>
            <h2>Create an ERC721 contract</h2>
            <a
              href={`https://ipfs.infura.io/ipfs/${file.path && file.path}`}
              target="_blank"
              rel="nofollow"
              className={styles["file-action-modal__file-link"]}
            >
              {file.path && file.name && file.name}
            </a>
          </Modal.Header>
          <Modal.Content>
            <h3>What will happen?</h3>
            <p>
              This action will deploy a new ERC721 Solidity contract to the Ethereum network
              that’s set on your wallet.
            </p>

            <p>
              Your wallet is going to ask you to sign a “create contract” transaction. This is the
              contract you are creating.
            </p>
            <p>
              Once the transaction is complete, you can add “files” to the contract stored as a
              URL referencing to your file’s JSON metadata.
            </p>
            <p>
              You'll get back an Ethereum contract address: <code>0x123abc...</code>
            </p>
            <h3>Pre-requisites</h3>
            <p>
              An Ethereum wallet browser extension, such as{" "}
              <a href="https://metamask.io/" target="_blank">
                Metamask
              </a>
              .
            </p>
            <p>A minimum ETH balance to cover the transaction cost.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button size="s" variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button size="s" color="dark">
              Create Contract
            </Button>
          </Modal.Actions>
        </>
      )}

      {fileActionType === FileActionType.ethereum_erc721_add_file && (
        <>
          <Modal.Header className={styles["file-action-modal__header"]}>
            <span>ethereum</span>
            <h2>Add file to an existing ERC721 contract</h2>
          </Modal.Header>
          <Modal.Content>Content</Modal.Content>
          <Modal.Actions>
            <Button size="s" variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button size="s" color="dark">
              Create Contract
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};
