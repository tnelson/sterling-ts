import { forwardRef, PropsWithChildren, SVGAttributes, useRef } from 'react';
import { toString } from 'transformation-matrix';
import {
  useZoom,
  ZoomProvider,
  ZoomProviderProps
} from './providers/zoom/ZoomProvider';

const SVG = forwardRef<SVGSVGElement>(
  (props: PropsWithChildren<SVGAttributes<SVGSVGElement>>, ref) => {
    const { children, ...rest } = props;
    const { mouseDown, mouseMove, mouseUp, spread, zoom, zoomMatrix } =
      useZoom();
    return (
      <svg
        ref={ref}
        preserveAspectRatio='xMidYMid slice'
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onWheel={(event) => {
          if (event.shiftKey) {
            spread(event);
          } else {
            zoom(event);
          }
        }}
        {...rest}
      >
        <g transform={toString(zoomMatrix)}>{children}</g>
      </svg>
    );
  }
);

export type GraphSVGProps = PropsWithChildren<SVGAttributes<SVGSVGElement>> &
  Pick<
    ZoomProviderProps,
    'spreadMatrix' | 'zoomMatrix' | 'onSpreadMatrix' | 'onZoomMatrix'
  >;

const GraphSVG = (props: GraphSVGProps) => {
  const { spreadMatrix, zoomMatrix, onSpreadMatrix, onZoomMatrix, ...rest } =
    props;
  const svgRef = useRef<SVGSVGElement>(null);
  return (
    <ZoomProvider
      spreadMatrix={spreadMatrix}
      onSpreadMatrix={onSpreadMatrix}
      zoomMatrix={zoomMatrix}
      onZoomMatrix={onZoomMatrix}
      svg={svgRef.current}
    >
      <SVG ref={svgRef} {...rest} />
    </ZoomProvider>
  );
};

export { GraphSVG };
