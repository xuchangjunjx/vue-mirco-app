import { initGlobalState } from "qiankun";
import Vue from "vue";

export default {
	// 假如我们要同步的东西 先初始化在这里
	state: {
		// 预留一个事件处理状态 下面用
		event: {},
		// 需要同步给子应用的东西
		userInfo: {
			name: "aa"
		}
	},
	actions: null,
	init() {
		// 初始化
		this.actions = initGlobalState(this.state);
		// 监听变化
		this.actions.onGlobalStateChange((state, prev) => {
			// state: 变更后的状态; prev 变更前的状态
			// 如果是事件变化了 则给eventBus去触发对应的事件
			if (state.event) {
				console.log("接收到子应用事件：", state.event);
				if (Vue.prototype.$eventBus) {
					Vue.prototype.$eventBus.$emit(state.event.type);
				}
			} else {
				// 普通的状态修改
				for (let key in state) {
					this.state[key] = state[key];
				}
			}
		});
		return this.actions;
	},
	// 修改状态指定字段
	setState(state) {
		// console.log('globalState setState',state)
		for (let key in state) {
			this.state[key] = state[key];
		}
		this.actions && this.actions.setGlobalState(state);
		return this.actions;
	},
	// 解除
	offState() {
		this.actions.offGlobalStateChange();
		return this.actions;
	}
};
