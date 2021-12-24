const path = require("path");

module.exports = {

    entry: path.resolve(__dirname, "public", "js", "main.js"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "public", "js"),
  },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ]
    }
};