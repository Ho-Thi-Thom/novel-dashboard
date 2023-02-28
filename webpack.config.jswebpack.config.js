const path = require("path");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(pdf)$/i,
        use: "file-loader",
        include: path.resolve(__dirname, "utils/pdf/cv/pdf"),
      },
    ],
  },
};
