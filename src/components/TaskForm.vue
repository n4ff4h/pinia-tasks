<template>
  <!-- `prevent`: Page reload when submitting the form -->
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button>Add</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/tasks'

const taskStore = useTaskStore()
const newTask = ref('')

function handleSubmit() {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      id: Math.floor(Math.random() * 10000),
      title: newTask.value,
      isFav: false
    })
    newTask.value = ''
  }
}
</script>

<style scoped></style>
