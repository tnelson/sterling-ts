import { Line } from './Line';
import { jarvisAlgo } from './geometricHelpers';
import { Coords } from './Utility';
import { VisualObject } from './VisualObject';
import * as d3 from 'd3';

export interface HullProps {
  objs: VisualObject[];
  simplePopulate ?: boolean; //determine if we want to 
  //populate hull with only object center points
  //more relevant to testing honestly
}

export class Hull extends VisualObject {
  pts: Coords[];
  simplePopulate:boolean;

  constructor(props: HullProps) {
    super();
    this.simplePopulate = props.simplePopulate ?? false;
    this.pts = jarvisAlgo(this.populatePoints(props.objs));
  }

  populatePoints(objs: VisualObject[]): Coords[] {
    let pts: Coords[] = [];

    if(this.simplePopulate){
      //simple population of hull points (just object centers)
      objs.forEach((obj) => {
        pts.push({x:obj.center().x, y:obj.center().y});
      });
    }
    else{
      objs.forEach((obj) => {
        const bb = obj.boundingBox();
        pts.push(bb.top_left);
        pts.push(bb.bottom_right);
        pts.push({ x: bb.top_left.x, y: bb.bottom_right.y });
        pts.push({ x: bb.bottom_right.x, y: bb.top_left.y });
        // //append all 4 corners
      });
    }
  
    return pts;
  }

  override render(svg: any) {
    const l = new Line({ points: this.pts });
    l.render(svg);
  }
}