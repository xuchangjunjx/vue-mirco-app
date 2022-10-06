const { defineConfig } = require("@vue/cli-service");
const { name } = require("./package");

module.exports = defineConfig({
	// publicPath: "/vue2-app/",
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		port: 8081,
		host: "127.0.0.1",
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	},
	configureWebpack: {
		output: {
			library: `${name}-[name]`,
			libraryTarget: "umd", // 把微应用打包成 umd 库格式
			// jsonpFunction: `webpackJsonp_${name}`
			chunkLoadingGlobal: `webpackJsonp_${name}`
		}
	}
});
