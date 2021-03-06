export type Styles = {
  "dropzone-preview-file": string;
  "dropzone-preview-file__actions": string;
  "dropzone-preview-file__file-name": string;
  "dropzone-preview-file__file-size": string;
  "dropzone-preview-file__ipfs-path": string;
  "dropzone-preview-file__ipfs-path--hide": string;
  "dropzone-preview-file__menu": string;
  "dropzone-preview-file__menu--action": string;
  "dropzone-preview-file__menu--action-link": string;
  "dropzone-preview-file__menu--dismiss-overlay": string;
  "dropzone-preview-file__progress-rail": string;
  "dropzone-preview-file__progress-rail--hide": string;
  "dropzone-preview-file__progress-track": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
