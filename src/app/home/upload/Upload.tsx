import dynamic from "next/dynamic";
import { useState } from "react";
import { useObservable } from "../../../hooks/useObservable/useObservable";
import { NavBar } from "../../../ui/navbar/NavBar";
import { DropzoneProps } from "./dropzone/Dropzone";
import { DropzoneFileExtended, DropzonePreview } from "./dropzone/DropzonePreview";
import styles from "./Upload.module.scss";

const Dropzone = dynamic<DropzoneProps>(
  () => import("./dropzone/Dropzone").then((mod) => mod.Dropzone),
  {
    ssr: false,
  }
);

export const Upload = () => {
  const [files, setFiles] = useState<DropzoneFileExtended[]>([]);
  const observable = useObservable();

  const extendFiles = (files: Array<DropzoneFileExtended>) => {
    const extendedFiles = files.map((file) => {
      file.progressObservable = observable.create(file.upload.uuid, 0);
      file.setProgress = observable.set;

      file.ipfsResultObservable = observable.create(`${file.upload.uuid}-ipfs-result`, {});
      file.setIpfsResult = observable.set;
      return file;
    });

    setFiles(extendedFiles);

    return extendedFiles;
  };

  return (
    <div className={styles["upload"]}>
      <NavBar>
        <DropzonePreview files={files} />
      </NavBar>

      <Dropzone onFilesAdded={extendFiles} />
    </div>
  );
};
