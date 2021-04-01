export default {
  state: {
    todos: [
    ],
    // subtasks: [
    // ],
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },

    setTodos(state, todo) {
      state.todos = todo;
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    addSubtask(state, { subtask, index }) {
      state.todos[index].subtasks.push(subtask);
    },
  },
  actions: {
    clearCompleted(context) {
      context.commit('setTodos', context.state.todos.filter((todo) => !todo.isDone));
    },
    destroyTodo(context, todo) {
      const index = context.state.todos.indexOf(todo);
      context.commit('removeTodo', index);
    },
    createTodo(context, todo) {
      context.commit('addTodo', todo);
    },
    createSubtask(context, { subtask, index }) {
      context.commit('addSubtask', { subtask, index });
      // context.commit('addTodo', subtask);
    },
  },
  getters: {
    activeTodos(state) {
      return state.todos.filter((t) => !t.isDone);
    },
    completedTodos(state) {
      return state.todos.filter((t) => t.isDone);
    },
    todos(state) {
      return state.todos;
    },
  },
};
