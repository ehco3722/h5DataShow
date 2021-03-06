var webpack = require('webpack');
var providePlugin = new webpack.ProvidePlugin( {$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'} );

module.exports = {
    entry: {index: './src/js/entry.js'},
    output: {
        path: './out/',
        publicPath: './out/',
        // publicPath: 'http://localhost:8090/out/',
        filename: '[name].js'
    },
    
    module: {
        loaders: [
            {test: /.js$/, loader: 'babel-loader'},
            {test: /.css$/, loader: 'style-loader!css-loader' },
            {test: /.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /.(jpg|png|gif|svg)$/, loader: 'url-loader?limit=8192&name=./[name].[ext]'}
        ]
    },
    plugins: [providePlugin]
}
