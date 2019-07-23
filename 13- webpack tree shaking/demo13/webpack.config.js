const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode:"production",
    optimization: {
       usedExports: true
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
};
