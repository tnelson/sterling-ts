import { Line } from './Line';
import { Shape } from './Shape';
import { TextBox } from './Textbox';
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
    const target_point: Coords = this.mid_point(
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

    return this.get_minimum_distance(target_point, boundary_points);
  }
  get_minimum_distance(target_point: Coords, compare_points: Coords[]): Coords {
    let curr_min_point: Coords = compare_points[0];
    if (compare_points.length == 0) {
      throw "Error: no points to compare. Talk to Sidney about this one I'd say. Problem in Edge.ts";
    }
    compare_points.forEach((p) => {
      if (
        this.distance(p, target_point) <
        this.distance(curr_min_point, target_point)
      ) {
        curr_min_point = p;
      }
    });
    return curr_min_point;
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
  render(svg) {
    const makeLine = new Line([this.obj1Coords, this.obj2Coords]);
    makeLine.render(svg);
    if (this.text) {
      const makeText = new TextBox(
        this.text,
        this.mid_point(
          //we set a point to optimize distance from
          this.obj1.center(),
          this.obj2.center()
        )
      );
      makeText.render(svg)
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
