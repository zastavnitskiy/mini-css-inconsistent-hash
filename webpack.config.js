const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DEVELOPMENT = process.env.NODE_ENV === "development";

let filename = "assets/[name]_[contenthash].js";
let chunkFilename = "assets/chunks/[id]_[contenthash].js";
let cssFilename = "assets/[name]_[contenthash:8].css";
let cssChunkFileName = "assets/chunks/[id]_[contenthash].css";

if (DEVELOPMENT) {
  cssFilename = "assets/[name].css";
  filename = "assets/[name].js";
  chunkFilename = "assets/chunks/[id].js";
  cssChunkFileName = "assets/chunks/[id].css";
}


  // ExtractTextPlugin expects the build output to be flat.
  // (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
  // However, our output is structured with css, js and media folders.
  // To have this structure working with relative paths, we have to use custom options.
  // Making sure that the publicPath goes back to to build folder.
  const minicssPluginPublicPath = Array(cssFilename.split("/").length).join(
    "../"
  );

  const miniCssExtractPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: minicssPluginPublicPath
    }
  };

  module.exports = {
    mode: DEVELOPMENT ? "development" : "production",
    devtool: "cheap-module-source-map",
    entry: "./index.js",
    output: {
        path: path.resolve('./build'),
        filename,
        chunkFilename
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [miniCssExtractPluginLoader]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: cssFilename,
        chunkFilename: cssChunkFileName
      })
    ]
  };

