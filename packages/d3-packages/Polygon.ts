import {Shape, ShapeProps} from './Shape'
import { require as d3require } from 'd3-require';
const d3 = require("d3")
import { averagePath, boundsOfList, shiftList, BoundingBox, Coords, toFunc } from './Utility';

export interface PolygonProps extends ShapeProps {
    points: Coords[] | (() => Coords)[]
}

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
    constructor(props: PolygonProps){
        let pointsUnshifted: (() => Coords)[] = props.points.map(
            (point): (() => Coords) => toFunc({x: 0, y: 0}, point))
        
        props.center = (): Coords => {
            return averagePath(pointsUnshifted.map((coordFunc) => coordFunc()))
            }, 
        
        super(props)
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
            .attr('opacity', this.opacity()) 
        super.render(svg)
    }
}