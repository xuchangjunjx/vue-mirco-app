import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView
	},
	{
		path: "/app/vue2-app/*",
		name: "vue2-app-container",
		component: () => import("../views/vue2-app-container")
	},
	{
		path: "/app/vue3-app/*",
		name: "vue3-app-container",
		component: () => import("../views/vue3-app-container")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
