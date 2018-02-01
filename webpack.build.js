var config = require('./webpack.config.js')

config.entry = {
    'vue-liu-tree': './src/index.js',
};
config.output = {
    filename: './dist/[name].js',
    library: 'VueLiuTree',
    libraryTarget: 'umd'
}
module.exports = config;