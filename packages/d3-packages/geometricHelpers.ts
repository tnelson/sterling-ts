import { VisualObject, BoundingBox } from './VisualObject';
import { Coords, ExperimentalBoundingBox } from './VisualObject';

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
    const r = (rinp % 2) * Math.PI;

    //unfold the data a bit (note: each of these is [x,y])
    const topLeft: Coords = boundingBox.top_left;
    const bottomRight: Coords = boundingBox.bottom_right;

    const height = Math.abs(topLeft[1] - bottomRight[1]);
    const width = Math.abs(topLeft[0] - bottomRight[0]);

    //should be arcTan!!!!!!!
    //this gives the angle(in radians of the bisecting line going from
    //bottom left to top right)
    const barrierAngle = Math.atan(height / width);

    //Case 1: 0 <= r <= barrierAngle
    if (2 * Math.PI - barrierAngle <= r || r <= barrierAngle) {
      const xval = bottomRight[0];
      let yval: number;
      if (barrierAngle > 0) {
        yval = bottomRight[1] - (Math.tan(r) * width) / 2;
      } else {
        yval = bottomRight[1] - (height / 2 + (Math.tan(r) * width) / 2);
      }
      return { x: xval, y: yval };
    }
    //Case 2: barrierAngle < r < pi - barrierAngle
    else if (barrierAngle < r || r <= Math.PI - barrierAngle) {
      let xval: number;
      if (barrierAngle < Math.PI) {
        xval = topLeft[0] - (width / 2 + height / (2 * Math.tan(r)));
      } else {
        xval = topLeft[0] - height / (2 * Math.tan(r));
      }
      const yval = topLeft[1];
      return { x: xval, y: yval };
    }
    //Case 3: pi - barrierAngle <= r <= pi + barrierAngle
    else if (Math.PI - barrierAngle < r || r < Math.PI + barrierAngle) {
      const xval: number = topLeft[0];
      let yval: number;
      if (barrierAngle < Math.PI) {
        yval = topLeft[1] + (Math.tan(r) * width) / 2;
      } else {
        yval = topLeft[1] + height / 2 + (Math.tan(r) * width) / 2;
      }

      return { x: xval, y: yval };
    }
    //Case 4: 2pi - barrierAngle < r < 2pi
    else if (Math.PI + barrierAngle < r || r < 2 * Math.PI - barrierAngle) {
      let xval: number;
      const yval = bottomRight[1];

      if (barrierAngle < (3 * Math.PI) / 2) {
        xval = bottomRight[0] - (width / 2 + height / (2 * Math.tan(r)));
      } else {
        xval = bottomRight[0] - height / (2 * Math.tan(r));
      }
      return { x: xval, y: yval };
    } else {
      throw 'not supposed to get to this case. Error in geometricHelpers.ts';
    }
  };
}

export { distance, mid_point, get_minimum_distance, bounding_box_to_lambda};
