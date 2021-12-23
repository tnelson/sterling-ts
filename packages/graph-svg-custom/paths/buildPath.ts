import { PositionedNode, RoutedEdge } from '@/graph-lib';
import { ShapeDef } from '@/graph-svg';
import { subtract, Vector2 } from '@/vector2';
import { defaultTo } from 'lodash';
import { edgePoint } from './edgePoint';

export function buildPath<N extends PositionedNode, E extends RoutedEdge>(
  edge: E,
  source: N,
  sourceShape: ShapeDef,
  target: N,
  targetShape: ShapeDef
): Vector2[] {
  const waypoints = edge.waypoints || [];

  const sourceAdj = defaultTo(waypoints[0], target);
  const sourceDir = subtract(sourceAdj, source);
  const sourcePoint = edgePoint(source, sourceShape, sourceDir, 0);

  const targetAdj = defaultTo(waypoints[waypoints.length - 1], source);
  const targetDir = subtract(targetAdj, target);
  const targetPoint = edgePoint(target, targetShape, targetDir, 0);
  return [sourcePoint, ...waypoints, targetPoint];
}
