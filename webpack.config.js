const path = require('path');
const webpack = require('webpack');
const ScanHtmlWebPlugin = require('./scanhtml');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirSass = path.join(dirApp, 'scss');

console.log('dirApp', dirApp);
console.log('dirSass', dirSass);

const appHtmlTitle = 'Webpack Boilerplate';

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        vendor: [
            'lodash',
            'jquery',
            'popper.js',
            'bootstrap'
        ],
        bundle: path.join(dirApp, 'js/index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirSass
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new ScanHtmlWebPlugin(dirApp)
    ],
    module: {
        rules: [
            // HTML
            {
                test: /\.html$/,
                loader: 'html-loader'

            },
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [{
                        loader: "style-loader"
                    },{
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirSass]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
