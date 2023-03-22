<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- New task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- Filter nav -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <div class="loading" v-if="isLoading">Loading...</div>

    <!-- Task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left to do</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useTaskStore } from './stores/tasks'
import TaskDetails from './components/TaskDetails.vue'
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
// Make all state properties and getters into refs
// Eg: Instead of taskStore.tasks in templates we directly use tasks
const { tasks, isLoading, favs, favCount, totalCount } = storeToRefs(taskStore)

taskStore.getTasks() // Fetch tasks

const filter = ref('all')
</script>
