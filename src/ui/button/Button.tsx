/* eslint-disable react/button-has-type */
import React, { ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';

import { ButtonProps, DefaultButtonProps, LinkButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      isLoading = false,
      color = 'primary',
      type = 'button',
      variant = 'contained',
      size = 'm',
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className,
      as: TagName = 'button',
      'aria-label': ariaLabel,
      ...restProps
    },
    ref,
  ) => {
    const classNames = clsx(
      styles.button,
      {
        // colors
        [styles['button--primary']]: color === 'primary',
        [styles['button--secondary']]: color === 'secondary',
        [styles['button--success']]: color === 'success',
        [styles['button--danger']]: color === 'danger',
        [styles['button--dark']]: color === 'dark',
        [styles['button--light']]: color === 'light',
        // variants
        [styles['button--outlined']]: variant === 'outlined',
        [styles['button--inverted']]: variant === 'inverted',
        [styles['button--text']]: variant === 'text',
        // sizes
        [styles['button--extra-small']]: size === 'xs',
        [styles['button--auto-size']]: size === 'auto',
        [styles['button--medium']]: size === 'm',
        [styles['button--large']]: size === 'l',
        // loader
        [styles['button--loading']]: isLoading,
      },
      className,
    );

    const content = (
      <>
        {isLoading && (
          <>
            <div className={styles.button__loader} />
            <div className={styles['button__loading-floating-border']} />
          </>
        )}
        {leftIcon && <div className={styles['button__icon--left']}>{leftIcon}</div>}
        <div
          className={clsx(styles.button__content, {
            [styles['button__content--loading']]: isLoading,
            [styles['button__content--disabled']]: disabled,
          })}
        >
          {children}
        </div>
        {rightIcon && <div className={styles['button__icon--right']}>{rightIcon}</div>}
      </>
    );

    if (TagName === 'a') {
      return (
        <a
          className={classNames}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          aria-label={isLoading && !ariaLabel ? 'loading' : ariaLabel}
          {...(restProps as LinkButtonProps)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        type={TagName === 'button' ? type : undefined}
        className={classNames}
        disabled={TagName === 'button' ? disabled || isLoading : undefined}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        aria-label={isLoading && !ariaLabel ? 'loading' : ariaLabel}
        {...(restProps as DefaultButtonProps)}
      >
        {content}
      </button>
    );
  },
);
