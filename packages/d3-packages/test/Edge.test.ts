import {Edge} from '../Edge';
import {
  distance,
  mid_point,
  get_minimum_distance,
  bounding_box_to_lambda
} from '../geometricHelpers';

import {Coords} from '../VisualObject'
//note: had to run
//  yarn node --experimental-vm-modules $(yarn bin jest)
// for tests to work
describe('Edge utility functions', () => {
  it('actually runs your tests', () => {
    expect(1 + 1).toBe(2);
    //heyfunc();
  });
  //consider the point (0,0) and (10,10). The mid point should be //(5,5)
  it('gets mid point correctly', () => {
    const p1:Coords = {x: 0, y:0};
    const p2:Coords = {x: 10, y:10};

    const midpoint:Coords = mid_point(p1,p2);
    const expectedMidPoint:Coords = {x:5, y:5};
    expect(midpoint.x).toBe(expectedMidPoint.x);
    expect(midpoint.y).toBe(expectedMidPoint.y);

  })
});



