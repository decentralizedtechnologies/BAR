export type Styles = {
  'navbar': string;
  'navbar__logo': string;
  'navbar__right': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
