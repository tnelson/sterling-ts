import { Line } from './Line';
import { getWrapPts } from './geometricHelpers';
import { Coords } from './Utility';
import { VisualObject } from './VisualObject';
import * as d3 from 'd3';

export interface HullProps {
  objs: VisualObject[];
}

export class Hull extends VisualObject {
  pts: Coords[];

  constructor(props: HullProps) {
    super(); //I dooooooon't want to compute the center for this object
    //later

    this.pts = getWrapPts(this.populatePoints(props.objs));
  }

  populatePoints(objs: VisualObject[]): Coords[] {
    objs.sort(() => Math.random() - 0.5)
    let pts: Coords[] = [];
    objs.forEach((obj) => {
      const bb = obj.boundingBox();
      pts.push(bb.top_left);
      pts.push(bb.bottom_right);
      pts.push({ x: bb.top_left.x, y: bb.bottom_right.y });
      pts.push({ x: bb.bottom_right.x, y: bb.top_left.y });
      //append all 4 corners
    });
    return pts;
  }

  override render(svg: any) {
    const l = new Line({ points: this.pts });
    l.render(svg);
  }
}
