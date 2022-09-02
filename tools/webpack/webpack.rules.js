module.exports = [
    {
        // Add support for native node modules
        test: /\.node$/,
        use: "node-loader",
    },
    {
        // Webpack asset relocator loader
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: "@marshallofsound/webpack-asset-relocator-loader",
            options: {
                outputAssetBase: "native_modules",
            },
        },
    },
    {
        // Typescript loader
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
            loader: "ts-loader",
            options: {
                transpileOnly: true,
            },
        },
    },
    {
        // CSS Loader
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
    },
    {
        // SCSS (SASS) Loader
        test: /\.s[ac]ss$/i,
        use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" },
        ],
    },
    {
        // Assets loader
        // More information here https://webpack.js.org/guides/asset-modules/
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
        type: "asset",
        generator: {
            filename: "assets/[hash][ext][query]",
        },
    },
]
