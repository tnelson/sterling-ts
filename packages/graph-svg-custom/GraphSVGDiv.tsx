import { useDimensions } from '@/sterling-hooks';
import { PropsWithChildren, useMemo, useRef, HTMLAttributes } from 'react';
import { GraphSVG } from './GraphSVG';
import { ZoomProviderProps } from './providers/zoom/ZoomProvider';

export type GraphSVGDivProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
> &
  Pick<
    ZoomProviderProps,
    'spreadMatrix' | 'zoomMatrix' | 'onSpreadMatrix' | 'onZoomMatrix'
  >;

const GraphSVGDiv = (props: GraphSVGDivProps) => {
  const {
    children,
    spreadMatrix,
    zoomMatrix,
    onSpreadMatrix,
    onZoomMatrix,
    ...rest
  } = props;
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
      <GraphSVG
        viewBox={viewBox}
        spreadMatrix={spreadMatrix}
        onSpreadMatrix={onSpreadMatrix}
        zoomMatrix={zoomMatrix}
        onZoomMatrix={onZoomMatrix}
      >
        {children}
      </GraphSVG>
    </div>
  );
};

export { GraphSVGDiv };
