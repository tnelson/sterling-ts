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

/**
 * Interface that will be used generically to represent locations within a given svg
 */
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

export type BoundingBoxGenerator = (r: number) => Coords;

export class VisualObject {
  coords: Coords;
  children: VisualObject[];
  dependents: VisualObject[];

  //note: for non-circle objects, we leave the below
  //uninitialized! Bad typescript sorry :((
  bounding_box_lam: BoundingBoxGenerator;


  /**
   * Top level class, which all other visual objects will extend.
   * @param coords position of the object on screen.
   */
  constructor(coords?: Coords) {    
    this.coords = coords ?? { x: 0, y: 0 };
    this.bounding_box_lam = (r: number) => this.coords;
    this.children = [];
    this.dependents = [];
  }

  boundingBox(): BoundingBox {
    if (this.children.length != 0) {
      return {top_left: { x: 0, y: 0 }, bottom_right: { x: 0, y: 0 }}
    } else {
      // Defaults to returning bounding box of all children. 
      return {
        top_left: {
          x: Math.min(...this.children.map((child: VisualObject): number => {return child.boundingBox().top_left.x })),
          y: Math.min(...this.children.map((child: VisualObject): number => {return child.boundingBox().top_left.y }))
        },
        bottom_right: {
          x: Math.max(...this.children.map((child: VisualObject): number => {return child.boundingBox().bottom_right.x })),
          y: Math.max(...this.children.map((child: VisualObject): number => {return child.boundingBox().bottom_right.y }))
        }
      }
    }
  }
  /**
   * Returns the center of the object
   * @returns coordinates of center
   */
  center(): Coords {
    return this.coords;
  }

  /**
   * Shifts object to have new given center
   * @param center new center of the object
   */
  setCenter(center: Coords) {
    this.coords = center;
    this.children.forEach((child) => child.setCenter(center));
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

  /**
   * Updates data about all objects that are effected by this object. 
   * Note: This actually implements topological sorting. More shallow "update()"
   * method exists for use within this method, and should never be called on its own.
   * 
   * Note: Maybe factor the algorithmic beef into helper?
   */
  deepUpdate() {
    // We are using Kohn's algorithm for topological sorting. Unforunately,
    // The algorithm does not work in sorting a specific part of the graph,
    // so we begin by isolating out the edges and visObjs that are actually
    // going to be updated. We do this with dfs
    let relevantObj: VisualObject[] = []
    let toSearch: VisualObject[] = [this]
    let edges: Map<VisualObject, VisualObject[]> = new Map<VisualObject, VisualObject[]>()

    while (toSearch.length != 0) {
      let curr = toSearch.pop()
      if(curr === undefined) { console.assert(curr, "curr was undefined"); return; }
      edges.set(curr, new Array<VisualObject>())
      curr.dependents.forEach((dependent: VisualObject) => {
        if (!toSearch.includes(dependent) && !relevantObj.includes(dependent)) {
          toSearch.push(dependent)
        }
        if(curr === undefined) { console.assert(curr, "curr was undefined"); return; }        
        edges.get(curr)?.push(dependent)
      })
      relevantObj.push(curr)
    }

    // We now create an inverted version of edges (this will speed things up later)

    let inverseEdges: Map<VisualObject, VisualObject[]> = new Map<VisualObject, VisualObject[]>()
    relevantObj.forEach((relObj: VisualObject) => {
      inverseEdges.set(relObj, new Array<VisualObject>())
    })
    edges.forEach((sinks: VisualObject[], source: VisualObject) => {
      sinks.forEach((sink: VisualObject) => {        
        inverseEdges.get(sink)?.push(source)
      })
    })

    // Now for the main event, kohn's algorithm
    // Lists to keep track
    let sorted: VisualObject[] = []
    let noIncoming: VisualObject[] = [this] // Probably better as set, but some issues

    while (noIncoming.length != 0) {
      let curr = noIncoming.pop()
      if(curr === undefined) { console.assert(curr, "curr was undefined"); return; }
      sorted.push(curr)

      while (edges.get(curr)?.length != 0) {
        let sink: VisualObject | undefined = edges.get(curr)?.pop()
        if(sink === undefined) { console.assert(curr, "sink was undefined"); return; }
        // Very basic js function missing (removing elt of list)
        const index = inverseEdges.get(sink)?.indexOf(curr)
        if (index != undefined && index > -1) {
          inverseEdges.get(sink)?.splice(index, 1)
        }

        if (inverseEdges.get(sink)?.length != 0) {
          noIncoming.push(sink)
        }
      }
    }

    //Actually updating!
    sorted.forEach((o: VisualObject) => {
      o.update()
    })
  }

  /**
   * Updates necessary information about an object.
   */
  update() {}
}
