export type Styles = {
  'icon-button': string;
  'icon-button--extra-small': string;
  'icon-button--large': string;
  'icon-button--loading': string;
  'icon-button--medium': string;
  'icon-button--small': string;
  'icon-button--super-extra-small': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
