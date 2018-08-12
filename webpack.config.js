const path = require('path');
const webpack = require('webpack');
const CLIENT_DEST = path.join(__dirname, './client/dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin

module.exports = {
    watch: true,
    mode: 'development',
    entry: {main: './client/src/index.js'},
    output: { 
        path: CLIENT_DEST, 
        filename: 'bundle.js',
        publicPath: '/' 
            },
    devServer: {
       historyApiFallback: true,
       publicPath: '/'
            },
    module: {  
        rules: [ 
            {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            exclude: [
              /node_modules/
            ]
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(
              {
                fallback: 'style-loader',
                use: ['css-loader']
              })
        },
        {
            test: /\.ttf$/,
            loaders: [
              'url-loader'
            ]
          },
          {
            test: /\.(svg|gif|png|eot|woff|ttf)$/,
            loaders: [
              'url-loader'
            ]
          },
    //       {
    //         test: /\.scss$/,
    //         use: ExtractTextPlugin.extract({
    //   fallback: 'style-loader',
    //   use:[
    // {loader: 'css-loader',options:{sourceMap: true}},
    // {loader: 'postcss-loader',options:{sourceMap: true}},
    // {loader: 'sass-loader',options:{sourceMap: true}}
    // ]
    // })
    //       },
        {
            test: /\.scss$/,
            exclude:/node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 2,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },{
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            })
        },
        {
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
        }
        // {
        //     test: /\.(sass|scss)$/,
        //     use: [{
        //         loader: "style-loader" // creates style nodes from JS strings
        //     }, {
        //         loader: "css-loader" // translates CSS into CommonJS
        //     }, {
        //         loader: "sass-loader" // compiles Sass to CSS
        //     }]
        //   }
      ]
  },
  node: {
    __dirname: true,
    },
    resolve: {
        extensions: ['.js','.scss']
    },
  plugins: [  // Array of plugins to apply to build chunk
    //   new HtmlWebpackPlugin({
    //       template: __dirname + "/src/public/index.html",
    //       inject: 'body'
    //   }),
      new ExtractTextPlugin({ filename: 'index.css'}),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './client/index.html',
        filename: 'index.html'
      })
  ],
//   devServer: {  // configuration for webpack-dev-server
//       contentBase: './src/public',  //source of static assets
//       port: 7700, // port to run dev-server
//   } 
};