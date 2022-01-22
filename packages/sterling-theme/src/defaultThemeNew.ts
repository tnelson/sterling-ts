import { SterlingTheme } from '@/sterling-theme';

export function defaultThemeNew(): SterlingTheme {
  return {
    hidden: {
      builtinDisconnected: true
    },
    nodes: [
      {
        shape: {
          shape: 'rectangle',
          width: 100,
          height: 60
        },
        styles: {
          node: {
            stroke: '#333',
            strokeWidth: 1,
            fill: '#ffffff'
          },
          label: {
            fontFamily: 'monospace',
            fontSize: '14px',
            textAnchor: 'middle',
            userSelect: 'none',
            fill: '#333'
          }
        },
        props: { label: { dy: '0.33em' } },
        targets: ['*']
      }
    ],
    edges: [
      {
        curve: {
          type: 'bspline'
        },
        styles: {
          edge: {
            stroke: '#333',
            strokeWidth: 1,
            fill: 'none'
          },
          label: {
            fontFamily: 'monospace',
            fontSize: '12px',
            textAnchor: 'middle',
            userSelect: 'none'
          }
        },
        props: { label: { dy: '0.33em' } },
        targets: ['*']
      }
    ]
  };
}
