<script setup>
import NewTask from './components/tasks/NewTask.vue';
import TasksComponent from './components/tasks/TasksCard.vue';
import { Toast } from 'primevue';
</script>

<template>
  <main class="bg-slate-100 dark:bg-zinc-800 min-h-screen flex flex-col items-center  text-blue-500 dark:text-white">
    <h1 class="text-6xl font-bold mb-4 mt-10 dark:text-white">Tarefas</h1>
    <Toast />
    <NewTask/>
    <TasksComponent/>
  </main>

</template>
