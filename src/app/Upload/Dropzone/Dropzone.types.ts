import { DropzoneFile } from "dropzone";
import { DropzoneFileExtended } from "../../../types/DropzoneFileExtended";

export type DropzoneProps = {
  onFilesAdded: (files: DropzoneFile[]) => DropzoneFileExtended[];
};
