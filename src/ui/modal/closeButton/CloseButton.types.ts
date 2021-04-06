import { CSSProperties } from 'react';

import { ButtonProps } from 'ui/form/button/Button.types';

export type CloseButtonProps = {
  className?: string;
  style?: CSSProperties;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  onClick(): void;
};
