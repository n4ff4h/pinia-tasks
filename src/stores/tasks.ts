import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', {
  // () => ({}) is short form of () => {return {}}
  state: () => ({
    tasks: [] as Task[],
    isLoading: false
  }),
  getters: {
    favs(): Task[] {
      // returns task if isFav is `true`
      return this.tasks.filter((task) => task.isFav)
    },
    favCount(): number {
      return this.tasks.reduce(
        (accumulator, currentTask) => (currentTask.isFav ? accumulator + 1 : accumulator),
        0
      )
    },
    /*
      Using arrow functions to define getters.
      Note: `this` keyword does not refer to `state` in an arrow function,
        therefore, we pass `state` as an argument.
    */
    totalCount: (state) => state.tasks.length
  },
  actions: {
    async getTasks() {
      this.isLoading = true

      const { data } = await axios.get<Task[]>('http://localhost:3000/tasks')

      this.tasks = data // Populate tasks array with data from api

      this.isLoading = false
    },

    async addTask(task: Task) {
      this.tasks.push(task)

      await axios
        .post('http://localhost:3000/tasks', JSON.stringify(task), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    async deleteTask(id: number) {
      // The condition will return true for all tasks that does not match the id
      // The task that matches the id is filtered out and not assigned to this updated array
      this.tasks = this.tasks.filter((task) => task.id !== id)

      await axios.delete(`http://localhost:3000/tasks/${id}`).catch(function (error) {
        console.log(error)
      })
    },

    async toggleFav(id: number) {
      const task: Task | undefined = this.tasks.find((task) => task.id === id)
      task!.isFav = !task?.isFav

      await axios
        .patch(`http://localhost:3000/tasks/${id}`, JSON.stringify({ isFav: task?.isFav }), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
})

export interface Task {
  id: number
  title: string
  isFav: Boolean
}
