import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ZipWebpackPlugin from 'zip-webpack-plugin';
import { merge } from 'webpack-merge';
import path from 'path';

import { genCommonConfig } from '../webpack.common';
import { edgeManifest } from './manifest.edge';
import { updateManifestBuffer } from '../../helpers';

export const genEdgeConfig = (browserConfig) => {
    const commonConfig = genCommonConfig(browserConfig);

    const DEVTOOLS_PATH = path.resolve(__dirname, '../../../Extension/pages/devtools');

    const edgeConfig = {
        entry: {
            'pages/devtools': path.join(DEVTOOLS_PATH, 'devtools.js'),
            'pages/devtools-elements-sidebar': path.join(DEVTOOLS_PATH, 'devtools-elements-sidebar.js'),
        },
        output: {
            path: path.join(commonConfig.output.path, browserConfig.buildDir),
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, '../manifest.common.json'),
                        to: 'manifest.json',
                        transform: (content) => updateManifestBuffer(process.env.BUILD_ENV, content, edgeManifest),
                    },
                    {
                        context: 'Extension',
                        from: 'filters/edge',
                        to: 'filters',
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                template: path.join(DEVTOOLS_PATH, 'devtools.html'),
                filename: 'pages/devtools.html',
                chunks: ['pages/devtools'],
            }),
            new HtmlWebpackPlugin({
                template: path.join(DEVTOOLS_PATH, 'devtools-elements-sidebar.html'),
                filename: 'pages/devtools-elements-sidebar.html',
                chunks: ['pages/devtools-elements-sidebar'],
            }),
            new ZipWebpackPlugin({
                path: '../',
                filename: `${browserConfig.browser}.zip`,
            }),
        ],
    };

    return merge(commonConfig, edgeConfig);
};
