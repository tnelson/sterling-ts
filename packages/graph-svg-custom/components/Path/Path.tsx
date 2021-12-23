import { Vector2 } from '@/vector2';
import { CSSProperties, useLayoutEffect, useMemo, useRef } from 'react';
import { applyToPoint } from 'transformation-matrix';
import { useInteractions } from '../../providers/InteractionProvider';
import { CurveDef } from '../../types';
import { arrowheadId } from '../ArrowHead/arrowheadId';
import { pathGenerator } from './pathGenerator';

export interface PathProps {
  path: Vector2[];
  curve: CurveDef;
  style: CSSProperties;
  onRender?: (path: SVGPathElement) => void;
}

const Path = (props: PathProps) => {
  const { path, curve, style, onRender } = props;
  const { spreadMatrix } = useInteractions();

  const hoverRef = useRef<SVGPathElement>(null);
  const renderRef = useRef<SVGPathElement>(null);

  const transformedPath = useMemo(
    () => path.map((pt) => applyToPoint(spreadMatrix, pt)),
    [path, spreadMatrix]
  );
  const generator = useMemo(() => pathGenerator(curve), [curve]);
  const d = useMemo(
    () => generator(transformedPath) || '',
    [generator, transformedPath]
  );
  const marker = `url(#${arrowheadId(10, style.stroke)})`;

  useLayoutEffect(() => {
    const hover = hoverRef.current;
    const render = renderRef.current;
    if (hover && render) {
      const length = hover.getTotalLength();
      const point = hover.getPointAtLength(length - 10);
      render.setAttribute(
        'd',
        generator([...transformedPath.slice(0, -1), point]) || ''
      );
    }
    if (onRender && hoverRef.current) onRender(hoverRef.current);
  }, [onRender]);

  return (
    <>
      <path ref={renderRef} style={style} markerEnd={marker} />
      <path
        ref={hoverRef}
        d={d}
        stroke='transparent'
        strokeWidth={11}
        fill='none'
      />
    </>
  );
};

export { Path };
