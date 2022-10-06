import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";

Vue.config.productionTip = false;
// 当前子应用的实例
let app;
function render(props = {}) {
	// 如果有setGlobalState 作为微应用就有
	if (props.setGlobalState) {
		// 注册一个全局的方法 这样调用父应用的ssetState
		Vue.prototype.emitMainApp = state => {
			props.setGlobalState(state);
		};
	} else {
		Vue.prototype.emitMainApp = () => {};
	}
	const { container, state } = props;
	// 拿到父应用传递来的state
	if (state) {
		console.log("get main-app state", state);
		// 存到store中
		// let newStore = Object.assign({}, store.state, initState);
		// store.replaceState(newStore);
	}
	app = new Vue({
		router: createRouter(container ? "/app" : ""),
		render: h => h(App)
	}).$mount(container ? container.querySelector("#app") : "#app");
}
// 通过这个标志判断是独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
	render();
}
export async function bootstrap() {
	console.log("[vue2-app] vue app bootstraped");
}
// 如果是被qiankun加载 则会运行这个钩子
export async function mount(props) {
	// qiankun props自带的状态监听函数
	props.onGlobalStateChange((state, prev) => {
		console.log("[vue2-app] 接收到父应用状态变更信息", state, prev);
	});
	// 这里在运行当前子应用实例
	render(props);
}
// 销毁子应用时候 调用的钩子
export async function unmount() {
	console.log("[vue2-app] 应用销毁");
	app.$destroy();
	app.$el.innerHTML = "";
	app = null;
}
// 增加 update 钩子以便主应用手动更新微应用
export async function update(props) {
	// renderPatch(props);
}
