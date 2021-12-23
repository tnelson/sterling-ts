import { PropsWithChildren, useMemo, useRef, HTMLAttributes } from 'react';
import { useDimensions } from './hooks/useDimensions';

const GraphSVGDiv = (
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>
) => {
  const { children, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(ref);
  const width = useMemo(() => dimensions?.width, [dimensions]);
  const height = useMemo(() => dimensions?.height, [dimensions]);
  const viewBox = useMemo(() => {
    return width && height
      ? `${-width / 2} ${-height / 2} ${width} ${height}`
      : undefined;
  }, [width, height]);

  return (
    <div ref={ref} {...rest}>
      <svg viewBox={viewBox} preserveAspectRatio='xMidYMid slice'>
        {children}
      </svg>
    </div>
  );
};

export { GraphSVGDiv };
