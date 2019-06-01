const path = require('path')
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: './src/app.js',
  output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
  },
  module:{
      rules:[{
          loader:'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
      }, {
          test: /\.s?css$/,
          use: [
              'style-loader', 'css-loader', 'sass-loader'
          ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  devtool:'cheap-module-eval-source-map',
  devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
  },
  plugins: [new webpack.EnvironmentPlugin(['API_URL'])]
};
