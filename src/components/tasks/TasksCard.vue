<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { useToast } from 'primevue';
import { useTaskStore } from '@/stores/TaskStore';
import { computed, ref } from 'vue';

const toast = useToast();
const taskStore = useTaskStore();

// Filtro de status de conclusão
const filterOptions = [
  { name: 'Todas as Tarefas', value: 'all' },
  { name: 'Concluídas', value: 'completed' },
  { name: 'Pendentes', value: 'incomplete' }
];

const selectedFilter = ref('all');

// Computed property para obter as tarefas filtradas
const filteredTasks = computed(() => {
  switch (selectedFilter.value) {
    case 'completed':
      return taskStore.getCompletedTasks;
    case 'incomplete':
      return taskStore.getIncompleteTasks;
    default:
      return taskStore.getTasks;
  }
});

// Function to remove a task
const removeTask = (taskId) => {
  taskStore.removeTask(taskId);
  toast.add({
      severity: 'warn',
      icon: 'pi pi-check',
      summary: 'Tarefa Removida',
      detail: `A tarefa foi removida!`,
      life: 3000,
    });
};

// Function to toggle task completion
const toggleTaskCompletion = (taskId) => {
  taskStore.toggleTaskCompletion(taskId);
  // Optional: Add a toast notification to confirm the status change
  toast.add({
    severity: 'info',
    icon: 'pi pi-info-circle',
    summary: 'Status Atualizado',
    detail: 'Status da tarefa foi alterado',
    life: 2000,
  });
};
</script>

<template>
  <div class="w-full">
    <div class="flex justify-end mb-4 px-10">
      <Dropdown
        v-model="selectedFilter"
        :options="filterOptions"
        optionLabel="name"
        optionValue="value"
        placeholder="Filtrar por status"
        class="w-64"
      />
    </div>

    <div class="grid grid-cols-3 gap-4 w-full p-10">
      <Card v-for="task in filteredTasks" :key="task.id">
        <template #title>{{ task.title }}</template>
        <template #content>
          <label for="" class="text-blue-500 font-bold">Descrição</label>
          <p class="m-0">{{ task.description }}</p>
          <label for="" class="text-blue-500 font-bold">Data de Entrega</label>
          <p class="m-0">{{ task.dueDate || 'Sem data definida' }}</p>
          <label for="" class="text-blue-500 font-bold">Prioridade</label>
          <p class="m-0">{{ task.priority || 'Sem prioridade definida' }}</p>
          <label for="" class="text-blue-500 font-bold">Status</label>
          <p class="m-0">
            {{ task.completed ? 'Concluída' : 'Pendente' }}
          </p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button label="Remover" severity="primary" class="w-full" icon="pi pi-trash" @click="removeTask(task.id)" />
            <div class="flex items-center gap-2">
              <label>Concluída:</label>
              <Button
                color="secondary"
                :icon="task.completed ? 'pi pi-check-square' : 'pi pi-square'"
                :class="task.completed ? 'p-button-success' : 'p-button-secondary'"
                @click="toggleTaskCompletion(task.id)"
                text
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
