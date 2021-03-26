import { useCallback } from "react";
import { DropzoneFileExtended } from "../../app/home/upload/dropzone/DropzonePreview";
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import { Minty } from "../useMinty/minty";

export const useIPFS = () => {
  let queuedFiles: DropzoneFileExtended[] = [];
  const minty = new Minty();
  minty.init();
  const ls = useLocalStorage();

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
      const result = await minty.addFileToIPFS(
        file,
        { path: file.name },
        {
          progress: (bytes: number) => {
            file.setProgress(file.upload.uuid, (bytes / file.upload.total) * 100);
          },
        }
      );

      if (result.path) {
        file.setProgress(file.upload.uuid, 100);
        file.setIpfsResult(`${file.upload.uuid}-ipfs-result`, result);
      }

      const files = ls.get("files", "[]");
      files.push(result);
      ls.set("files", files);

      queue(queuedFiles);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { queue, upload };
};
