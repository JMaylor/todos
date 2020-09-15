<template>
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<!-- note -->
				<v-card class="elevation-12">
					<v-toolbar color="teal" dark>
						<v-toolbar-title>Your list</v-toolbar-title>
						
						<v-spacer></v-spacer>
						<v-text-field hide-details="" v-model="query" v-if="show"></v-text-field>
						<v-btn icon>
							<v-icon @click="resetQuery">{{ show ? 'mdi-close' : 'mdi-magnify' }}</v-icon>
						</v-btn>
					</v-toolbar>
					<NewTodo />

					<v-divider v-if="incompleteTodos.length > 0"></v-divider>

					<v-list v-if="incompleteTodos.length > 0">
						<Todo v-for="todo in incompleteTodos" :key="todo._id" :todo="todo" />
					</v-list>

					<v-divider v-if="completedTodos.length > 0"></v-divider>

					<v-list v-if="completedTodos.length > 0">
						<Todo v-for="todo in completedTodos" :key="todo._id" :todo="todo" />
					</v-list>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import Todo from "./Todo";
	import NewTodo from "./NewTodo";
	export default {
		components: {
			Todo,
			NewTodo
		},
		data() {
			return {
				query: "",
				show: false,
			};
		},
		computed: {
			incompleteTodos() {
				return this.$store.state.todos.filter(todo => !todo.completed && todo.description.toLowerCase().includes(this.query.toLowerCase()));
			},
			completedTodos() {
				return this.$store.state.todos.filter(todo => todo.completed && todo.description.toLowerCase().includes(this.query.toLowerCase()));
			}
		},
		methods: {
			resetQuery() {
				this.query = '';
				this.show = !this.show;
			}
		},
		created() {
			this.$store.dispatch("getTodos");
		}
	};
</script>