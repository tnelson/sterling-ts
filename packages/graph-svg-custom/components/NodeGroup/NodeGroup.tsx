import { NodeDef } from '@/graph-svg';
import { memo, useMemo } from 'react';
import { applyToPoint } from 'transformation-matrix';
import { useZoom } from '../../providers/zoom/ZoomProvider';
import { NodeLabel } from '../NodeLabel/NodeLabel';
import { Shape } from '../Shape/Shape';

const NodeGroup = memo((props: NodeDef) => {
  const { id, position, shape, style, labels } = props;
  const { spreadMatrix } = useZoom();

  const translate = useMemo(() => {
    const transformed = applyToPoint(spreadMatrix, position);
    return `translate(${transformed.x} ${transformed.y})`;
  }, [position]);

  return (
    <g id={id} transform={translate}>
      <Shape shape={shape} style={style} />
      {labels && <NodeLabel label={labels} />}
    </g>
  );
});

export { NodeGroup };
