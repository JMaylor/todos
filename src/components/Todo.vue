<template>
	<v-list-item>
		<v-list-item-icon>
			<v-icon color="teal" v-if="!todo.completed" @click="toggleCompleted">mdi-checkbox-blank-outline</v-icon>
			<v-icon color="teal" v-if="todo.completed" @click="toggleCompleted">mdi-check-box-outline</v-icon>
		</v-list-item-icon>

		<v-list-item-content>
			<v-list-item-title
				@click="makeEditable"
				v-if="!editable"
				:class="todo.completed ? 'completed' : ''"
			>{{ todo.description }}</v-list-item-title>
			<v-form v-else @submit.prevent="editTodo" class="m-0 p-0">
				<v-text-field
					ref="description-input"
					@blur="makeNotEditable"
					@keydown.esc="makeNotEditable"
					:loading="isLoading"
					dense
					hide-details
					background-color="teal lighten-5"
					v-model="newDescription"
					class="m-0 p-0"
					type="text"
				></v-text-field>
			</v-form>
		</v-list-item-content>

		<v-list-item-icon>
			<v-icon color="red" @click="deleteToDo">mdi-delete-outline</v-icon>
		</v-list-item-icon>
	</v-list-item>
</template>

<script>
	export default {
		props: ["todo"],
		data() {
			return {
				editable: false,
				newDescription: "",
				isLoading: false,
				isChangingCompletedStatus: false
			};
		},
		methods: {
			deleteToDo() {
				console.log("deleting todo");
				this.$store.dispatch("removeTodo", this.todo._id);
			},
			async toggleCompleted() {
				console.log("toggling completed", this.todo.completed);
				this.isChangingCompletedStatus = true;
				await this.$store.dispatch("toggleCompleted", this.todo);
				this.isChangingCompletedStatus = false;
			},
			makeEditable() {
				console.log("making editable");
				this.newDescription = this.todo.description;
				this.editable = true;
				this.$nextTick(() => {
					this.$refs["description-input"].focus();
				});
			},
			makeNotEditable() {
				console.log("making not editable");
				this.editable = false;
			},
			async editTodo() {
				console.log("editing todo");
				this.isLoading = true;
				await this.$store.dispatch("editTodo", {
					todo: this.todo,
					newDescription: this.newDescription
				});
				this.isLoading = false;
				this.$refs["description-input"].blur();
			}
		},
		created() {}
	};
</script>

<style scoped>
	.completed {
		text-decoration: line-through;
		color: gray;
	}
</style>