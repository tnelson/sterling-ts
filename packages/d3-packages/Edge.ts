import { Line, LineProps } from './Line';
import { Shape } from './Shape';
import { TextBox, TextBoxProps } from './Textbox';
import {
  distance,
  lineAngle,
  mid_point,
  get_minimum_distance,
  bounding_box_to_lambda,
  normalize
} from './geometricHelpers';
import { VisualObject } from './VisualObject';
import { BoundingBox, Coords, pointsOnBorder } from './Utility';

export interface EdgeProps {
  obj1: VisualObject;
  obj2: VisualObject;
  lineProps: LineProps;
  textProps: TextBoxProps;
  textLocation: string;
}

export class Edge extends VisualObject {
  obj1: VisualObject;
  obj2: VisualObject;
  obj2Coords: () => Coords;
  obj1Coords: () => Coords;
  text: string | undefined;
  lineProps: LineProps; // Using lineProps object instead
  textProps: TextBoxProps;
  textLocation: string;
  visible_points: Coords[];
  boundary_points: Coords[];

  //the simplest design of this is as a pointer between two objects
  constructor(props: EdgeProps) {
    // Renamed props for consistency
    super();
    this.obj1 = props.obj1;
    this.obj2 = props.obj2;
    this.textProps = props.textProps ?? {};
    this.lineProps = props.lineProps ?? { points: [] };
    this.textLocation = props.textLocation;

    this.obj1Coords = () => {
      return { x: 0, y: 0 };
    };
    this.obj2Coords = () => {
      return { x: 0, y: 0 };
    };
    this.boundary_points = [];
    this.visible_points = [];
    this.compute_points(360);
    this.makeLine();
    this.makeText();
  }

  compute_points(precision: number) {
    const target_point: Coords = mid_point(
      //we set a point to optimize distance from
      this.obj1.center(),
      this.obj2.center()
    );
    this.obj2Coords = () => this.opt_points(target_point, this.obj2, precision);
    this.obj1Coords = () => this.opt_points(target_point, this.obj1, precision);
  }

  opt_points(
    // Factor into utility?
    target_point: Coords,
    obj: VisualObject,
    precision: number
  ): Coords {
    //want a way to check if any object has a specific function
    //if(func)
    let boundingBoxLam: (r: number) => Coords; //this should be number. But typescript...

    if (obj.hasLam()) {
      boundingBoxLam = obj.getLam();
    } else {
      boundingBoxLam = bounding_box_to_lambda(obj.boundingBox());
    }
    // let boundingBoxLam: (r: number) => Coords = obj.getLam()
    
    const boundary_points: Coords[] = pointsOnBorder(boundingBoxLam, precision);

    this.visible_points = boundary_points;
    this.boundary_points = boundary_points;
    const ret = get_minimum_distance(target_point, boundary_points);
    return ret;


  }

  makeLine() {
    // TODO: Figure out if need a deep copy here instead
    this.lineProps.points = [this.obj1Coords, this.obj2Coords];
    let line: Line = new Line(this.lineProps);
    this.children.push(line);
  }

  makeText() {
    let text: TextBox = new TextBox(this.textProps);

    let angle: () => number = () =>
      lineAngle(this.obj1Coords(), this.obj2Coords());
    let textBounding: () => BoundingBox = () => text.boundingBox();
    let cornerDist: () => number = () => {
      return Math.sqrt(
        Math.pow(text.fontSize(), 2) +
          Math.pow(text.text().length * 0.14 * text.fontSize(), 2)
      );
    };
    let lineMidPoint: () => Coords = () =>
      mid_point(this.obj1Coords(), this.obj2Coords());

    switch (this.textLocation) {
      case 'above':
        text.setCenter(() => {
          return {
            x:
              lineMidPoint().x + Math.cos(angle() - Math.PI / 2) * cornerDist(),
            y: lineMidPoint().y + Math.sin(angle() - Math.PI / 2) * cornerDist()
          };
        });
        break;
      case 'below':
        text.setCenter(() => {
          return {
            x:
              lineMidPoint().x + Math.cos(angle() + Math.PI / 2) * cornerDist(),
            y: lineMidPoint().y + Math.sin(angle() + Math.PI / 2) * cornerDist()
          };
        });
        break;
      case 'left':
        text.setCenter(() => {
          if (angle() <= 0) {
            return {
              x:
                lineMidPoint().x +
                Math.cos(angle() - Math.PI / 2) * cornerDist(),
              y:
                lineMidPoint().y +
                Math.sin(angle() - Math.PI / 2) * cornerDist()
            };
          } else {
            return {
              x:
                lineMidPoint().x +
                Math.cos(angle() + Math.PI / 2) * cornerDist(),
              y:
                lineMidPoint().y +
                Math.sin(angle() + Math.PI / 2) * cornerDist()
            };
          }
        });
        break;
      case 'right':
        text.setCenter(() => {
          if (angle() <= 0) {
            return {
              x:
                lineMidPoint().x +
                Math.cos(angle() + Math.PI / 2) * cornerDist(),
              y:
                lineMidPoint().y +
                Math.sin(angle() + Math.PI / 2) * cornerDist()
            };
          } else {
            return {
              x:
                lineMidPoint().x +
                Math.cos(angle() - Math.PI / 2) * cornerDist(),
              y:
                lineMidPoint().y +
                Math.sin(angle() - Math.PI / 2) * cornerDist()
            };
          }
        });
        break;
      case 'clockwise':
        text.setCenter(() => {
          let normalizedDiff: Coords = normalize({
            x: this.obj2Coords().x - this.obj1Coords().x,
            y: this.obj2Coords().y - this.obj1Coords().y
          });
          return {
            x: lineMidPoint().x - normalizedDiff.y * cornerDist(),
            y: lineMidPoint().y + normalizedDiff.x * cornerDist()
          };
        });
        break;
      case 'counterclockwise':
        text.setCenter(() => {
          let normalizedDiff: Coords = normalize({
            x: this.obj2Coords().x - this.obj1Coords().x,
            y: this.obj2Coords().y - this.obj1Coords().y
          });
          return {
            x: lineMidPoint().x + normalizedDiff.y * cornerDist(),
            y: lineMidPoint().y - normalizedDiff.x * cornerDist()
          };
        });
        break;
    }

    this.children.push(text);
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
