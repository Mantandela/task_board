# Task Manager
This is a clean, modular, client-side JavaScript application built to manage tasks. It demonstrates modern JavaScript development practices, including **ES Modules**, **Object-Oriented Programming (OOP)**, clear **separation of concerns**, and **persistent storage**.

## Features

  * **Create Tasks:** Add new tasks with both a title and an optional due date/time.
  * **Toggle Completion:** Mark tasks as complete or active using a checkbox.
  * **Persistent Storage:** Tasks are saved to and loaded from the browser's `localStorage` using the dedicated `src/store.js` module.
  * **In-Place Editing:** Double-click on a task's title to quickly edit it.
  * **Filtering:** View all tasks, only active tasks, or only completed tasks.
  * **Status Tracking:** A footer displays a real-time count of total, active, and completed tasks.
  * **Overdue Indicators:** Tasks with a due date that are not completed are visibly flagged as overdue.
  * **Clear Completed:** Remove all tasks currently marked as completed with a single button click.

## Project Structure

The codebase is organized into small, focused modules that handle distinct responsibilities:

| File/Directory | Description |
| :--- | :--- |
| `index.html` | The main HTML structure, including all necessary UI elements (form, list, filters). |
| `styles.css` | Minimal, clean styling for the application. |
| `src/app.js` | The main entry point and controller; handles state (`tasks`), event listeners, and overall application logic. |
| `src/Task.js` | Defines the `Task` class, which is the blueprint for individual tasks and includes methods like `toggle()` and `isOverdue()`. |
| `src/store.js` | Utility functions for persisting and retrieving tasks using the browser's `localStorage`. |
| `src/view.js` | Functions responsible solely for rendering the DOM (`renderTasks`, `updateCounts`, etc.). |
| `src/utils.js` | General utility functions, including a `uid()` generator and an `escapeHTML()` function for security. |

## Getting Started
Since this is a client-side application, you only need a modern web browser to run it.

### Local Setup

1.  Clone or download the project files.
2.  Open the `index.html` file in your preferred web browser.
3. This application live at: https://mantandela.github.io/task_board/

