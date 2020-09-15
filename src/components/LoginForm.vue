<template>
	<v-skeleton-loader
		ref="skeleton"
		:types="{ skeleton: 'list-item-avatar-two-line@2, button' }"
		type="skeleton"
		:height=" showError ? 280 : 208"
		class="mx-auto pa-4"
		transition="scale-transition"
		:loading="$store.state.loading"
	>
		<v-form v-model="valid" @submit.prevent="login()">
			<!-- Email -->
			<v-text-field v-model="email" label="E-mail" name="email" prepend-icon="mdi-email" type="text"></v-text-field>

			<!-- Password -->
			<v-text-field
				v-model="password"
				label="Password"
				name="password"
				prepend-icon="mdi-lock"
				:type="showPassword ? 'text' : 'password'"
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				@click:append="showPassword = !showPassword"
			></v-text-field>

			<v-alert v-if="showError" type="error">Login failed</v-alert>

			<v-btn :disabled="!valid" type="submit" color="primary">Login</v-btn>
		</v-form>
	</v-skeleton-loader>
</template>

<script>
	const axios = require("axios");

	export default {
		data() {
			return {
				valid: false,
				email: "",
				password: "",
				showPassword: false,
				showError: false
			};
		},
		methods: {
			async login() {
				// set state loading to true
				this.$store.commit("toggleLoading");
				await axios
					.post(`${this.$store.state.baseURL}users/login`, {
						email: this.email,
						password: this.password
					})
					.then(response => {
						const token = response.data.token;
						this.$store.commit("storeToken", token);
						this.$store.dispatch("storeTokenInLocalStorage");
						// redirect user?
						this.$router.push({ name: "Todos" });
					})
					.catch(err => {
						console.log(err);
						this.showError = true;
					});
				// set state loading to false
				this.$store.commit("toggleLoading");
			}
		}
	};
</script>