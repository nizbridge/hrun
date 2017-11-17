const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const ipad = 'localhost';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(5000, ipad, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at ' + ipad + ':5000');
});
