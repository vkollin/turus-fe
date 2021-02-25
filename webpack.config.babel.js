const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    const outputDir = path.join(__dirname, '/dist');
    const assetsDir = path.join(__dirname, '/src');

    const config = {
        mode: isDevelopment ? 'development' : 'production',

        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
        },

        entry: {
            index: path.join(assetsDir, "index.tsx")
        },

        output: {
            path: outputDir,
            filename: '[name].[fullhash].js'
        },

        module: {
            rules: [
                {
                    test: /\_\.scss$/,
                    include: assetsDir,
                    use: [
                        {loader: MiniCssExtractPlugin.loader, options: {esModule: false}},
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: {localIdentName: "[local]"},
                            },
                        },
                        "resolve-url-loader",
                        {loader: "sass-loader", options: {sourceMap: isDevelopment}},
                        "postcss-loader"
                    ],
                },
                {
                    test: /(?<!\._)\.scss$/,
                    include: assetsDir,
                    use: [
                        {loader: MiniCssExtractPlugin.loader, options: {esModule: false}},
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: {localIdentName: isDevelopment ? "[path][name]__[local]" : "[hash:base64]"},
                            },
                        },
                        "resolve-url-loader",
                        {loader: "sass-loader", options: {sourceMap: isDevelopment}},
                        "postcss-loader"
                    ],
                },
                {
                    test: /\.([jt])sx?$/,
                    exclude: /(node_modules|dist)/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.(png|svg|jpg|gif|woff(2)?|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'static/[name]-[hash].[ext]',
                        publicPath: '/'
                    }
                },
                {
                    test: /\.html$/,
                    use: [{loader: 'html-loader'}]
                },
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[fullhash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[fullhash].css',
            }),
            new CleanWebpackPlugin({cleanStaleWebpackAssets: !isDevelopment}),
            new HtmlWebpackPlugin({
                template: path.join(assetsDir, "index.ejs"),
                inject: 'body',
                url: process.env.API_URL

            }),
            new CopyPlugin({
                patterns: [
                    {from: path.join(assetsDir, '.htaccess'), to: outputDir},
                    {from: path.join(assetsDir, 'favicon.ico'), to: outputDir},
                ],
            }),
        ],

        optimization: {
            minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})],
            splitChunks: {
                chunks: 'all',
                maxAsyncRequests: 10,
                maxInitialRequests: 6,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                    default: {
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        }
    }

    if (isDevelopment) {
        config.devtool = 'eval-cheap-source-map';
        config.devServer = {contentBase: path.join(__dirname, 'dist'), port: 3000, hot: true, historyApiFallback: true,}
    }

    return config;
}
