module.exports = {
 // transform: {},
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
    // Added for D3-helpers
    '@babel/preset-flow'
  ],
};
