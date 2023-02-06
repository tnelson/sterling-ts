import { Line } from './Line';
import { Shape } from './Shape';
import { VisualObject, ExperimentalBoundingBox, Coords } from './VisualObject';

export interface EdgeParams {
  obj1: VisualObject;
  obj2: VisualObject;
  text?: string;
}
interface Point {
  index: number;
  coords: Coords;
}
export class Edge extends VisualObject {
  obj1: VisualObject;
  obj2: VisualObject;
  text: String;
  points: Coords[];
  //the simplest design of this is as a pointer between two objects
  constructor(params: EdgeParams) {
    super();
    this.obj1 = params.obj1;
    this.obj2 = params.obj2;
    this.text = params.text;

    this.compute_points(20);
  }

  compute_points(num_points) {
    const target_point: Coords = this.mid_point(
      //we set a point to optimize distance from
      this.obj1.center(),
      this.obj2.center()
    );
  }

  opt_points(target_point: Coords, obj: VisualObject, precision: number) {
    const boundary_points: Point[] = [];
    for (let i = 1; i <= precision; i++) {
      const boundary_point: Point = {
        index: i,
        coords: { x: 0, y: 0 }
      };
    }
  }
  distance(
    p1: Coords,
    p2: Coords //a helper in the compute_points method in which we compute the distance between two points
  ): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  mid_point(p1: Coords, p2: Coords): Coords {
    //given a line, finds the midpoint of that line
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2
    };
  }
}

/**
 * TODO:
 *  - where will the text be? "Middle" of line?
 *
 *  - Where will edge point? Thought - have bounding box "better" implemented
 *
 *    - IDEA: bounding box is given by a lambda that takes in the center of a shape. For more "complex" shapes where we actually
 *  want a "good" bounding box, we return an equation to get the bounding box for the circle. Practically, we want
 *  the arrow to point to __sorta__ the closest edge point of a given shape. But this doesn't need to be exact
 *  to look nice. Even better: a lambda that takes in a center point and a direction
 *
 */
