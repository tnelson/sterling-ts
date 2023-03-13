
module.exports = api => {
  // const isTest = api.env('test');
  // api.cache(true);
  return {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      [
          '@babel/preset-env',
          {
              targets: {
                  // target node.js current version
                  node: 'current',
              },
              // If testing, transpile all the way down to commonjs
              //modules: isTest ? 'commonjs' : false,
          },
      ],
    ],
  }
}

// module.exports = {
//  // transform: {},
//   presets: [
//     ['@babel/preset-env', {targets: {node: 'current'}}],    
//     '@babel/preset-typescript',
//     // Added for D3-helpers
//     //'@babel/preset-flow'
//   ],
//   plugins: [
//     //"@babel/plugin-proposal-class-properties",
//     //"@babel/plugin-transform-modules-commonjs"
//   ]
// };

