import dynamic from "next/dynamic";
import { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useObservable } from "../../../hooks/useObservable/useObservable";
import { Button } from "../../../ui/button/Button";
import { Modal } from "../../../ui/modal/Modal";
import { NavBar } from "../../../ui/navbar/NavBar";
import { DropzoneProps } from "./dropzone/Dropzone";
import { DropzoneFileExtended, DropzonePreviewProps } from "./dropzone/DropzonePreview";
import styles from "./Upload.module.scss";

const Dropzone = dynamic<DropzoneProps>(
  () => import("./dropzone/Dropzone").then((mod) => mod.Dropzone),
  {
    ssr: false,
  }
);

const DropzonePreview = dynamic<DropzonePreviewProps>(
  () => import("./dropzone/DropzonePreview").then((mod) => mod.DropzonePreview),
  {
    ssr: false,
  }
);

export const Upload = () => {
  const [files, setFiles] = useState<DropzoneFileExtended[]>([]);
  const observable = useObservable();

  const extendFiles = (files: Array<DropzoneFileExtended>) => {
    for (const file of files) {
      file.progressObservable = observable.create(file.upload.uuid, 0);
      file.setProgress = observable.set;

      file.ipfsResultObservable = observable.create(`${file.upload.uuid}-ipfs-result`, {});
      file.setIpfsResult = observable.set;
    }

    setFiles([...files]);

    return files;
  };

  return (
    <div className={styles["upload"]}>
      <NavBar />

      <Modal isOpened withCloseIcon onClose={() => null} aria-labelledby="File Actions Modal">
        <Modal.Header className={styles["upload__modal--header"]}>
          <span>ethereum</span>
          <h2>Create an ERC721 Contract</h2>
        </Modal.Header>
        <Modal.Content>Content</Modal.Content>
        <Modal.Actions>
          <Button size="s" variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button size="s" color="dark">
            Create Contract
          </Button>
        </Modal.Actions>
      </Modal>

      <DropzonePreview files={files} />

      <Dropzone onFilesAdded={extendFiles} />

      <div className={styles.upload__heading}>
        <Container>
          <Row>
            <Col lg={7}>
              <h1>
                <span>Blockchain — Agnostic</span>
                <span>Asset Registry</span>
              </h1>
            </Col>
            <Col lg={4}>
              <h2>
                Upload any file type to a <strong>decentralized storage network</strong> and do
                things with it.
              </h2>
              <p>eg. create an NFT in Ethereum</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
