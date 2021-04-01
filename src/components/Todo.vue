<template>
    <v-app class='background'>
        <v-container class='my-3'>
            <v-flex class=''>
              <v-layout justify-center class=''>
              <v-dialog max-width="600px" class='red'>
                <template v-slot:activator="{ on }">
                <v-btn  v-on="on" class="success">
                      <v-icon color="white">add_box</v-icon>
                      <span class='white--text'>Create a card</span>
                  </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                        <h2>Add a New Item </h2>
                    </v-card-title>
                    <v-card-text>
                    <v-form class='px-3' ref="form">
                        <v-textarea label="Item" v-model="todoText"
                    prepend-icon="edit"
                    :rules="inputRules"></v-textarea>
                    <v-btn text @click="createTodo" class="success">Add item</v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
              </v-dialog>
              <v-btn @click="clearComplete" small
               class='pink ml-6 mt-1 white--text' depressed>
                <v-icon>restore_from_trash</v-icon>clear completed</v-btn>
              </v-layout>
            </v-flex>
            <v-flex  class=''>
            <v-card flat class="mx-auto my-5 grey lighten-2" width="30%"
    v-for="(task) in todos" :key="task.text">
            <div v-if="!task.to_completedlist">
             <v-progress-linear
                        color="green darken-1"
                        striped class='' height="10"
                         v-model="task.progress"></v-progress-linear>
                <v-layout row wrap class='  pt-3 mb-2'>
                    <v-flex  class=''>
                            <v-layout justify-center class='pb-5'>
                            <v-checkbox class=""
                              v-model="task.isDone"
                              color="pink"
                              hide-details
                              @click="Done(task.isDone,task.text)"
                            ></v-checkbox>
                            </v-layout>
                    </v-flex>
                    <v-flex class=''>
                      <v-layout justify-center class='pt-3'>
                     <h3 class='font-weight-bold'>{{task.text}}</h3>
                      </v-layout>
                    </v-flex>
                    <v-flex class=''>
                       <v-row>
                      <v-layout justify-end class=' mt-4 mr-6'>
                        <v-dialog max-width="500px">
                          <template v-slot:activator="{ on }">
                      <v-btn small v-on="on" depressed class='pink lighten-1'> <v-icon color='white'
                       small>edit</v-icon></v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                                <h4 class='grey--text'>Add a sub-item </h4>
                            </v-card-title>
                            <v-card-text>
                            <v-form class='px-3' ref="form">
                                <v-textarea label="Item" v-model="todoText"
                            prepend-icon="edit"
                            :rules="inputRules"></v-textarea>
                            <v-btn text small
                             @click="createSubtask(task.text)" class="success">Add item</v-btn>
                              </v-form>
                            </v-card-text>
                            <v-flex class='grey lighten-3'>
                              <v-row>
                                <v-col >
                            <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="pink ma-3 ml-9"
          depressed
          small
          v-bind="attrs"
          v-on="on"
        >
            <v-icon color='white'>date_range</v-icon>
          <span class='white--text'>Date</span>
        </v-btn>
      </template>
      <v-date-picker
       v-model="task.Due_date" color='pink lighten-2'></v-date-picker>
    </v-menu></v-col><v-col class=' ' align="center">{{task.Due_date}}</v-col>
    <v-col align="center"><v-btn text small v-if="task.Due_date!==undefined"
      @click="confirmDate(task.Due_date, task.text)" outlined
      class="ml-2 pink--text white" >Save</v-btn></v-col>
                              </v-row>
                            </v-flex>
                        </v-card>
              </v-dialog>
                      </v-layout>
                     </v-row>
                     <v-col align='end' class='grey--text  text--darken-2'>{{task.Due_date}}</v-col>
                    </v-flex>
                </v-layout >
                    <v-flex class=''>
                 <v-card flat class="grey lighten-4 " width="100%" height="100%"
                  v-for="(subtask) in task.subtasks" :key="subtask.text">
                <v-layout
                  row wrap class='mb-3'>
                  <v-flex class=''>
                            <v-layout justify-center class=''>
                            <v-checkbox class="ma-2"
                              v-model="subtask.isDone"
                              color="pink"
                              hide-details
                              @click="subDone(subtask.isDone,task.text, subtask.text)"
                            ></v-checkbox>
                            </v-layout>
                    </v-flex>
                    <v-flex  class=''>
                      <v-layout justify-center class='mt-2'>
                     <subtitle-1 class=''>{{subtask.text}}</subtitle-1>
                      </v-layout>
                    </v-flex>
                    <v-flex class='d-flex justify-end '>
                    <v-btn
                    @click="Delete(task.text,subtask.text)"
                     class='green lighten-3 mr-5 mt-2' small depressed>
                      <v-icon color='white darken-3'>mdi-delete</v-icon></v-btn>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                 </v-card>
                    </v-flex>
            </div>
            </v-card>
            </v-flex>
              <v-card flat class="mx-auto mr-5 my-auto white lighten-4"
    max-width="150" v-for="task in todos" :key="task.text">
                <v-flex v-if="task.to_completedlist && iscompleted" class='d-flex justify-end '>
                <v-card-text>
                  {{task.text}}
                </v-card-text>
                    <v-btn
                    @click="Delete_completedList(task.text)"
                     class='white mt-3 mr-2' small depressed>
                      <v-icon color='pink'>mdi-delete</v-icon></v-btn>
                    </v-flex>
              </v-card>
            <v-flex class='d-flex justify-end'>
              <v-btn  v-bind:color="iscompleted ? 'success' : 'pink'" depressed small class='pink' @click="iscompleted = !iscompleted">
                <p class='white--text my-auto'>Completed</p>
              </v-btn>
              </v-flex>
      </v-container>
    </v-app>
