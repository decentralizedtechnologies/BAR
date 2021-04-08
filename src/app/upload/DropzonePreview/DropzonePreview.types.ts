import { DropzoneFileExtended } from "../../../types/DropzoneFileExtended";
import { FileActionType } from "../../../types/FileActionType";
import { IPFSFile } from "../../../types/IPFSFile";

export type DropzonePreviewProps = {
  files: DropzoneFileExtended[];
  onClickFileAction: (type: FileActionType, file: IPFSFile) => void;
};
