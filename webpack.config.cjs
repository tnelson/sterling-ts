const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const envs = {
  alloy: 'env/alloy.env',
  forge: 'env/forge.env'
};

const favIconPath = path.resolve(
  __dirname,
  'packages/sterling/src/public',
  'favicon.png'
); 

module.exports = (env, argv) => {
  const mode = argv.mode;
  const isDev = mode === 'development';
  const envPath = envs[env.provider];

  return {
    mode: isDev ? 'development' : 'production',
    // If you need better source-map info in development, change this
    // https://webpack.js.org/configuration/devtool/
    devtool: isDev ? 'eval' : false,
    context: __dirname,
    devServer: {
      // Exchange, add, or remove modules while app is running
      hot: true,
      port: 8081
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
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
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
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.ttf$/,
          include: path.resolve(__dirname, './node_modules/monaco_editor'),
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      isDev && new ReactRefreshWebpackPlugin(),
      new Dotenv({
        path: envPath
      }),
      new FaviconsWebpackPlugin({
        mode: 'auto',
        logo: favIconPath,
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(
          __dirname,
          'packages/sterling/src/public',
          'index.html'
        ),
        filename: path.resolve(__dirname, 'dist', 'index.html'),
        inject: true,
        title: 'Sterling',
        meta: {
          viewport: 'width=device-width, initial-scale=1',
          'theme-color': '#ffffff',
          description: 'Web-based visualization of relational models.'
        }
      }),
      new MonacoWebpackPlugin()
    ].filter(Boolean)
  };
};
