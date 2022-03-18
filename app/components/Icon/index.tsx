import classNames from 'classnames';
import React from 'react';

type Props = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['svg']>, {
  icon: React.PropsWithoutRef<JSX.IntrinsicElements['svg']>
  width?: number | 'auto'
  height?: number | 'auto'
}>

export default function Icon({
  className,
  height = 'auto',
  icon,
  viewBox,
  width = 16,
  ...props
}: Props) {
  const iconProps = {
    width: typeof width === 'number' ? `${width}px` : 'auto',
    height: typeof height === 'number' ? `${height}px` : 'auto',
    className: classNames(className),
    ...props,
  };

  return React.isValidElement(icon) ? React.cloneElement(icon, iconProps) : null;
}
