<template>
	<v-form @submit.prevent="addTodo" class="mx-auto pa-4">
		<v-text-field
			v-model="newTodo"
			hide-details="auto"
			name="new-todo"
			ref="new-todo"
			:loading="isLoading"
			:disabled="isLoading"
			type="text"
			@click:prepend="addTodo"
		>
		<v-icon slot="prepend" color="primary">mdi-plus</v-icon></v-text-field>
	</v-form>
</template>

<script>
	export default {
		data() {
			return {
				newTodo: "",
				isLoading: false
			};
		},
		methods: {
			async addTodo() {
				if (this.newTodo == "") {
					return null;
				}
				this.isLoading = true;
				await this.$store.dispatch("addTodo", this.newTodo);
				this.newTodo = "";
				this.isLoading = false;
				this.$nextTick(() => {
					this.$refs["new-todo"].focus();
				});
			}
		},
		created() {}
	};
</script>