import {Shape} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import { averagePath, boundsOfList, shiftList, BoundingBox, Coords, toFunc } from './Utility';

/**
 * Class Representing Polygonal objects. Takes the form of any
 * series of points, and will form a polygon with said points as the boundary.
 */
export class Polygon extends Shape{
    pointsRelative: (() => Coords)[]

    /**
     * Constructs a polygon object
     * @param points list of points forming outside
     * @param color color of interior
     * @param borderWidth width of the border
     * @param borderColor color of the border
     * @param label text to label with
     * @param labelColor color of label text
     * @param labelSize size of the label
     */
    constructor(
        points: Coords[] | (() => Coords)[],
        color?: string | (() => string),
        borderWidth?: number | (() => number),
        borderColor?: string | (() => string),
        label?: string | (() => string),
        labelColor?: string | (() => string),
        labelSize?: number | (() => number)
    ){
        let pointsUnshifted: (() => Coords)[] = points.map(
            (point): (() => Coords) => toFunc({x: 0, y: 0}, point))

        super(
            (): Coords => {
            return averagePath(pointsUnshifted.map((coordFunc) => coordFunc()))
            }, 
            color, borderWidth, borderColor, label, labelColor, labelSize)

        this.pointsRelative = shiftList(pointsUnshifted, this.center)
    }

    boundingBox(): BoundingBox {
        return boundsOfList(this.pointsRelative.map((pointFn) => {return {
        x: pointFn().x + this.center().x,
        y: pointFn().y + this.center().y
        }}));
    }

    render(svg: any){
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
        path.closePath()
        d3.select(svg)
            .append('path')
            .attr('d', path)
            .attr('stroke-width', this.borderWidth)
            .attr('stroke', this.borderColor)
            .attr('fill', this.color) 
        super.render(svg)
    }
}