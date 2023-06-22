class Todo {
    constructor(id, task, completed = false) {
      this.id = id;
      this.task = task;
      this.completed = completed;
    }
  
    toggleCompleted() {
      this.completed = !this.completed;
    }
  }
  
  class TodoList {
    constructor() {
      this.todos = [];
    }
  
    addTodo(todo) {
      this.todos.push(todo);
    }
  
    deleteTodoById(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
  
    toggleTodoCompletedById(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.toggleCompleted();
      }
    }
  
    renderTodos() {
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';
  
      this.todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.dataset.id = todo.id;
        todoItem.textContent = todo.task;
  
        if (todo.completed) {
          todoItem.classList.add('completed');
        }
  
        todoItem.addEventListener('click', () => {
          this.toggleTodoCompletedById(todo.id);
          this.renderTodos();
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          this.deleteTodoById(todo.id);
          this.renderTodos();
        });
  
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
      });
    }
  }
  
  const form = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  
  const todoListObj = new TodoList();
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
  
    if (task !== '') {
      const id = Date.now();
      const todo = new Todo(id, task);
      todoListObj.addTodo(todo);
      todoListObj.renderTodos();
      todoInput.value = '';
    }
  });
  
  todoListObj.renderTodos();
  