</template>

<style scoped>
.background {
    background-image: url(https://cdn.wallpapersafari.com/54/1/M5zI2u.jpg);
    background-repeat: no-repeat;
    background-size:cover
}
.input__label {
   color: rgb(255, 255, 255);
   font-size: 12px;
}
.round {
  position: relative;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 0;
  width: 28px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type="checkbox"] {
  visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';

const database = firebase.database();

export default {
  data() {
    return {
      iscompleted: false,
      hide: true,
      todoText: '',
      todoRef: null,
      inputRules: [
        (v) => v.length >= 3 || 'Minimum length should be more than 3 characters',
      ],
      todos: {},
      uid: this.$store.state.auth.user.uid,
    };
  },
  created() {
    this.todoRef = database.ref(`/todos/${this.uid}`);
  },
  mounted() {
    this.todoRef.on('value', (snapshot) => {
      if (snapshot !== undefined) {
        this.todos = snapshot.val();
      }
    });
  },
  computed: {
    sortByDate() {
      return Object.fromEntries(Object.entries(this.todos)
        .sort((a, b) => (a[1].Due_date < b[1].Due_date ? -1 : 1)));
    },
  },
  methods: {
    createTodo() {
      this.todoRef.push({
        text: this.todoText.trim(), isDone: false, progress: 0, to_completedlist: false,
      });
      this.todoText = '';
      this.todos = this.sortByDate;
    },
    createSubtask(text) {
      this.todoRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[1].text === text) {
            this.todoRef.child(key[0]).child('subtasks').push({
              text: this.todoText.trim(), isDone: false,
            });
          }
        });
      });
      this.todoText = '';
      this.todos = this.sortByDate;
    },
    Done(isdone, text) {
      this.todoRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[1].text === text) {
            this.todoRef.child(key[0]).update({
              isDone: isdone,
            });
            if (isdone) {
              this.todoRef.child(key[0]).transaction((snapshot2) => {
                if (snapshot2.subtasks !== undefined) {
                  Object.entries(snapshot2.subtasks).forEach((key2) => {
                    this.subDone(true, snapshot2.text, key2[1].text);
                  });
                } else {
                  this.todoRef.child(key[0]).update({
                    progress: 100,
                  });
                }
              });
            } else if (this.todoRef.child(key[0]) !== undefined) {
              this.todoRef.child(key[0]).update({
                progress: 0,
              });
              this.todoRef.child(key[0]).transaction((snapshot2) => {
                if (snapshot2.subtasks !== undefined) {
                  Object.entries(snapshot2.subtasks).forEach((key2) => {
                    this.subDone(false, snapshot2.text, key2[1].text);
                  });
                }
              });
            }
          }
        });
      });
      this.todos = this.sortByDate;
    },
    clearComplete() {
      this.todoRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[1].isDone) {
            this.todoRef.child(key[0]).update({
              to_completedlist: true,
            });
          }
          if (key[1].subtasks !== undefined) {
            Object.entries(key[1].subtasks).forEach((key2) => {
              if (key2[1].isDone) {
                this.todoRef.child(key[0]).child('subtasks').child(key2[0]).remove();
              }
            });
          }
        });
      });
      this.todos = this.sortByDate;
    },
    subDone(isdone, text, subtaskText) {
      this.todoRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[1].text === text) {
            const total = Object.keys(key[1].subtasks).length;
            let count = 0;
            Object.entries(key[1].subtasks).forEach((key2) => {
              if (key2[1].text === subtaskText) {
                this.todoRef.child(key[0]).child('subtasks').child(key2[0]).update({
                  isDone: isdone,
                });
                if (isdone) {
                  count += 1;
                }
              } else if (key2[1].isDone) {
                count += 1;
              }
            });
            this.todoRef.child(key[0]).update({
              progress: (count / total) * 100,
            });
            if (count === total) {
              this.todoRef.child(key[0]).update({
                isDone: true,
              });
            } else {
              this.todoRef.child(key[0]).update({
                isDone: false,
              });
            }
          }
        });
      });
      this.todos = this.sortByDate;
    },
    confirmDate(due, text) {
      this.todoRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[1].text === text) {
            this.todoRef.child(key[0]).update({
              Due_date: due,
            });
          }
        });
      });
      this.todos = this.sortByDate;
    },
    Delete(text, subtaskText) {
      this.todoRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[1].text === text) {
            const total = Object.keys(key[1].subtasks).length;
            Object.entries(key[1].subtasks).forEach((key2) => {
              if (key2[1].isDone) {
                this.todoRef.child(key[0]).update({
                  progress: key[1].progress - (1 / total) * 100,
                });
              }
              if (key2[1].text === subtaskText) {
                this.todoRef.child(key[0]).child('subtasks').child(key2[0]).remove();
              }
            });
          }
        });
      });
      this.todos = this.sortByDate;
    },
    Delete_completedList(text) {
      this.todoRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[1].text === text) {
            this.todoRef.child(key[0]).remove();
          }
        });
      });
      this.todos = this.sortByDate;
    },
  },
};
</script>
