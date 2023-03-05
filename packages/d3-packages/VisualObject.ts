import { toFunc, Coords, ExperimentalBoundingBox, BoundingBox, boxUnion } from "./Utility";

/**
 * To anyone adding to this library in the future: please take the following steps when adding
 * new VisualObjects.
 *
 * 1. If the object is to be accessible within sterling, add it to library within ScriptViewImports.
 * 2. Add the name of the file, minus .d.ts, to the list within d3lib-def-compiler/src/D3LibDefCompiler.java.
 *    Make sure to add the name to the end of the list, following any files it imports.
 * 3. Run the typescript compiler ("tsc" in terminal) from within the d3-packages folder.
 * 4. Run the main method within D3LibDefCompiler.
 *
 * If these steps are not followed, the file's definitions will either not be accessible within
 * sterling, or will not show up in monaco.
 */

export type BoundingBoxGenerator = (r: number) => Coords;

export class VisualObject {
  center: () => Coords;
  children: VisualObject[];
  dependents: VisualObject[];

  //note: for non-circle objects, we leave the below
  //uninitialized! Bad typescript sorry :((
  bounding_box_lam: BoundingBoxGenerator;
  hasBoundingBox: boolean;


  /**
   * Top level class, which all other visual objects will extend.
   * @param coords position of the object on screen.
   */
  constructor(coords?: Coords | (() => Coords)) {
    this.center = toFunc({ x: 0, y: 0 }, coords);
    this.bounding_box_lam = (r: number) => { return this.center() };
    this.hasBoundingBox = false;
    this.children = [];
    this.dependents = [];
  }

  boundingBox(): BoundingBox {
    if (this.children.length == 0) {
      return {top_left: this.center(), bottom_right: this.center()}
    } else {
      // Defaults to returning bounding box of all children. 
      return boxUnion(this.children.map((child): BoundingBox => child.boundingBox()))
    }
  }

  getChildren(): VisualObject[]{
    return this.children;
  }
  /**
   * Shifts object to have new given center
   * @param center new center of the object
   */
  setCenter(center: Coords | (() => Coords)) {
    this.center = toFunc(this.center(), center);
  }

  hasLam():Boolean{
    return this.hasBoundingBox;
  }
  getLam(): BoundingBoxGenerator {
    return this.bounding_box_lam;
  }

  /**
   * Renders the object to the screen.
   * @param svg HTML Svg object to which the object should be rendered.
   */
  render(svg: any) {
    this.children.forEach((child: VisualObject) => child.render(svg));
  }
}
