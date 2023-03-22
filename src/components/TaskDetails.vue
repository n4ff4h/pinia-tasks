<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="taskStore.deleteTask(task.id)" class="material-icons">delete</i>
      <!-- Class data binding using an object: if task isFav, `active` class is used -->
      <i
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task.id)"
        class="material-icons"
        >favorite</i
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore, type Task } from '../stores/tasks'

const taskStore = useTaskStore()

defineProps<{
  task: Task
}>()
</script>

<style scoped></style>
