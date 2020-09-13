<template>
	<Auth />
</template>

<script>
	// @ is an alias to /src
	import Auth from "@/components/Auth.vue";

	export default {
		components: {
			Auth
		},
		created() {
			if (this.$store.state.token != null) {
				this.$router.push("todos");
			}
		}
	};
</script>
