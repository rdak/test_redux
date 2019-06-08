const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyArray = [
  {
    from: "./node_modules/react-dom/umd/react-dom.development.js",
    to: "assets/react-dom.development.js"
  },
  {
    from: "./node_modules/react/umd/react.development.js",
    to: "assets/react.development.js"
  },
];

module.exports = merge(common, {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    port: 3000,
    compress: true,
    contentBase: path.resolve(__dirname, "dist"),
    index: 'index.html',
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true,
  },

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
          "style-loader",
          "css-loader",
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
          "sass-loader",
        ]
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            includePath: [
              "../node_modules/mdi",
              "../node_modules/flag-icon-css"
            ]
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
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(copyArray),
    new HtmlWebPackPlugin({
      template: path.resolve(path.join(__dirname, 'src', 'index.html')),
      filename: './index.html',
      title: "Skeleton Webpack",

      meta: {
        viewport: 'width=device-width',
        'theme-color': '#02a2d6',
      },

      hash: true,
      minify: true,

    }),
  ],
  watch: true
});