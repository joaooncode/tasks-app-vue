import { defineStore } from "pinia";
import Task from "@/models/Task";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [], // Array reativo
    selectedTask: null,
  }),
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getSelectedTask(state) {
      return state.selectedTask;
    },
    // Getters para filtragem
    getCompletedTasks(state) {
      return state.tasks.filter(task => task.completed);
    },
    getIncompleteTasks(state) {
      return state.tasks.filter(task => !task.completed);
    }
  },
  actions: {
    addTask(task) {
      const newTask = new Task(
        task.title,
        task.description,
        task.dueDate,
        undefined, // O ID será gerado automaticamente
        task.completed,
        task.priority
      );
      this.tasks.push(newTask);
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
    selectTask(taskId) {
      this.selectedTask = this.tasks.find((task) => task.id === taskId);
    },
    toggleTaskCompletion(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    filterTaskByPriority(priority) {
      return this.tasks.filter((task) => task.priority === priority);
    },
    filterByCompleted() {
      return this.tasks.filter((task) => task.completed);
    },
    // Nova função para filtrar por tarefas não completas
    filterByIncomplete() {
      return this.tasks.filter((task) => !task.completed);
    },
    // Função genérica para filtrar por status de conclusão
    filterByCompletionStatus(isCompleted) {
      return this.tasks.filter((task) => task.completed === isCompleted);
    }
  },
});
