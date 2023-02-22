import { Shape } from './Shape';
import { require as d3require } from 'd3-require';
const d3 = require('d3');
import { VisualObject } from './VisualObject';
import { BoundingBox, Coords, toFunc, averagePath, shiftList, boundsOfList } from './Utility';
import {
  DEFAULT_COLOR,
  DEFAULT_LINE_COLOR,
  DEFAULT_STROKE_WIDTH
} from './Constants';

export class Line extends VisualObject {
  pointsRelative: (() => Coords)[];
  color: () => string;
  width: () => number;
  opacity: () => number;

  /**
   * Creates a line on the given poitns.
   * @param points list of points for the line to pass through
   * @param color color of line
   * @param width width of line
   * @param opacity of the line
   */
  constructor(
      points: Coords[] | (() => Coords)[], 
      color?: string | (() => string), 
      width?: number | (() => number),
      opacity?: number | (() => number)) {

    let pointsUnshifted: (() => Coords)[] = points.map(
        (point): (() => Coords) => toFunc({x: 0, y: 0}, point))

    super((): Coords => {
      return averagePath(pointsUnshifted.map((coordFunc) => coordFunc()))
      });

    
    this.pointsRelative = shiftList(pointsUnshifted, this.center)
    this.color = toFunc(DEFAULT_LINE_COLOR, color);
    this.width = toFunc(DEFAULT_STROKE_WIDTH, width);
    this.opacity = toFunc(1, opacity)
  }

  boundingBox(): BoundingBox {
    return boundsOfList(this.pointsRelative.map((pointFn) => {return {
      x: pointFn().x + this.center().x,
      y: pointFn().y + this.center().y
    }}));
  }

  setColor(color: string | (() => string)) { this.color = toFunc(this.color(), color); }
  setWidth(width: number | (() => number)) { this.width = toFunc(this.width(), width); }
  setOpacity(opacity: number | (() => number)) {this.opacity = toFunc(this.opacity(), opacity)}

  override render(svg: any) {
    let truePoints: Coords[] = this.pointsRelative.map((pointFn): Coords => {return {
      x: pointFn().x + this.center().x,
      y: pointFn().y + this.center().y
    }}
    )
    let path = d3.path();
    path.moveTo(truePoints[0].x, truePoints[0].y);
    truePoints.forEach((point: Coords) => {
      path.lineTo(point.x, point.y);
    });
    d3.select(svg)
      .append('path')
      .attr('d', path)
      .attr('stroke-width', this.width())
      .attr('stroke', this.color())
      .attr('opacity', this.opacity())
      .attr('fill', 'transparent'); // Should prob make easier in future.
    super.render(svg);
  }
}