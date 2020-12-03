const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');
module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    cache: true,
    output: {
        path: path.join(__dirname, 'generated'),
        filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        }
    ]
}
};