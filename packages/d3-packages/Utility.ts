/**
 * This is going to be a generic utility file. Primarily for factoring
 * out algorithms with a higher level of computational complexity.
 */

export function toFunc<T>(defaultValue: T, t?: T | (() => T)): (() => T)  {
    let constOrFunction: T | (() => T) = t ?? defaultValue
    if (typeof constOrFunction !== "function") {
        let constVal: T = constOrFunction
        return () => constVal
    } else {
        // This is a bit wonky because typescript is worried that constOrFunction
        // is both T and a function. Note that this sort of narrowing will NOT
        // work in the case of T being a function type itself! It has to be something else
        return constOrFunction as () => T
    }
}

export interface Coords {
    x: number;
    y: number;
}

/**
 * Generic props for representing a box around an object.
 */
export interface BoundingBox {
    top_left: Coords;
    bottom_right: Coords;
  }

export function boxUnion(boxes: BoundingBox[]) {
    return {
        top_left: {
          x: Math.min(...boxes.map((box: BoundingBox): number => {return box.top_left.x })),
          y: Math.min(...boxes.map((box: BoundingBox): number => {return box.top_left.y }))
        },
        bottom_right: {
          x: Math.max(...boxes.map((box: BoundingBox): number => {return box.bottom_right.x })),
          y: Math.max(...boxes.map((box: BoundingBox): number => {return box.bottom_right.y }))
        }
      }
}
  
export interface ExperimentalBoundingBox {
    lambda: (radians: number) => Coords;
}

/**
 * Simple method averaging the coordinate points in a series.
 * @param points
 * @returns
 */
export function averagePath(points: Coords[]): Coords {
    if (points == undefined) {
      return { x: 0, y: 0 };
    }
    if (points.length == 0) {
      return { x: 0, y: 0 };
    }
    //Averages the points
    return points.reduce(
      (previousValue: Coords, currentValue: Coords) => {
        return {
          x: previousValue.x + currentValue.x / points.length,
          y: previousValue.y + currentValue.y / points.length
        };
      },
      { x: 0, y: 0 }
    );
  }
  
  /**
   * Shifts a list of points according to a shift variable
   * @param pointList
   * @param shift
   * @returns
   */
  export function shiftList(pointList: Coords[], shift: Coords): Coords[] {
    let newPoints: Coords[] = pointList.map((point: Coords): Coords => {
      return {
        x: point.x + shift.x,
        y: point.y + shift.y
      };
    });
    return newPoints;
  }
  
  /**
   * Utility function returning bounding box for a list of points
   * @param pointList list of points as coords
   * @returns bounding box
   */
  export function boundsOfList(pointList: Coords[]): BoundingBox {
    let x_min = Infinity;
    let y_min = Infinity;
    let x_max = -Infinity;
    let y_max = -Infinity;
    pointList.forEach((point) => {
      x_min = Math.min(x_min, point.x);
      x_max = Math.max(x_max, point.x);
      y_min = Math.min(y_min, point.y);
      y_max = Math.max(y_max, point.y);
    });
    return {
      top_left: { x: x_min, y: y_min },
      bottom_right: { x: x_max, y: y_max }
    };
  }  