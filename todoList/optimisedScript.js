const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const todoAddBtn = document.getElementById('todo-add-button');

const TODOLIST_DATA_KEY = 'todoDataList';
let todos = []; // in-memory state

// loading/ setting --> server
const loadData = () => {
    const raw = localStorage.getItem(TODOLIST_DATA_KEY);
    return raw ? JSON.parse(raw) : [];
};
const saveData = () =>
    localStorage.setItem(TODOLIST_DATA_KEY, JSON.stringify(todos));

// for getting unique Id
const createUUID = () =>
    crypto && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

const createTodoEl = (todo) => {
    const { id, title, isCompleted } = todo;

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    if (isCompleted) li.classList.add('completed');

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.setAttribute('name', id);
    cb.className = 'todo-checkbox';
    cb.checked = isCompleted;

    cb.addEventListener('change', () => {
        // update state only for this item
        const idx = todos.findIndex((t) => t.id === id);
        if (idx === -1) return;
        todos[idx].isCompleted = cb.checked;
        // minimal DOM update
        li.classList.toggle('completed', cb.checked);
        saveData();
    });

    const span = document.createElement('span');
    span.className = 'todo-title';
    span.textContent = title;

    const del = document.createElement('button');
    del.className = 'todo-delete';
    del.textContent = 'Delete';

    del.addEventListener('click', () => {
        // remove from state
        const idx = todos.findIndex((t) => t.id === id);
        if (idx === -1) return;
        todos.splice(idx, 1);
        saveData();
        // minimal DOM update
        li.remove();
    });

    li.append(cb, span, del);
    return li;
};

const renderAll = () => {
    todoList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    todos.forEach((todo) => fragment.appendChild(createTodoEl(todo)));
    todoList.appendChild(fragment);
};

// init
const initialize = () => {
    todos = loadData();
    if (todos.length === 0) {
        todos = [
            { id: createUUID(), title: 'Buy Grocery', isCompleted: true },
            { id: createUUID(), title: 'Buy Medicines', isCompleted: false },
        ];
        saveData();
    }
    renderAll();
};

initialize();

// form submit, one data at time
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;
    const todoItem = {
        id: createUUID(),
        title,
        isCompleted: false,
    };
    todos.push(todoItem);
    saveData();

    todoList.appendChild(createTodoEl(todoItem));
    todoForm.reset();
});

// (optional) enable/disable Add button
const disableButton = (disabled) => {
    const btn = document.getElementById('todo-add-button');
    if (!btn) return;
    btn.disabled = disabled;
    btn.style.cursor = disabled ? 'not-allowed' : 'pointer';
    btn.style.opacity = disabled ? '0.5' : '1';
};
todoInput.addEventListener('input', (e) =>
    disableButton(e.target.value.trim() === '')
);
disableButton(true);
