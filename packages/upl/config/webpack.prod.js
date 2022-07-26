const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');


const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js', // for cashing issues
        publicPath: '/upl/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'upl',
            filename: 'remoteEntry.js',
            exposes: {
                './PersonalLoans': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)