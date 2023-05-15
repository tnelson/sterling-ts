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
import { EDGE_PRECISION} from './Constants'


export interface EdgeProps {
  obj1: VisualObject;
  obj2: VisualObject;
  lineProps?: LineProps;
  textProps?: TextBoxProps;
  textLocation?: string;
  fast_imprecise ?: boolean;
}

export class Edge extends VisualObject {
  obj1: VisualObject;
  obj2: VisualObject;
  obj2CoordsStore: Coords;
  obj1CoordsStore: Coords;
  obj2Coords: () => Coords;
  obj1Coords: () => Coords;
  text: string | undefined;
  lineProps: LineProps; // Using lineProps object instead
  textProps: TextBoxProps;
  textLocation: string;
  fast_imprecise: boolean;

  //the simplest design of this is as a pointer between two objects
  constructor(props: EdgeProps) {
    // Renamed props for consistency
    super();
    this.obj1 = props.obj1;
    this.obj2 = props.obj2;
    this.textProps = props.textProps ?? {};
    this.lineProps = props.lineProps ?? { points: [] };
    this.textLocation = props.textLocation ?? "none";
    this.obj1CoordsStore = {x:0,y:0}
    this.obj2CoordsStore = {x:0,y:0}
    this.fast_imprecise = props.fast_imprecise ?? false;
    this.obj1Coords = () => {
      return { x: 0, y: 0 };
    };
    this.obj2Coords = () => {
      return { x: 0, y: 0 };
    };
    this.compute_points(EDGE_PRECISION);
    this.makeLine();
    this.makeText();
  }

  compute_points(precision: number) {
    const target_point: Coords = mid_point(
      //we set a point to fast_imprecise distance from
      this.obj1.center(),
      this.obj2.center()
    );
    this.obj2Coords = () => this.opt_points(target_point, this.obj2, precision, "obj1");
    this.obj1Coords = () => this.opt_points(target_point, this.obj1, precision, "obj2");
  }

  opt_points(
    // Factor into utility?
    target_point: Coords,
    obj: VisualObject,
    precision: number,
    coordsStore: string //indicate if we want to modify this for obj1 or obj2
  ): Coords {
    if(this.fast_imprecise){
      //if the user wants to fast_imprecise edge production, we create a range (obj.boundingBox() )that our
      //final location values could fall between. If the current stores for edge location are
      //within these ranges we just return whatever we currently have
      let currGuess:Coords;
      if(coordsStore == "obj1"){
        currGuess = this.obj1CoordsStore;
      }
      else if(coordsStore == "obj2"){
        currGuess = this.obj1CoordsStore;
      }
      else{
        throw "bad arg for coordsstore"
      }

      if(currGuess.x < obj.boundingBox().bottom_right.x && currGuess.x > obj.boundingBox().top_left.x
      && currGuess.y > obj.boundingBox().bottom_right.y && currGuess.y < obj.boundingBox().top_left.y)
      {
        return currGuess;  
      }

    }

    const boundary_points = pointsOnBorder(obj.getLam(), precision);
    const ret = get_minimum_distance(target_point, boundary_points);
    if(coordsStore == "obj1"){
      this.obj1CoordsStore = ret;
    }
    else if(coordsStore == "obj2"){
      this.obj2CoordsStore = ret;
    }
    else{
      throw "bad arg for coordsstore"
    }
    return ret;
  }

  makeLine() {
    // TODO: Figure out if need a deep copy here instead
    this.lineProps.points = [this.obj1Coords, this.obj2Coords];
    let line: Line = new Line(this.lineProps);
    this.children.push(line);
  }

  makeText() {
    if(this.textLocation == "none"){
      return;
    }
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
