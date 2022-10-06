const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		port: 8080,
		host: "127.0.0.1",
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	}
});
