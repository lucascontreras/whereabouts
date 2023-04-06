const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    // needed this publicPath: 'dist';. publicPath and path are two different things!
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    clean: true, // delete old builds, allows fresh build
    // output.publicPath="/",
    // devServer.historyApiFallback = true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    proxy: { 
      '/api/**': {
        target: 'http://localhost:3210/',
        secure: false,
      },
    },
    historyApiFallback: true,
    compress: true,
    //port: 8080,
  }
}