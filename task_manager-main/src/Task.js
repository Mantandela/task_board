// src/Task.js
export class Task {
  constructor(id, title, done = false, due=null) {
    this.id = String(id);
    this.title = String(title).trim();
    this.done = Boolean(done);
    this.due = due? new Date(due):null;
  }

  toggle() {
    this.done = !this.done;
  }
  isOverdue(){
    return this.due && !this.done && new Date() > this.due;
  }
  toJSON() {
    // Control how JSON.stringify serializes Task
    return { id: this.id, title: this.title, done: this.done , due:this.due};
  }

  static from(obj) {
    if (!obj) return null;
    return new Task(obj.id, obj.title, obj.done, obj.due);
  }
}
