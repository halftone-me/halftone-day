// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: '[name].dist.js',
        path: `${__dirname}/dist`,
    },
    target: 'node',
    mode: 'development',
    externals: [nodeExternals()],
    module: {
        rules: [
            // ... other rules
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}
