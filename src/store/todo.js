const BASE_URL = 'http://localhost:3535/todo';

const initialState = () => {
    return {
        todos: [],
        title: 'Ferasat',
        loadingTodos: false,
    }
}
const mutations = {
    setTodos(state, todos) {
        state.todos = todos;
    },
    updateTodo() {},
    deleteTodo() {},
    setTitle(state, newTitle) {
        state.title = newTitle;
    },
    setLoadingTodos(state, flag) {
        state.loadingTodos = flag;
    }
}

const actions = {   
  async  createTodoList({commit,state},todo) {
    const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
          },
    });
    // console.log(" i am here");
    const responseJson = await response.json();
    // state.todos.push(responseJson)
    commit('setTodos',[responseJson,...state.todos]);
  },
    async updateTodo({commit,state},todo) {
        let id = todo.id;
        delete todo.id;
         const response = await fetch(`${BASE_URL}/${id}`,{
              method : 'PUT',
              body: JSON.stringify(todo),
              headers: {
                  'Content-Type': 'application/json'
                }  
         });
         const responseJson = await response.json();
         console.log(responseJson);
        const newTodo = state.todos.filter((todo) => todo.id !== id);
        commit('setTodos',[responseJson.todo,...newTodo]);
    },
    async updateStatus({commit,state},todo) {
        let id = todo.id;
        delete todo.id;
         await fetch(`${BASE_URL}/${id}`,{
            method : 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
              }  
       });
       commit();
       state;
    },
    async deleteTodo({commit, state}, id) {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        const newTodo = state.todos.filter((todo) => todo.id !== id);
        commit('setTodos', newTodo);
    },
    async fetchTodos({commit}) {
        commit('setLoadingTodos', true);
        const allTodosResponse = await fetch(`${BASE_URL}/All`);
        const responseJson = await allTodosResponse.json();
        commit('setTodos', responseJson.todo);
        commit('setLoadingTodos', false);
    }
}

export default {
    state: initialState,
    mutations,
    actions
}