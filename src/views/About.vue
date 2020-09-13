<template>
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<!-- note -->
				<v-card class="elevation-12">
					<v-toolbar color="teal" dark>
						<v-toolbar-title>About</v-toolbar-title>
					</v-toolbar>
					<v-card-title>A website by Joseph Maylor</v-card-title>
					<v-card-text>
						Backend:
						<br />

						<v-icon color="green">mdi-nodejs</v-icon>NodeJS
						<br />
						<v-icon color="black">mdi-server</v-icon>Express
						<br />
						<v-icon color="green darken-2">mdi-database</v-icon>MongoDB
						<br />
						<br />Frontend:
						<br />

						<v-icon color="teal">mdi-vuejs</v-icon>VueJS, Vuex & Vue Router
						<br />
						<v-icon color="blue">mdi-vuetify</v-icon>Vuetify
						<br />
						<br />Other:
						<br />
						<v-icon color="orange">mdi-lock</v-icon>JSON Web Token & Bcrypt
						<br />
						<br />View my other projects at
						<a href="https://maylor.io" target="_blank">maylor.io</a>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
