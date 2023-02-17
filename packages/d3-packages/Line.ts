import { Shape } from './Shape';
import { require as d3require } from 'd3-require';
const d3 = require('d3');
import { VisualObject } from './VisualObject';
import { BoundingBox, Coords, toFunc, averagePath } from './Utility';
import {
  DEFAULT_COLOR,
  DEFAULT_LINE_COLOR,
  DEFAULT_STROKE_WIDTH
} from './Constants';

export class Line extends VisualObject {
  pointsRelative: (() => Coords)[];
  color: () => string;
  width: () => number;

  /**
   * Creates a line on the given poitns.
   * @param points list of points for the line to pass through
   * @param color color of line
   * @param width width of line
   */
  constructor(
      points: Coords[] | (() => Coords)[], 
      color?: string | (() => string), 
      width?: number | (() => number)) {
    let pointsUnshifted: (() => Coords)[] = points.map(
        (point): (() => Coords) => toFunc({x: 0, y: 0}, point))
    super(averagePath(pointsUnshifted));
    this.points = points;
    this.color = color ?? DEFAULT_LINE_COLOR;
    this.width = width ?? DEFAULT_STROKE_WIDTH;
  }

  boundingBox(): BoundingBox {
    return boundsOfList(this.points);
  }
  setColor(color: string) {
    this.color = color;
  }
  setWidth(width: number) {
    this.width = width;
  }

  // Using averagePath utility to return rough center
  center(): Coords {
    return averagePath(this.points);
  }

  override render(svg: any) {
    let path = d3.path();
    path.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach((point: Coords) => {
      path.lineTo(point.x, point.y);
    });
    d3.select(svg)
      .append('path')
      .attr('d', path)
      .attr('stroke-width', this.width)
      .attr('stroke', this.color)
      .attr('fill', 'transparent'); // Should prob make easier in future.
    super.render(svg);
  }
}