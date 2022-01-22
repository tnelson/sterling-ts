import { GraphLayout } from '@/alloy-graph';
import { CurveDef, GraphProps, ShapeDef } from '@/graph-svg';
import { DatumParsed } from '@/sterling-connection';
import { Projection, SterlingTheme } from '@/sterling-theme';
import { Matrix } from 'transformation-matrix';

export interface GraphsState {
  layoutsByDatumId: Record<
    string,
    {
      // the datum id
      datumId: string;
      // the datum's layouts
      layoutById: Record<string, GraphLayout>;
    }
  >;
  // the transformation matrix associated with each datum
  matricesByDatumId: Record<
    string,
    {
      // the datum id
      datumId: string;
      // the spread matrix
      spreadMatrix: Matrix;
      // the zoom matrix
      zoomMatrix: Matrix;
    }
  >;
  themeByDatumId: Record<string, SterlingTheme>;
  timeByDatumId: Record<string, number>;
}

export interface GraphData {
  // the datum represented by the graph data
  datum: DatumParsed<any>;
  // the graph props (used for rendering)
  graphProps: GraphProps;
  // the time projection type, if one was used
  timeProjection?: string;
}

type Inheritable<T> = {
  value: T;
  inherited: boolean;
};

export interface RelationStyle {
  curve?: Inheritable<CurveDef>;
  stroke?: Inheritable<string>;
  strokeWidth?: Inheritable<number>;
  fontSize?: Inheritable<string>;
  textColor?: Inheritable<string>;
}

export interface TypeStyle {
  shape?: Inheritable<ShapeDef>;
  fill?: Inheritable<string>;
  stroke?: Inheritable<string>;
  strokeWidth?: Inheritable<number>;
  fontSize?: Inheritable<string>;
  textColor?: Inheritable<string>;
}

/**
 * Create a new graphs state.
 */
export function newGraphsState(): GraphsState {
  return {
    layoutsByDatumId: {},
    matricesByDatumId: {},
    themeByDatumId: {},
    timeByDatumId: {}
  };
}

/**
 * Generate a unique layout id based on the set of projections.
 *
 * @param projections A set of projections
 */
export function generateLayoutId(projections: Projection[]): string {
  if (!projections.length) return '|';
  const sorted = projections.slice().sort((a, b) => {
    if (a.time === b.time) return a.type.localeCompare(b.type);
    return a.time === true ? -1 : 1;
  });
  const names = sorted.map((projection) => {
    return projection.time === true
      ? `[${projection.type}]`
      : `(${projection.type})`;
  });
  return names.join('|');
}
