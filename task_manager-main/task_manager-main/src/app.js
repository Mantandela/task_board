// src/app.js
import { Task } from './Task.js';
import { loadTasks, saveTasks } from './store.js';
import { renderTasks, updateCounts, applyFilterStyles } from './view.js';
import { uid } from './utils.js';

let tasks = loadTasks();
let filter = 'all';

const els = {
  form: document.getElementById('taskForm'),
  input: document.getElementById('taskInput'),
  list: document.getElementById('taskList'),
  due: document.getElementById("taskDue"),
  counts: document.getElementById('counts'),
  filterGroup: document.getElementById('filterGroup'),
  clearCompleted: document.getElementById('clearCompleted')
};

function render() {
  renderTasks(els.list, tasks, filter);
  updateCounts(els.counts, tasks);
  applyFilterStyles(els.filterGroup, filter);
  els.clearCompleted.disabled = !tasks.some(t => t.done);
}

function addTask(title, due = null) {
  const t = new Task(uid(), title, false, due);
  tasks.push(t);
  saveTasks(tasks);
  render();
}


function toggleTaskById(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.toggle();
    saveTasks(tasks);
    render();
  }
}

function deleteTaskById(id) {
  tasks = tasks.filter(x => x.id !== id);
  saveTasks(tasks);
  render();
}

function clearCompleted() {
  tasks = tasks.filter(x => !x.done);
  saveTasks(tasks);
  render();
}

function editTaskById(id, newTitle) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.title = newTitle.trim();
    saveTasks(tasks);
    render();
  }
}


// Initial render on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  render();
  els.input.focus();
});

// Add task

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = els.input.value.trim();
  const due = els.due.value ? new Date(els.due.value).toISOString() : null;
  if (!title) return;
  addTask(title, due);
  els.form.reset();
  els.input.focus();
});


// Delegated events on list
els.list.addEventListener('change', (e) => {
  const li = e.target.closest('li.task');
  if (!li) return;
  if (e.target.matches('input[type="checkbox"]')) {
    toggleTaskById(li.dataset.id);
  }
});

els.list.addEventListener('click', (e) => {
  const li = e.target.closest('li.task');
  if (!li) return;
  if (e.target.matches('button.delete')) {
    deleteTaskById(li.dataset.id);
  }
});

// Filters
els.filterGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-filter]');
  if (!btn) return;
  filter = btn.dataset.filter;
  render();
});

// edit task
els.list.addEventListener('dblclick', (e) => {
  const span = e.target.closest('span.title');
  if (!span) return;

  const li = span.closest('li.task');
  if (!li) return;
  
  const id = li.dataset.id;
  const currentTitle = span.textContent;

  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentTitle;
  input.className = 'edit-input';

  // Replace span with input
  span.replaceWith(input);
  input.focus();

  // Save on blur or Enter
  function commit() {
    const newTitle = input.value.trim();
    if (newTitle) {
      editTaskById(id, newTitle);
    } else {
      render();
    }
  }

  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      commit();
    }
    if (evt.key === 'Escape') {
      render(); 
    }
  });
});

// Clear completed
els.clearCompleted.addEventListener('click', clearCompleted);
