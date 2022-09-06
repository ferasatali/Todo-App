<template>
  <div class="container">
    <h2 class="text-center mt-5">My Vue Todo-App</h2>
    <!-- input    -->
    <div class="d-flex" v-if="!isEditing">
      <input v-model="name"  type="text" placeholder="Enter Task " class="col form-control" />
      <input v-model="status"  type="text" placeholder="Satus" class="col form-control" />
      <input v-model="time"  type="number" placeholder=" Time " class="col form-control" />
      <input v-model="completeDate"  type="date" placeholder=" Date Completed " class="col form-control" />
      <button @click="createTask"  class="btn btn-warning rounded-0">Submit</button>
    </div>
    <div class="d-flex" v-else >
          <input v-model="name"  type="text" placeholder="Enter Task " class="col form-control" />
      <input v-model="status"  type="text" placeholder="Satus" class="col form-control" />
      <input v-model="time"  type="number" placeholder=" Time " class="col form-control" />
      <input v-model="completeDate"  type="date" placeholder=" Date Completed " class="col form-control" />
      <button @click="updateTodoList"  class="btn btn-warning rounded-0">Submit</button>
    </div>
    <!-- table  -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Time</th>
          <th scope="col">completedDate</th>
          <th scope="col">#Upated</th>
          <th scope="col">#deleted</th>
        </tr>
      </thead>
      <tbody v-if="!loadingTodos">
        <tr v-for="(task,index) in todos" :key="index" >
          <td scope="row">
                <h5> {{task.name}}  </h5>
          </td>
          <td>
            <span @click="changeStatus(task)">
            {{task.status}}
             </span>
            </td>
          <td>{{task.time}}</td>
          <td>{{task.completedDate}} </td>
          <td>
            <div class="text-center" @click="editTask(task,index)">
              <button class="fa fa-pen" > </button>
            </div>
          </td>
          <td>
            <div class="text-center" @click="deleteTask(task.id)">
              <span class="fa fa-trash"> </span>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          Loading....
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      task: ' ',
      selectedIndex : null,
      isEditing : false,
      message: 'checking',
      index : null,
      // editing : false,
      //  todoText : '',
       availableStatus : ['pending','complete'],
    };
  },
  computed: {
    ...mapState("todo", ["todos", "loadingTodos"]),
  },

  mounted() {
    // see https://v2.vuejs.org/v2/api/#mounted
    this.fetchTodos();
  },

  methods: {
    ...mapActions("todo", [
      "setTitle",
      "fetchTodos",
      "deleteTodo",
      "createTodoList",
      "updateTodo",
      "updateStatus"
    ]),
    start() {
      // this.$store.dispatch('todo/setTitle', 'Todo');
    },
    createTask() {
      let todo = {
        name: this.name,
        time: this.time,
        status: this.status,
        completedDate: this.completeDate,
      };
      // console.log(todo);
      this.createTodoList(todo);
    },
    deleteTask(todoId) {
      this.deleteTodo(todoId);
      console.log("sdbhfjsdjbf");
    },
    editTask(comingTask,index) {
      //  this.editing = this.editing == true ? false : true;
      // this.todoText = ;
      // console.log("skjnsjd",this.name);
      // console.log(this.message);
      // this.todos[index].name  = comingTask.name;
      // this.task.name = comingTask.name;
          this.name = comingTask.name; 
          this.status = comingTask.status;
          this.time = comingTask.time;
          this.completeDate = comingTask.completeDate;
          this.index = comingTask.id;
      // console.log(this.todos[3].name);
      // console.log('adad',this.todos[index].name);
         this.selectedIndex = index;
         this.isEditing= true;
      // this.updateTodo(index);
    },
    updateTodoList () {
         this.isEditing= false;
         let todo = {
        name: this.name,
        time: this.time,
        status: this.status,
        completedDate: this.completeDate,
        id : this.index,
        currentIndex : this.selectedIndex
      };
         this.updateTodo(todo);
    },
    changeStatus(task) {
        let newIndex = this.availableStatus.indexOf(task.status);
        if(++newIndex > 1) newIndex =0;
        task.status=this.availableStatus[newIndex];
        let todo = {
          status : task.status,
          id : task.id,
          currentIndex : this.selectedIndex
        }
        this.updateTodo(todo);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.pointer {
  cursor: pointer;
}
.finished {
  text-decoration: line-through;
}
</style>
