import { BoundingBox } from './VisualObject';
import { Coords } from './VisualObject';

function distance(
  //computes the distance between two given points
  p1: Coords,
  p2: Coords //a helper in the compute_points method in which we compute the distance between two points
): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function mid_point(p1: Coords, p2: Coords): Coords {
  //given a line, finds the midpoint of that line
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  };
}

function get_minimum_distance(
  target_point: Coords,
  compare_points: Coords[]
): Coords {
  //given a set of coordinates and a single, target, point
  //returns the coordinates of the closest of the inputted points.
  let curr_min_point: Coords = compare_points[0];
  if (compare_points.length == 0) {
    throw `Error: no points to compare. Talk to Sidney about this one I'd say.
     Problem in geometricHelpers.ts`;
  }
  compare_points.forEach((p) => {
    if (distance(p, target_point) < distance(curr_min_point, target_point)) {
      curr_min_point = p;
    }
  });
  return curr_min_point;
}

function bounding_box_to_lambda(
  boundingBox: BoundingBox
): (r: number) => Coords {
  //given a rectangle bound, returns a bounding box lambda (defined in visualObject)

  //no idea how to get inverse tangent
  //we'll call that function tangent

  //we create 4 quadrants of our rectangle - such quadrants are formed by
  //2 bisecting lines from opposite pairs of corners
  return (rinp: number) => {
    //shrink our radians down to the following
    const r = rinp % (2* Math.PI);
    // const s = r + " , "+ rinp;
    // throw s;

    //unfold the data a bit (note: each of these is a coords object)
    const topLeft: Coords = boundingBox.top_left;
    const bottomRight: Coords = boundingBox.bottom_right;

    const height = Math.abs(topLeft.y - bottomRight.y);
    const width = Math.abs(topLeft.x - bottomRight.x);

    //should be arcTan!!!!!!!
    //this gives the angle(in radians of the bisecting line going from
    //bottom left to top right)
    const barrierAngle = Math.atan(height / width);

    // throw barrierAngle;

    //Case 1: 0 <= r <= barrierAngle
    if (2 * Math.PI - barrierAngle <= r || r <= barrierAngle) {
      const xval = bottomRight.x;
      let yval: number;
      if (r > Math.PI) {
        yval = bottomRight.y - (height / 2) + (Math.tan(2*Math.PI - r) * width) / 2;
      } else {
        yval = bottomRight.y - (height) + (Math.tan(r) * width) / 2 ;

      }
      return { x: xval, y: yval };
    }
    //Case 2: barrierAngle < r < pi - barrierAngle
    else if (barrierAngle < r && r <= Math.PI - barrierAngle) {
      let xval: number;
      if (r > Math.PI/2) {
        xval = topLeft.x + height/(2*Math.tan(r - Math.PI/4));
      } else {
        xval = topLeft.x + width/2 + height/(2*Math.tan(r));
      }
      const yval = topLeft.y;
      return { x: xval, y: yval };
    }
    //Case 3: pi - barrierAngle <= r <= pi + barrierAngle
    else if (Math.PI - barrierAngle < r && r < Math.PI + barrierAngle) {
      const xval: number = topLeft.x;
      let yval: number;
      if (r < Math.PI) {
        yval = topLeft.y + height/2 - (width*Math.tan(Math.PI - r)/2)

        // yval = topLeft.y + height/2 - (width*Math.tan(Math.PI - r)/2)
      } else {
        yval = topLeft.y + height/2 + Math.abs((Math.tan(r - Math.PI) * width)) / 2;
      }

      return { x: xval, y: yval };
    }
    //Case 4: 2pi - barrierAngle < r < 2pi
    else if (Math.PI + barrierAngle < r || r < 2 * Math.PI - barrierAngle) {
      let xval: number;
      const yval = bottomRight.y;

      if (r < (3 * Math.PI) / 2) {
        xval = (bottomRight.x - width) + height * (Math.tan(3*Math.PI/2 - r))/2;
      } else {
        xval = (bottomRight.x - width/2) + height * (Math.tan(r - 3*Math.PI/2))/2;
      }
      return { x: xval, y: yval };
    } else {
      throw 'not supposed to get to this case. Error in geometricHelpers.ts';
    }
  };
}

export { distance, mid_point, get_minimum_distance, bounding_box_to_lambda};
