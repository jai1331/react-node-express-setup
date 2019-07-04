var path    = require('path');
const webpack = require('webpack'); //to access built-in plugins
var hwp     = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module:{
        rules:[{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    devServer: {
        port: 3006,
        open: true,
        proxy: {
          "/api": "http://localhost:8080"
        }
    },
    plugins:[
        new webpack.ProgressPlugin(),
        new hwp({template:path.join(__dirname, '/src/index.html')})
    ]
}