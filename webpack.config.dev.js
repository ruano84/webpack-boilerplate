const merge = require('webpack-merge');
const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'eval',


    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        host: '0.0.0.0'
    }

});
