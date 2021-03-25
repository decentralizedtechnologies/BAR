export type Styles = {
  "dropzone-preview": string;
  "dropzone-preview__dismiss-overlay": string;
  "dropzone-preview__files": string;
  "dropzone-preview__info-text-box": string;
  "dropzone-preview__visible": string;
  "dropzone-preview__wrapper": string;
  "dropzone-preview-file": string;
  "dropzone-preview-file__file-name": string;
  "dropzone-preview-file__file-size": string;
  "dropzone-preview-file__ipfs-path": string;
  "dropzone-preview-file__ipfs-path--hide": string;
  "dropzone-preview-file__progress-rail": string;
  "dropzone-preview-file__progress-rail--hide": string;
  "dropzone-preview-file__progress-track": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
