export type Styles = {
  button: string;
  button__content: string;
  "button__content--disabled": string;
  "button__content--loading": string;
  button__icon: string;
  "button__icon--left": string;
  "button__icon--on-left": string;
  "button__icon--right": string;
  button__loader: string;
  "button__loading-floating-border": string;
  button_primary: string;
  button_primary__icon: string;
  button_primary__icon_left: string;
  button_primary__icon_right: string;
  button_primary_invert: string;
  button_primary_large: string;
  button_primary_medium: string;
  "button--auto-size": string;
  "button--danger": string;
  "button--dark": string;
  "button--extra-small": string;
  "button--inverted": string;
  "button--large": string;
  "button--light": string;
  "button--loading": string;
  "button--medium": string;
  "button--outlined": string;
  "button--primary": string;
  "button--secondary": string;
  "button--success": string;
  "button--text": string;
  "button-outline": string;
  "button-outline__icon": string;
  "button-outline_inverse": string;
  "button-outline_inverse-thin": string;
  "button-outline_large": string;
  "button-outline_medium": string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
