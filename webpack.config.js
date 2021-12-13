const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const favIconPath = path.resolve(__dirname, 'packages/sterling/src/public', 'favicon.png');

module.exports = (_, argv) => {
  const mode = argv.mode;
  const isDev = mode === 'development';

  return {
    mode: isDev ? 'development' : 'production',
    context: __dirname,
    devServer: {
      hot: true
    },
    entry: './packages/sterling/src/index.tsx',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isDev ? '/' : './',
      clean: true
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  isDev && require.resolve('react-refresh/babel')
                ].filter(Boolean)
              }
            },
            {
              loader: 'ts-loader',
              options: { transpileOnly: true }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      isDev && new ReactRefreshWebpackPlugin(),
      new FaviconsWebpackPlugin({
        mode: 'auto',
        logo: favIconPath,
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'packages/sterling/src/public', 'index.html'),
        filename: path.resolve(__dirname, 'dist', 'index.html'),
        inject: true,
        title: 'Sterling',
        meta: {
          'viewport': 'width=device-width, initial-scale=1',
          'theme-color': '#ffffff',
          'description': 'Web-based visualization of relational models.'
        }
      })
    ].filter(Boolean)
  };
};
