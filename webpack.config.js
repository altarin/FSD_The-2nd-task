const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: glob.sync('./src/blocks/**/*.*').concat(glob.sync('./src/pages/**/*.*')),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/pages/ui_kit/ui_kit.pug'),
            filename: `color_and_type.html`
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    resolve: {
        alias: {
            blocksPath: path.resolve(__dirname, 'src/blocks'), // for correct paths to required assets in pug mixins
            images: path.resolve(__dirname, 'src/images'),
            utils: path.resolve(__dirname, 'utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.pug$/i,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            // Base dir for absolute imports
                            root: path.resolve(__dirname, 'src/blocks')
                        }
                    }
                ]
            },
            {
                test: /\.(c|sc)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            removeCR: true // to prevent 'no orphan CR found'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true, // must be set for resolve-url-loader working
                            sassOptions: {
                                // Where looking for files to import with absolute paths
                                includePaths: [
                                    path.resolve(__dirname, 'src/blocks'),
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
};
