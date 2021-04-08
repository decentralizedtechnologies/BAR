import { FileActionType } from "../../../types/FileActionType";
import { IPFSFile } from "../../../types/IPFSFile";

export type DropzonePreviewLocalFileProps = {
  file: IPFSFile;
  onClickFileAction: (type: FileActionType, file: IPFSFile) => void;
};
