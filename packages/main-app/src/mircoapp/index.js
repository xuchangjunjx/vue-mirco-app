import { registerMicroApps, start } from "qiankun";
import globalState from "./globalState";
const apps = [
	{
		name: "vue2-app",
		entry: "http://localhost:8081",
		container: "#vue2-app",
		activeRule: "/app/vue2-app"
	},
	{
		name: "vue3-app",
		entry: "http://localhost:8082",
		container: "#vue3-app",
		activeRule: "/app/vue3-app"
	}
];
export default () => {
	registerMicroApps(
		apps.map(el => {
			return {
				...el,
				props: {
					state: globalState.state
				}
			};
		})
	);
	// 初始化状态
	globalState.init();
	start();
};
