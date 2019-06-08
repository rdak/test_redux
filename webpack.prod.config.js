const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");

const webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

let copyArray = [
  {
    from: "./node_modules/react-dom/umd/react-dom.production.min.js",
    to: "assets/react-dom.production.min.js"
  },
  {
    from: "./node_modules/react/umd/react.production.min.js",
    to: "assets/react.production.min.js"
  }
];

module.exports = merge(common, {
  mode: "production",
  entry: {
    main: "./src/index.tsx",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: "/node_modules",
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { browsers: "last 2 versions" } }
                ],
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: []
            }
          },
        ]
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  "browsers": [
                    "last 4 versions",
                  ]
                }),
              ]
            }
          },
          { loader: "sass-loader" },
        ]
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            includePath: []
          }
        }]
      },

      {
        test: /\.(gif|png|jpe?g)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'media/',
            includePath: [
              '../media/',
            ],
            mimetype: 'image/png'
          },
        }],
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
    }),
    new CopyWebpackPlugin(copyArray),
    new HtmlWebPackPlugin({
      template: path.resolve(path.join(__dirname, 'src', 'index.html')),
      filename: './index.html',
      title: "Test",

      meta: {
        viewport: 'width=device-width',
        'theme-color': '#02a2d6',
      },

      hash: true,
      minify: true
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
          }
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
});