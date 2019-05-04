// const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = webpackEnv => {
  const isEnvProduction = webpackEnv === 'production'

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.svg$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([{ from: `public` }]),
      // Generates an `index.html` file with the <script> injected.
      // Copied from ejected create-react-app
      new HtmlWebPackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: `public/index.html`,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      contentBase: './dist',
    },
  }
}

module.exports = config
