import { ShapeDef } from '@/graph-svg';
import { CSSProperties, SVGProps } from 'react';

export interface SterlingTheme {
  // array of projections
  projections?: Projection[];

  // hidden types and relations
  hidden?: {
    // types to hide from view (hiding does not effect layout)
    types?: string[];
    // relations to hide from view (hiding does not effect layout)
    relations?: string[];
    // whether to hide all disconnected nodes (hiding does effect layout)
    disconnected?: boolean;
    // whether to hide only disconnected builtin nodes (hiding does effect layout)
    builtinDisconnected?: boolean;
  };
}

export interface NodeStyleSpec {
  // the shape of the node
  shape?: ShapeDef;
  // props
  props?: {
    // svg props applied to the label elements
    label?: SVGProps<SVGTextElement>;
  };
  // styles
  styles?: {
    // css properties applied to the shape element
    node?: CSSProperties;
    // css properties applied to the label elements
    label?: CSSProperties;
  };
}

export interface Projection {
  // the type over which to project
  type: string;
  // the specific atom to project over
  atom?: string;
  // a boolean indicating whether this type represents the individual states of a trace
  time?: boolean;
  // a relation that defines the total ordering if this is a time projection
  timeOrdering?: string;
  // theming to be applied only in the context of this projection
  theme?: Omit<SterlingTheme, 'projections'>;
}
