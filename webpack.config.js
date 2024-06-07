const path = require("path");

module.exports = {
	entry: "./src/index.tsx", // Entry point of your application
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/",
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[hash].[ext]",
							outputPath: "static/media/",
						},
					},
				],
			},
		],
	},
	plugins: [
		// Add any plugins you need here
	],
	devServer: {
		contentBase: path.join(__dirname, "public"),
		compress: true,
		port: 3000,
		historyApiFallback: true,
	},
};
