<template>
	<v-app-bar app color="primary" dark>
		<div class="d-flex align-center">
			<v-btn href="https://maylor.io" target="_blank" text>
				<span class="mr-2">maylor.io</span>
				<v-icon>mdi-open-in-new</v-icon>
			</v-btn>
			<v-btn @click="$store.dispatch('logout')" text v-if="$store.state.token != null">
				<span class="mr-2">Logout</span>
				<v-icon>mdi-account-minus-outline</v-icon>
			</v-btn>
			<v-btn :to="'todos'" text v-if="$store.state.token != null">
				<span class="mr-2">Todos</span>
				<v-icon>mdi-help</v-icon>
			</v-btn>
			<v-btn :to="'/'" text v-if="$store.state.token == null">
				<span class="mr-2">Login/Register</span>
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</div>

		<v-spacer></v-spacer>

		<v-btn :to="'about'" text>
			<span class="mr-2">About</span>
			<v-icon>mdi-help</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
	export default {
		methods: {}
	};
</script>
