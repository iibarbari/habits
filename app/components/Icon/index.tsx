import classNames from 'classnames';
import React from 'react';

type Props = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['svg']>, {
  icon: React.PropsWithoutRef<JSX.IntrinsicElements['svg']>
  width?: number
  height?: number
}>

export default function Icon({
  className,
  height = 16,
  icon,
  width = 16,
  ...props
}: Props) {
  const iconProps = {
    width: `${width}px`,
    height: `${height}px`,
    className: classNames(className),
    ...props,
  };

  return React.isValidElement(icon) ? React.cloneElement(icon, iconProps) : null;
}
