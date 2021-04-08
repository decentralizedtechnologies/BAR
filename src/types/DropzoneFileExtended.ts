import { DropzoneFile } from "dropzone";
import { UnixFSEntry } from "ipfs-core-types/src/files";
import { Observable } from "rxjs";
import { IPFSResponse } from "./IPFSResponse";

export type DropzoneFileExtended = {
  progressObservable: Observable<number>;
  ipfsResultObservable: Observable<UnixFSEntry>;
  setIpfsResult: (key: string, value: IPFSResponse) => void;
  setProgress: (key: string, value: number) => void;
} & DropzoneFile;
