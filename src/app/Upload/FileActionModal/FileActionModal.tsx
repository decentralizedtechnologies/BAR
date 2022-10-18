import { FileActionType } from "../../../types/FileActionType";
import { IPFSFile } from "../../../types/IPFSFile";
import { Button } from "../../../ui/button/Button";
import { Modal } from "../../../ui/modal/Modal";
import styles from "./FileActionModal.module.scss";

export const FileActionModal: React.FC<{
  fileActionType: FileActionType;
  onClose: () => void;
  file: IPFSFile;
}> = ({ fileActionType, onClose, file }) => {
  return (
    <Modal isOpened={fileActionType !== undefined} withCloseIcon onClose={onClose} aria-labelledby="File Actions Modal">
      {fileActionType === FileActionType.ethereum_create_erc721 && (
        <>
          <Modal.Header className={styles["file-action-modal__header"]}>
            <span>ethereum</span>
            <h2>Create an ERC721 contract</h2>
            <a
              href={`https://infura-ipfs.io/ipfs/${file.path && file.path}`}
              target="_blank"
              rel="nofollow"
              className={styles["file-action-modal__file-link"]}
            >
              {file.path && file.name && file.name}
            </a>
          </Modal.Header>
          <Modal.Content>
            <h3>Pre-requisites</h3>
            <p>
              An Ethereum wallet browser extension, such as{" "}
              <a href="https://metamask.io/" target="_blank">
                Metamask
              </a>
              .
            </p>
            <p>A minimum ETH balance to cover the transaction cost.</p>

            <h3>What will happen?</h3>
            <p>
              This action will deploy a new ERC721 Solidity contract to the Ethereum network that’s set on your wallet.
            </p>
            <p>
              Your wallet is going to ask you to sign a “create contract” transaction. This is the contract you are
              creating.
            </p>
            <p>
              Once the transaction is complete, you can add “files” to the contract stored as a URL referencing to your
              file’s JSON metadata.
            </p>
            <p>
              You'll get back an Ethereum contract address: <code>0x123abc...</code>
            </p>
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
            <a
              href={`https://infura-ipfs.io/ipfs/${file.path && file.path}`}
              target="_blank"
              rel="nofollow"
              className={styles["file-action-modal__file-link"]}
            >
              {file.path && file.name && file.name}
            </a>
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

      {fileActionType === FileActionType.filecoin_pin && (
        <>
          <Modal.Header className={styles["file-action-modal__header"]}>
            <span>filecoin</span>
            <h2>Pin file to the Filecoin chain</h2>
            <a
              href={`https://infura-ipfs.io/ipfs/${file.path && file.path}`}
              target="_blank"
              rel="nofollow"
              className={styles["file-action-modal__file-link"]}
            >
              {file.path && file.name && file.name}
            </a>
          </Modal.Header>
          <Modal.Content></Modal.Content>
          <Modal.Actions>
            <Button size="s" variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button size="s" color="dark">
              Pin to Filecoin
            </Button>
          </Modal.Actions>
        </>
      )}

      {fileActionType === FileActionType.share_file && (
        <>
          <Modal.Header className={styles["file-action-modal__header"]}>
            <h2>Share file</h2>
            <a
              href={`https://infura-ipfs.io/ipfs/${file.path && file.path}`}
              target="_blank"
              rel="nofollow"
              className={styles["file-action-modal__file-link"]}
            >
              {file.path && file.name && file.name}
            </a>
          </Modal.Header>
          <Modal.Content></Modal.Content>
          <Modal.Actions>
            <Button size="s" variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Actions>
        </>
      )}

      {fileActionType === FileActionType.arweave_pin_to_permaweb && (
        <>
          <Modal.Header className={styles["file-action-modal__header"]}>
            <span>arweave</span>
            <h2>Pin file to the Arweave permaweb</h2>
            <a
              href={`https://infura-ipfs.io/ipfs/${file.path && file.path}`}
              target="_blank"
              rel="nofollow"
              className={styles["file-action-modal__file-link"]}
            >
              {file.path && file.name && file.name}
            </a>
          </Modal.Header>
          <Modal.Content>
            <h3>Pre-requisites</h3>
            <p>
              An Arweave JSON keyfile which you can get here:{" "}
              <a href="https://faucet.arweave.net/" target="_blank" rel="nofollow">
                https://faucet.arweave.net/
              </a>
            </p>
            <p>
              <a
                href="https://docs.arweave.org/info/wallets/arweave-web-extension-wallet"
                target="_blank"
                rel="nofollow"
              >
                An Arweave wallet browser extension.
              </a>
            </p>
            <p>
              AR token balance. You can buy AR tokens{" "}
              <a href="https://coinmarketcap.com/currencies/arweave/markets/" target="_blank" rel="nofollow">
                at these markets.
              </a>
            </p>

            <h3>What will happen?</h3>
            <p>
              If your AR balance is enough to cover the transaction cost, you'll load your keyfile into the dropzone and
              confirm the transaction in your Arweave wallet browser extension.
            </p>
            <p>
              Once the transaction is complete, you'll get an Arweave URL that points to your file. This file will now
              be stored forever and no one but the wallet holder can remove it.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button size="s" variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button size="s" color="dark">
              Set Arweave keyfile
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};
