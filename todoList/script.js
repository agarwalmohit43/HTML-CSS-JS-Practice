const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

// console.log(form, input, list);

const TODOLIST_DATA_KEY = 'todoDataList';

const getData = () => {
    const data = localStorage.getItem(TODOLIST_DATA_KEY);
    if (data) {
        return JSON.parse(data);
    }
    return [];
};

const setData = () => {
    const list = document.getElementById('todo-list');
    const data = getData();
    list.innerHTML = '';
    data.forEach(({ title, isCompleted }, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (isCompleted) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.addEventListener('change', (event) => {
            // I have taken out index from dataset, but index was directly available also
            // console.log(index);
            const checboxIndex = Number(event.target.dataset.index);
            updateData(checboxIndex, {
                title,
                isCompleted: event.target.checked,
            });
            setData();
        });
        checkbox.dataset.index = index;
        checkbox.checked = isCompleted;
        checkbox.setAttribute('name', 'todo-checkbox');

        const span = document.createElement('span');
        span.classList.add('todo-tile');
        span.textContent = title;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('todo-delete');
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', (event) => {
            // I have taken out index from dataset, but index was directly available also
            // console.log(index);
            const btnIndex = Number(event.target.dataset.index);
            deleteData(btnIndex);
            setData();
        });
        deleteButton.textContent = 'Delete';

        li.append(checkbox, span, deleteButton);
        list.appendChild(li);
    });
};

document.querySelectorAll('.todo-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        console.log(event);
    });
});

document.querySelectorAll('.todo-delete').forEach((button) => {
    button.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        deleteData(index);
        setData();
    });
});

const insertData = ({ title, isCompleted }) => {
    const data = getData();
    data.push({ title, isCompleted });
    localStorage.setItem(TODOLIST_DATA_KEY, JSON.stringify(data));
    setData();
};

const updateData = (index, { title, isCompleted }) => {
    const data = getData();
    data[index].title = title;
    data[index].isCompleted = isCompleted;
    localStorage.setItem(TODOLIST_DATA_KEY, JSON.stringify(data));
};

const deleteData = (index) => {
    const data = getData();
    data.splice(index, 1);
    localStorage.setItem(TODOLIST_DATA_KEY, JSON.stringify(data));
};

const initializeData = () => {
    const initial_list = [
        { title: 'Buy Grocery', isCompleted: true },
        { title: 'Buy Medicines', isCompleted: false },
    ];

    if (getData().length) {
        setData();
        return;
    }
    localStorage.setItem(TODOLIST_DATA_KEY, JSON.stringify(initial_list));
};

initializeData();

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(todoForm);
    for (let [key, value] of formData.entries()) {
        if (key === 'todo') {
            insertData({ title: value, isCompleted: false });
            todoForm.reset();
        }
    }
});

const todoInputChangeHandler = (event) => {
    if (event.target.value.trim() === '') {
        disableButton(true);
    } else {
        disableButton(false);
    }
};

todoInput.addEventListener('keyup', todoInputChangeHandler);

const disableButton = (isDisabled) => {
    const button = document.getElementById('todo-add-button');
    button.disabled = isDisabled;
    button.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
    button.style.opacity = isDisabled ? '0.5' : '1';
};
