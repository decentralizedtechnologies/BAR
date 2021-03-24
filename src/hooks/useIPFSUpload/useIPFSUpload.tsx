import ipfsClient from "ipfs-http-client";
import { useCallback } from "react";
import { DropzoneFileExtended } from "../../app/home/upload/dropzone/DropzonePreview";

const ipfs = ipfsClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

export const useIPFSUpload = () => {
  let queuedFiles: DropzoneFileExtended[] = [];

  const queue = useCallback((files: DropzoneFileExtended[]) => {
    if (queuedFiles.length === 0) {
      queuedFiles = files;
    }

    if (queuedFiles.length === 0) {
      return;
    }

    const file = queuedFiles.shift();

    upload(file);
  }, []);

  const upload = useCallback(async (file: DropzoneFileExtended) => {
    try {
      const result = await ipfs.add(file, {
        progress: (bytes: number) => {
          file.setProgress(file.upload.uuid, (bytes / file.upload.total) * 100);
        },
      });

      if (result.path) {
        file.setProgress(file.upload.uuid, 100);
        file.setIpfsResult(`${file.upload.uuid}-ipfs-result`, result);
      }

      queue(queuedFiles);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { queue, upload };
};
