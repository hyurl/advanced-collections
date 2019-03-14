module.exports = {
    mode: "development",
    entry: "./index.js",
    devtool: "source-map",
    target: "node",
    node: {
        process: false
    },
    output: {
        path: __dirname + "/bundle",
        filename: "advanced-collections.js",
        library: "AdvancedCollections",
        libraryTarget: "umd",
        globalObject: "this",
    }
};