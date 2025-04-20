<script setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dropdown from 'primevue/dropdown';
import { useToast } from 'primevue';

import { ref } from 'vue';
import { useTaskStore } from '@/stores/TaskStore';

const toast = useToast();
const tasksStore = useTaskStore();

// Define priority options
const priorityOptions = [
  { name: 'Baixa', value: 'low' },
  { name: 'Normal', value: 'normal' },
  { name: 'Alta', value: 'high' },
  { name: 'Urgente', value: 'urgent' }
];

const taskForm = ref({
  title: '',
  description: '',
  dueDate: null,
  completed: false,
  priority: 'normal', // Set default priority
});

const addTask = () => {
  if (taskForm.value.title && taskForm.value.description) {
    tasksStore.addTask({
      ...taskForm.value,
      dueDate: formatDate(taskForm.value.dueDate),
    });
    toast.add({
      severity: 'success',
      icon: 'pi pi-check',
      summary: 'Tarefa Criada',
      detail: `A tarefa "${taskForm.value.title}" foi adicionada com sucesso!`,
      life: 3000,
    });
    resetForm();
    showModal();
  } else {
    alert('Preencha todos os campos');
  }
}

const resetForm = () => {
  taskForm.value.title = '';
  taskForm.value.description = '';
  taskForm.value.dueDate = null;
  taskForm.value.priority = 'normal'; // Reset priority to default
}

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Retorna no formato 'YYYY-MM-DD'
};

const isOpen = ref(false);
const showModal = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex justify-between items-center p-10 w-full">
      <Button label="Adicionar Tarefa" @click="showModal" icon="pi pi-plus"/>
    </div>

    <form v-if="isOpen" @submit.prevent="addTask" action="" class="flex flex-col gap-4 w-full p-10">
      <label for="task" class="text-blue-500 text-xl font-bold">Tarefa</label>
      <InputText v-model="taskForm.title" id="task" type="text" class="w-full" />

      <label for="description" class="text-blue-500 text-xl font-bold">Descrição</label>
      <Textarea v-model="taskForm.description" id="description" type="text" class="w-full" />

      <label for="dueDate" class="text-blue-500 text-xl font-bold">Data de Entrega</label>
      <DatePicker v-model="taskForm.dueDate" id="dueDate" class="w-full" placeholder="Data de Entrega" />

      <label for="priority" class="text-blue-500 text-xl font-bold">Prioridade</label>
      <Dropdown
        v-model="taskForm.priority"
        id="priority"
        :options="priorityOptions"
        optionLabel="name"
        optionValue="value"
        placeholder="Selecione uma prioridade"
        class="w-full"
      />

      <Button label="Adicionar Tarefa" class="w-full" type="submit" />
    </form>
  </div>
</template>
