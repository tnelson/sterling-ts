import { ArrowDef } from '@/graph-svg';
import { memo } from 'react';
import { arrowheadId } from './arrowheadId';

const ArrowHead = memo(
  (props: ArrowDef) => {
  const { size, style } = props;
  const id = arrowheadId(size, style);
  const half = size / 2;
  // Note: the arrowhead coloring may not match the line coloring in React *dev* mode.
  return (
    <marker
      id={id}
      viewBox={`0 0 ${size} ${size}`}
      refX={0}
      refY={half}
      markerWidth={size}
      markerHeight={size}
      markerUnits={'userSpaceOnUse'}
      orient={'auto'}          
      fill={style?.stroke}
      stroke={style?.stroke}
    >
      <path d={`M 0 0 L ${size} ${half} L 0 ${size} z`} />      
    </marker>
  );
});

export { ArrowHead };
