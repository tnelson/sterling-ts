import {
  toFunc,
  Coords,
  ExperimentalBoundingBox,
  BoundingBox,
  boxUnion
} from './Utility';

import * as d3 from 'd3';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from './Constants';

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
  masks: BoundingBox[];

  //note: for non-circle objects, we leave the below
  //uninitialized! Bad typescript sorry :((
  bounding_box_lam: BoundingBoxGenerator;
  hasBoundingBox: boolean;

  /**
   * Top level class, which all other visual objects will extend.
   * @param coords position of the object on screen.
   */
  constructor(coords?: Coords | (() => Coords)) {
    //TODO: refactor this
    this.center = toFunc({ x: 0, y: 0 }, coords);
    this.bounding_box_lam = (r: number) => {
      return this.center();
    };
    this.hasBoundingBox = false;
    this.children = [];
    this.dependents = [];
    this.masks = [];
  }

  boundingBox(): BoundingBox {
    if (this.children.length == 0) {
      return { top_left: this.center(), bottom_right: this.center() };
    } else {
      // Defaults to returning bounding box of all children.
      return boxUnion(
        this.children.map((child): BoundingBox => child.boundingBox())
      );
    }
  }

  getChildren(): VisualObject[] {
    return this.children;
  }
  /**
   * Shifts object to have new given center
   * @param center new center of the object
   */
  setCenter(center: Coords | (() => Coords)) {
    this.center = toFunc(this.center(), center);
  }

  addMask(mask: BoundingBox) {
    this.masks.push(mask);
  }
  /**
   * Method should not be called outside of internal backend!
   *
   * @param masks Masks to be applied to svg
   * @param SVG HTML Svg object to which the object should be rendered.
   * 
   * @returns a unique identifier to the mask (used to ID the mask)
   */
  addMaskRender(masks: BoundingBox[], svg: any): string {
    const maskIdentifier:string = window.performance.now().toString();
    console.log("mask identifier in addMask func:" + maskIdentifier)
    const mask = d3
      .select(svg)
      .append('defs')
      .append('mask')
      .attr('id', maskIdentifier);
    mask //"background" mask. Not sure why this works but it does
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', SCREEN_WIDTH)
      .attr('height', SCREEN_HEIGHT)
      .style('fill', 'white')
      .style('opacity', 1);
    if (masks instanceof Array) {
      masks.forEach((m) => {
        mask.append('rect')
        .attr('x', m.top_left.x)
        .attr('y', m.top_left.y)
        .attr('width', Math.abs(m.top_left.x - m.bottom_right.x))
        .attr('height', Math.abs(m.top_left.y - m.bottom_right.y))
      });
    } else {
      throw 'mask passed in not an array. Check VisualObject.ts';
    }
    return maskIdentifier;
  }
  hasLam(): Boolean {
    return this.hasBoundingBox;
  }
  getLam(): BoundingBoxGenerator {
    return this.bounding_box_lam;
  }

  //a brief note on *why* we would want multiple masks to get passed down: masks can only get rendered in D3 to primitive
  //objects: object that physically gets rendered by D3. So imagine case of grid that contains a circle. We want a mask for the
  //circle and also a mask for the grid (this is what user stipulates). So our physical grid object

  /**
   * Renders the object to the screen.
   * @param svg HTML Svg object to which the object should be rendered.
   * @param masks Optional param that indicates the inherited masks that should be passed down to each child
   *
   */

  render(svg: any, masks?: BoundingBox[]) {
    this.children.forEach((child: VisualObject) => {
      child.render(svg, masks);
    });
  }
}
