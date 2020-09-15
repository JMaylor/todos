<template>
	<v-container fluid>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="8" md="4">
				<!-- note -->
				<v-card class="elevation-12">
					<v-toolbar color="secondary" dark>
						<v-toolbar-title>Your list</v-toolbar-title>

						<v-spacer></v-spacer>
						<v-text-field hide-details v-model="query" v-if="show"></v-text-field>
						<v-btn icon>
							<v-icon @click="resetQuery">{{ show ? 'mdi-close' : 'mdi-magnify' }}</v-icon>
						</v-btn>
						<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-bind="attrs" v-on="on">
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>
							<v-card>
								<v-switch
									hide-details
									class="pt-3 px-3"
									color="accent"
									v-model="showCompleted"
									label="Show Completed"
								></v-switch>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="secondary" text @click="menu = false">OK</v-btn>
								</v-card-actions>
							</v-card>
						</v-menu>
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
				menu: false,
				showCompleted: true
			};
		},
		computed: {
			incompleteTodos() {
				return this.$store.state.todos.filter(
					todo =>
						!todo.completed &&
						todo.description
							.toLowerCase()
							.includes(this.query.toLowerCase())
				);
			},
			completedTodos() {
				return !this.showCompleted
					? []
					: this.$store.state.todos.filter(
							todo =>
								todo.completed &&
								todo.description
									.toLowerCase()
									.includes(this.query.toLowerCase())
					  );
			}
		},
		methods: {
			resetQuery() {
				this.query = "";
				this.show = !this.show;
			}
		},
		created() {
			this.$store.dispatch("getTodos");
		}
	};
</script>