import { DropzoneFile } from "dropzone";
import { UnixFSEntry } from "ipfs-core-types/src/files";
import { Observable } from "rxjs";
import { useSubscription } from "../../../../hooks/useSubscription/useSubscription";

export type DropzoneFileExtended = {
  progressObservable: Observable<number>;
  ipfsResultObservable: Observable<UnixFSEntry>;
  setIpfsResult: (key: string, value: UnixFSEntry) => void;
  setProgress: (key: string, value: number) => void;
} & DropzoneFile;

export type DropzonePreviewFileProps = {
  file: DropzoneFileExtended;
};

export type DropzonePreviewProps = {
  files: DropzoneFileExtended[];
};

export const DropzonePreviewFile: React.FC<DropzonePreviewFileProps> = ({ file }) => {
  const progress = useSubscription(0, file.progressObservable);
  const ipfsResult = useSubscription({}, file.ipfsResultObservable);

  const { name } = file;

  return (
    <div>
      {name}
      <div style={{ width: `${progress}%`, height: "3px", background: "black" }}></div>
      <a
        href={`https://ipfs.infura.io/ipfs/${ipfsResult.path && ipfsResult.path}`}
        target="_blank"
        rel="nofollow"
      >
        {ipfsResult.path && ipfsResult.path}
      </a>
    </div>
  );
};

export const DropzonePreview: React.FC<DropzonePreviewProps> = ({ files }) => {
  return (
    <div id="dropzone-preview">
      {files.map((file) => (
        <DropzonePreviewFile key={file.upload.uuid} file={file} />
      ))}
    </div>
  );
};
