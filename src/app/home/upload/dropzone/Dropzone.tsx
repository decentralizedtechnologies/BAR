import clsx from "clsx";
import DropzoneJS from "dropzone";
import { useEffect, useRef } from "react";
import { useIPFSUpload } from "../../../../hooks/useIPFSUpload/useIPFSUpload";
import { UploadIcon } from "../../../../ui/icons/UploadIcon";
import styles from "./Dropzone.module.scss";
import { DropzoneFileExtended } from "./DropzonePreview";

export type DropzoneProps = {
  onFilesAdded: (files: DropzoneJS.DropzoneFile[]) => DropzoneFileExtended[];
};

DropzoneJS.autoDiscover = false;

export const Dropzone: React.FC<DropzoneProps> = ({ onFilesAdded }) => {
  const dropzoneRef = useRef<DropzoneJS>(null);
  const ipfs = useIPFSUpload();

  useEffect(() => {
    if (dropzoneRef.current) {
      return;
    }

    dropzoneRef.current = new DropzoneJS("#dropzone", {
      url: "/",
      parallelUploads: 10,
      createImageThumbnails: false,
      uploadMultiple: true,
    });

    dropzoneRef.current.on("addedfiles", (files: DropzoneJS.DropzoneFile[]) => {
      ipfs.queue(onFilesAdded(files));
    });
  }, []);

  return (
    <div className={styles.dz__wrapper}>
      <section id="dropzone" className={clsx(`dropzone`, styles.dz)}>
        <div className={clsx("dz-message", styles.dz__message)}>
          Drop Files Here
          <UploadIcon className={styles["dz__message--upload-icon"]} />
        </div>
      </section>
    </div>
  );
};
