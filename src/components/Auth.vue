<template>
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<!-- note -->
				<v-card class="elevation-12">
					<v-tabs v-model="tab" background-color="primary" class="elevation-2" dark>
						<v-tab href="#login-tab">Login</v-tab>
						<v-tab-item value="login-tab">
							<LoginForm />
						</v-tab-item>

						<v-tab href="#register-tab">Register</v-tab>
						<v-tab-item value="register-tab">
							<RegisterForm />
						</v-tab-item>
					</v-tabs>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import LoginForm from "./LoginForm";
	import RegisterForm from "./RegisterForm";

	export default {
		components: {
			LoginForm,
			RegisterForm
		},
		data() {
			return {
				tab: null
			};
		}
	};
</script>