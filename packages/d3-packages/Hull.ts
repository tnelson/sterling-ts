import { Line } from './Line';
import { jarvisAlgo } from './geometricHelpers';
import { Coords , pointsOnBorder} from './Utility';
import { VisualObject } from './VisualObject';
import * as d3 from 'd3';
import { Circle } from './Circle';

export interface HullProps {
  objs: VisualObject[];
  fuzz: number; //space around each point
}

export class Hull extends VisualObject {
  pts: Coords[];
  fuzz:number;

  constructor(props: HullProps) {
    super();
    this.fuzz = props.fuzz ?? 0;
    this.pts = jarvisAlgo(this.populatePoints(props.objs));
  }

  populatePoints(objs: VisualObject[]): Coords[] {
    let pts: Coords[] = [];

    if(this.fuzz == 0){
      //simple population of hull points (just object centers)
      objs.forEach((obj) => {
        pts.push({x:obj.center().x, y:obj.center().y});
      });
    }
    else{
      objs.forEach((obj) => { //build a circle around the object (of radius given by fuzz)
        const objFuzz = new Circle({radius: this.fuzz, center: obj.center()});
        const fuzzPts = pointsOnBorder(objFuzz.getLam(), 4);
        fuzzPts.forEach(p => pts.push(p));
      });
    }
  
    return pts;
  }

  override render(svg: any) {
    const l = new Line({ points: this.pts });
    l.render(svg);
  }
}