import { Line } from './Line';
import { Shape } from './Shape';
import { TextBox } from './Textbox';
import { distance, mid_point, get_minimum_distance} from './geometricHelpers';
import { VisualObject, ExperimentalBoundingBox, Coords } from './VisualObject';

export interface EdgeParams {
  obj1: VisualObject;
  obj2: VisualObject;
  text?: string;
}
export class Edge extends VisualObject {
  obj1: VisualObject;
  obj2: VisualObject;
  obj1Coords: Coords;
  obj2Coords: Coords;
  midpoint: Coords;
  text: string;
  points: Coords[];
  visible_points: Coords[];

  //the simplest design of this is as a pointer between two objects
  constructor(params: EdgeParams) {
    super();
    this.obj1 = params.obj1;
    this.obj2 = params.obj2;
    this.text = params.text;

    this.compute_points(360);
  }

  compute_points(precision) {
    const target_point: Coords = mid_point(
      //we set a point to optimize distance from
      this.obj1.center(),
      this.obj2.center()
    );
    this.obj2Coords = this.opt_points(target_point, this.obj2, precision);
    this.obj1Coords = this.opt_points(target_point, this.obj1, precision);
  }

  opt_points(
    target_point: Coords,
    obj: VisualObject,
    precision: number
  ): Coords {
    const boundary_points: Coords[] = [];
    for (let i = 1; i <= precision; i++) {
      const boundary_point: Coords = obj
        .getExperimentalBoundingBox()
        .lambda(((2 * Math.PI) / precision) * i);
      boundary_points.push(boundary_point);
    }

    this.visible_points = boundary_points;

    return get_minimum_distance(target_point, boundary_points);
  }

  render(svg) {
    const makeLine = new Line([this.obj1Coords, this.obj2Coords]);
    makeLine.render(svg);
    if (this.text) {
      const makeText = new TextBox(
        this.text,
        mid_point(
          //we set a point to optimize distance from
          this.obj1.center(),
          this.obj2.center()
        )
      );
      makeText.render(svg);
    }
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

export {};
