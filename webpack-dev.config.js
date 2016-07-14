const projectName = "cms"
const projectPath = "/"+projectName

const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve("C:\\kate\\htdocs\\");
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const BeepPlugin = require('webpack-beep-plugin');

const config = {
  entry: ['babel-polyfill',path.join(__dirname, projectPath+'/app/app.js')],
  resolve: {
    //When require, do not have to add these extensions to file's name
    extensions: ["", ".js"],
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Render source-map file for final build
  devtool: 'inline-source-map',
  //output config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js',  //Name of output file
  },
  plugins: [
    new BeepPlugin(),
    new webpack.DefinePlugin({
  "process.env": { 
     NODE_ENV: JSON.stringify("development"), 
   },
  }),
    //Minify the bundle
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false,
      },
    }),*/
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    //new webpack.NoErrorsPlugin(),
    //Transfer Files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname,projectName)),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // All .js files
        loader: 'babel-loader', //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
        query: {
          presets: [ 'react'],
        },
      },
    ],
  },
  //Eslint config
  eslint: {
    configFile: '.eslintrc', //Rules for eslint
  },
};

module.exports = config;
