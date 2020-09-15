import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL: process.env.VUE_APP_URL,
    loading: false,
    token: localStorage.getItem("token"),
    todos: [],
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    storeToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = null;
    },
    resetState(state) {
      state.token = null;
    },
    setTodos(state, todos) {
      state.todos = todos;
    },
    sortTodos(state) {
      state.todos = state.todos.sort((a, b) => a.completed - b.completed);
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo._id != id);
    },
    toggleCompleted(state, todo) {
      // find the todo's position in the array
      const todoIndex = state.todos.findIndex((x) => x._id == todo._id);
      // get the current status
      const currentStatus = state.todos[todoIndex].completed;
      // update to new status
      state.todos[todoIndex].completed = !currentStatus;
    },
    editTodo(state, todoDetails) {
      // find the todo's position in the array
      const todoIndex = state.todos.findIndex(
        (x) => x._id == todoDetails.todo._id
      );
      // update to new description
      state.todos[todoIndex].description = todoDetails.newDescription;
    },
  },
  actions: {
    storeTokenInLocalStorage(context) {
      localStorage.setItem("token", context.state.token);
    },
    removeTokenFromLocalStorage() {
      localStorage.removeItem("token");
    },
    async logout(context) {
      await axios
        .post(
          `${context.state.baseURL}users/logout`,
          {},
          {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          }
        )
        .then((response) => {
          context.commit("resetState");
          context.dispatch("removeTokenFromLocalStorage");
          router.push({ name: "Home" });
          return response;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    async getTodos(context) {
      await axios
        .get(`${context.state.baseURL}tasks`, {
          headers: {
            Authorization: "Bearer " + context.state.token,
          },
        })
        .then((response) => {
          context.commit("setTodos", response.data);
        })
        .catch((error) => {
          console.log(error);
          context.commit("resetState");
          context.dispatch("removeTokenFromLocalStorage");
          router.push({ name: "Home" });
        });
    },
    async addTodo(context, todo) {
      await axios
        .post(
          `${context.state.baseURL}tasks`,
          {
            description: todo,
          },
          {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          }
        )
        .then((response) => {
          context.commit("addTodo", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    async removeTodo(context, id) {
      await axios
        .delete(`${context.state.baseURL}tasks/${id}`, {
          headers: {
            Authorization: "Bearer " + context.state.token,
          },
        })
        .then(context.commit("removeTodo", id))
        .catch((error) => console.log(error));
    },
    async toggleCompleted(context, todo) {
      await axios
        .patch(
          `${context.state.baseURL}tasks/${todo._id}`,
          {
            completed: !todo.completed,
          },
          {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          }
        )
        .then(context.commit("toggleCompleted", todo))
        .catch((error) => console.log(error));
    },
    async editTodo(context, todoDetails) {
      await axios
        .patch(
          `${context.state.baseURL}tasks/${todoDetails.todo._id}`,
          {
            description: todoDetails.newDescription,
          },
          {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          }
        )
        .then(context.commit("editTodo", todoDetails))
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
