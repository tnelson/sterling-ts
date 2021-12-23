import { NodeDef } from '@/graph-svg';
import { useMemo } from 'react';
import { applyToPoint } from 'transformation-matrix';
import { useInteractions } from '../../providers/InteractionProvider';
import { NodeLabel } from '../NodeLabel/NodeLabel';
import { Shape } from '../Shape/Shape';

const NodeGroup = (props: NodeDef) => {
  const { id, position, shape, style, labels } = props;
  const { spreadMatrix } = useInteractions();

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
};

export { NodeGroup };
