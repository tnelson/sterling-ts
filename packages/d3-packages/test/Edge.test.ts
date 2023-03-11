import { Edge } from '../Edge';
import { Rectangle } from '../Rectangle';

import {
  distance,
  mid_point,
  get_minimum_distance,
  bounding_box_to_lambda
} from '../geometricHelpers';

import { Coords } from '../Utility';
//note: had to run
//  yarn node --experimental-vm-modules $(yarn bin jest)
// for tests to work
describe('Mid Point Unit Tests', () => {
  //consider the point (0,0) and (10,10). The mid point should be //(5,5)
  it('calculates mid point correctly for simple case', () => {
    const p1: Coords = { x: 0, y: 0 };
    const p2: Coords = { x: 10, y: 10 };

    const midpoint: Coords = mid_point(p1, p2);
    const expectedMidPoint: Coords = { x: 5, y: 5 };
    expect(midpoint.x).toBe(expectedMidPoint.x);
    expect(midpoint.y).toBe(expectedMidPoint.y);
  });
  it('calculates mid point correctly for same point', () => {
    const p1: Coords = { x: 10, y: 10 };
    const p2: Coords = { x: 10, y: 10 };

    const midpoint: Coords = mid_point(p1, p2);
    const expectedMidPoint: Coords = { x: 10, y: 10 };
    expect(midpoint.x).toBe(expectedMidPoint.x);
    expect(midpoint.y).toBe(expectedMidPoint.y);
  });
  it('Calculates midpoint for vertical points', () => {
    const p1: Coords = { x: 0, y: 10 };
    const p2: Coords = { x: 10, y: 10 };

    const midpoint: Coords = mid_point(p1, p2);
    const expectedMidPoint: Coords = { x: 5, y: 10 };
    expect(midpoint.x).toBe(expectedMidPoint.x);
    expect(midpoint.y).toBe(expectedMidPoint.y);
  });
});

describe('Bounding Box to Lambda Tests', () => {
  const rect = new Rectangle({height: 50, width: 60, coords: { x: 0, y: 0 }});
  it('runs tests correctly', () => {
    expect(1 + 1).toBe(2);
  });
});
