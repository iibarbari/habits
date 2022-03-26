import classNames from 'classnames';
import React from 'react';
import styles from './Layout.module.css';

type Props = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, {
  verticallyCenter?: boolean;
}>

export default function Layout({
  className, children, verticallyCenter = false, ...props
}: Props) {
  return (
    <div
      className={classNames(
        styles.layout,
        verticallyCenter && styles['vertically-centered'],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
