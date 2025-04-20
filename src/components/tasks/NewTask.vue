<script setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';

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
    closeDialog();
  } else {
    toast.add({
      severity: 'error',
      icon: 'pi pi-exclamation-triangle',
      summary: 'Erro',
      detail: 'Preencha todos os campos obrigatórios',
      life: 3000,
    });
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

const isDialogVisible = ref(false);

const openDialog = () => {
  isDialogVisible.value = true;
};

const closeDialog = () => {
  isDialogVisible.value = false;
};
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex justify-between items-center p-10 w-full">
      <Button label="Adicionar Tarefa" @click="openDialog" icon="pi pi-plus" />
    </div>

    <Dialog
      v-model:visible="isDialogVisible"
      header="Adicionar Nova Tarefa"
      :modal="true"
      :dismissableMask="true"
      :style="{ width: '50rem' }"
      :draggable="false"
    >
      <div class="flex flex-col gap-4">
        <div class="field">
          <label for="task" class="text-blue-500 text-xl font-bold">Tarefa</label>
          <InputText v-model="taskForm.title" id="task" type="text" class="w-full" />
        </div>

        <div class="field">
          <label for="description" class="text-blue-500 text-xl font-bold">Descrição</label>
          <Textarea v-model="taskForm.description" id="description" type="text" class="w-full" rows="5" />
        </div>

        <div class="field">
          <label for="dueDate" class="text-blue-500 text-xl font-bold">Data de Entrega</label>
          <DatePicker v-model="taskForm.dueDate" id="dueDate" class="w-full" placeholder="Data de Entrega" />
        </div>

        <div class="field">
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
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
        <Button label="Salvar" icon="pi pi-check" @click="addTask" autofocus />
      </template>
    </Dialog>
  </div>
</template>
