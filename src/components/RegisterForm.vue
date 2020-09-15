<template>
	<v-skeleton-loader
		ref="skeleton"
		:types="{ skeleton: 'list-item-avatar-three-line@3' }"
		type="skeleton"
		:height=" showError ? 350 : 278"
		class="mx-auto pa-4"
		transition="scale-transition"
		:loading="$store.state.loading"
	>
		<v-form v-model="valid" @submit.prevent="register()">
			<!-- Name -->
			<v-text-field
				v-model="name"
				:rules="nameRules"
				:counter="20"
				label="Name"
				name="name"
				prepend-icon="mdi-account"
				type="text"
			></v-text-field>

			<!-- Email -->
			<v-text-field
				v-model="email"
				:rules="emailRules"
				label="E-mail"
				name="email"
				prepend-icon="mdi-email"
				type="text"
			></v-text-field>

			<!-- Password -->
			<v-text-field
				v-model="password"
				label="Password"
				name="password"
				hint="At least 7 characters"
				prepend-icon="mdi-lock"
				:type="showPassword ? 'text' : 'password'"
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				:rules="passwordRules"
				counter
				@click:append="showPassword = !showPassword"
			></v-text-field>

			<v-alert v-if="showError" type="error">Unable to create your account</v-alert>

			<v-btn :disabled="!valid" type="submit" color="primary">Register</v-btn>
		</v-form>
	</v-skeleton-loader>
</template>

<script>
	const axios = require("axios");

	export default {
		data: () => ({
			valid: false,
			name: "",
			nameRules: [
				v => !!v || "Name is required",
				v => v.length <= 20 || "Name must be less than 20 characters"
			],
			email: "",
			emailRules: [
				v => !!v || "E-mail is required",
				v => /.+@.+\..+/.test(v) || "Email must be valid"
			],
			password: "",
			passwordRules: [
				v => !!v || "Password is required",
				v => v.length >= 7 || "Mininmum 8 characters",
				v =>
					!v.toLowerCase().includes("password") ||
					"Your password can't include that!"
			],
			showPassword: false,
			showError: false
		}),
		methods: {
			async register() {
				// set state loading to true
				this.$store.commit("toggleLoading");
				// send register request
				await axios
					.post(`${this.$store.state.baseURL}users`, {
						name: this.name,
						email: this.email,
						password: this.password
					})
					.then(response => {
						// if successful we will get back JWT
						const token = response.data.token;
						// store token in state
						this.$store.commit("storeToken", token);
						// store token in local storage
						this.$store.dispatch("storeTokenInLocalStorage");
						// redirect user?
						this.$router.push({ name: "Todos" });
					})
					// if not successful, we display error feedback to user
					.catch(error => {
						console.log(error.response);
						this.showError = true;
					});
				// set state loading to false
				this.$store.commit("toggleLoading");
			}
		}
	};
</script>