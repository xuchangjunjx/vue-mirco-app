<template>
	<div class="about">
		<h1>vue2-app about page</h1>
		<button @click="notify">通知父应用</button>
	</div>
</template>
<script>
export default {
	methods: {
		notify() {
			this.emitMainApp({
				event: {
					type: "on-refresh-token",
					data: {
						token: "12345",
						refreshToken: "23456"
					}
				}
			});
		}
	}
};
</script>
