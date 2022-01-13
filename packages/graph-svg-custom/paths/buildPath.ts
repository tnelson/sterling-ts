import { PositionedNode, RoutedEdge } from '@/graph-lib';
import { ShapeDef } from '@/graph-svg';
import { subtract, Vector2 } from '@/vector2';
import { defaultTo } from 'lodash';
import { applyToPoint, Matrix } from 'transformation-matrix';
import { edgePoint } from './edgePoint';

export function buildPath<N extends PositionedNode, E extends RoutedEdge>(
  edge: E,
  source: N,
  sourceShape: ShapeDef,
  target: N,
  targetShape: ShapeDef,
  spreadMatrix: Matrix
): Vector2[] {
  const waypoints = edge.waypoints || [];

  const src = applyToPoint(spreadMatrix, source);
  const trg = applyToPoint(spreadMatrix, target);
  const wps = waypoints.map((pt) => applyToPoint(spreadMatrix, pt));

  const sourceAdj = defaultTo(wps[0], trg);
  const sourceDir = subtract(sourceAdj, src);
  const sourcePoint = edgePoint(src, sourceShape, sourceDir, 0);

  const targetAdj = defaultTo(wps[wps.length - 1], src);
  const targetDir = subtract(targetAdj, trg);
  const targetPoint = edgePoint(trg, targetShape, targetDir, 0);
  return [sourcePoint, ...wps, targetPoint];
}
