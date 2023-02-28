import { Line } from './Line';
import { Shape } from './Shape';
import { TextBox } from './TextBox';
import {
  distance,
  mid_point,
  get_minimum_distance,
  bounding_box_to_lambda
} from './geometricHelpers';
import { VisualObject, Coords } from './VisualObject';

export interface EdgeParams {
  obj1: VisualObject;
  obj2: VisualObject;
  text?: string;
  arrow?: boolean;
}

function instanceOfCoords(object: any): object is Coords {
  return 'x' in object && 'y' in object;
}

export class Edge extends VisualObject {
  obj1: VisualObject;
  obj2: VisualObject;
  obj2Coords: Coords;
  obj1Coords: Coords;
  text: string | undefined;
  arrow: boolean;
  visible_points: Coords[];
  boundary_points: Coords[];

  //the simplest design of this is as a pointer between two objects
  constructor(params: EdgeParams) {
    super();
    this.obj1 = params.obj1;
    this.obj2 = params.obj2;
    this.text = params.text;

    this.obj1Coords = {x:0,y:0}
    this.obj2Coords = {x:0,y:0}
    this.boundary_points = [];
    this.visible_points = [];
    this.arrow = params.arrow ?? false;
    this.compute_points(360);
  }

  compute_points(precision: number) {
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
    //want a way to check if any object has a specific function
    //if(func)
    const boundary_points: Coords[] = [];
    let boundingBoxLam: (r: number) => Coords; //this should be number. But typescript...

    if (obj.hasLam()) {
      boundingBoxLam = obj.getLam();
    } else {
      boundingBoxLam = bounding_box_to_lambda(obj.boundingBox());
    }

    for (let i = 1; i <= precision; i++) {
      const boundary_point = boundingBoxLam(((2 * Math.PI) / precision) * i);
      if (instanceOfCoords(boundary_point)) {
        boundary_points.push(boundary_point);
      } else {
        throw 'returned bounding box response not of type coords. Issue in edge.ts';
      }
    }

    this.visible_points = boundary_points;
    this.boundary_points = boundary_points;

    return get_minimum_distance(target_point, boundary_points);
  }

  render(svg: any) {
    let makeLine: any;
    if (this.arrow) {
      makeLine = new Line([this.obj1Coords, this.obj2Coords], true);
    } else {
      makeLine = new Line([this.obj1Coords, this.obj2Coords]);
    }
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
