var webpack = require('webpack');

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js',
        publicPath: '',
        path: 'public'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    }
};
