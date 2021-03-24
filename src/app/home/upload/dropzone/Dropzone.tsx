import clsx from "clsx";
import DropzoneJS from "dropzone";
import { useEffect, useRef } from "react";
import { useIPFSUpload } from "../../../../hooks/useIPFSUpload/useIPFSUpload";
import styles from "./Dropzone.module.scss";
import { DropzoneFileExtended } from "./DropzonePreview";

export type DropzoneProps = {
  onFilesAdded: (files: DropzoneJS.DropzoneFile[]) => DropzoneFileExtended[];
};

DropzoneJS.autoDiscover = false;

export const Dropzone: React.FC<DropzoneProps> = ({ onFilesAdded }) => {
  const dropzoneRef = useRef<DropzoneJS>(null);
  const ipfsUpload = useIPFSUpload();

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
      ipfsUpload.queue(onFilesAdded(files));
    });
  }, []);

  return (
    <div className={styles.dz__wrapper}>
      <section id="dropzone" className={clsx(`dropzone`, styles.dz)}>
        <div className="dz-message">Drop a File</div>
      </section>
    </div>
  );
};
