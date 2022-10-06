import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import createRouter from "./router";
let app;
function render(props = {}) {
	const { container } = props;

	app = createApp(App);
	app.use(createRouter(container ? "/app" : ""));
	app.mount(container ? container.querySelector("#app") : "#app");
}
// 通过这个标志判断是独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
	render();
}
export async function bootstrap() {
	console.log("[vue3-app] vue app bootstraped");
}
// 如果是被qiankun加载 则会运行这个钩子
export async function mount(props) {
	// qiankun props自带的状态监听函数
	props.onGlobalStateChange((state, prev) => {
		// TODO
	});
	// 这里在运行当前子应用实例
	render(props);
}
// 销毁子应用时候 调用的钩子
export async function unmount() {
	console.log("[vue3-app] 应用销毁");
	console.log(app);
	app.unmount();
	app = null;
}
// 增加 update 钩子以便主应用手动更新微应用
export async function update(props) {
	// renderPatch(props);
}
