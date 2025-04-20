import { v4 as uuidv4 } from 'uuid';

export default class Task {
  constructor(title, description, dueDate, id = uuidv4(), completed = false, priority = 'normal') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.id = id;
    this.completed = completed;
    this.priority = priority;
  }
}
