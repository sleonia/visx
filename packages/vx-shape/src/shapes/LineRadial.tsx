import React from 'react';
import cx from 'classnames';
import { radialLine, RadialLine } from 'd3-shape';
import { LinePathProps } from './LinePath';
import setNumberOrNumberAccessor from '../util/setNumberOrNumberAccessor';
import { AddSVGProps } from '../types';
import { AccessorForArrayItem } from '../types/accessor';

export type LineRadialProps<Datum> = Pick<
  LinePathProps<Datum>,
  'className' | 'curve' | 'data' | 'defined' | 'fill' | 'innerRef'
> & {
  /** Override render function which is passed the configured path generator as input. */
  children?: (args: { path: RadialLine<Datum> }) => React.ReactNode;
  /** Returns the angle value in radians for a given Datum, with 0 at -y (12 o’clock). */
  angle?: number | AccessorForArrayItem<Datum, number>;
  /** Returns the radius value in radians for a given Datum, with 0 at the center. */
  radius?: number | AccessorForArrayItem<Datum, number>;
};

export default function LineRadial<Datum>({
  className,
  angle,
  radius,
  defined,
  curve,
  data = [],
  innerRef,
  children,
  fill = 'transparent',
  ...restProps
}: AddSVGProps<LineRadialProps<Datum>, SVGPathElement>) {
  const path = radialLine<Datum>();
  if (angle) setNumberOrNumberAccessor(path.angle, angle);
  if (radius) setNumberOrNumberAccessor(path.radius, radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-line-radial', className)}
      d={path(data) || ''}
      fill={fill}
      {...restProps}
    />
  );
}
