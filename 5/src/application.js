import uniqueId from 'lodash/uniqueId.js';

// BEGIN
const generateId = () => Date.now() + Math.random().toString(36).slice(2);

const taskPlanner = () => {
    const state = {
        lists: [{ id: generateId(), name: 'General' }],
        tasks: [],
        currentListId: null,
    };

    state.currentListId = state.lists[0].id;

    const renderLists = () => {
        const listsContainer = document.querySelector('[data-container="lists"]');
        const ul = document.createElement('ul');
        state.lists.forEach((list) => {
            const li = document.createElement('li');
            if (list.id === state.currentListId) {
                const b = document.createElement('b');
                b.textContent = list.name;
                li.appendChild(b);
            } else {
                const a = document.createElement('a');
                a.href = `#${list.name.toLowerCase()}`;
                a.textContent = list.name;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    state.currentListId = list.id;
                    renderLists();
                    renderTasks();
                });
                li.appendChild(a);
            }
            ul.appendChild(li);
        });
        listsContainer.innerHTML = '';
        listsContainer.appendChild(ul);
    };

    const renderTasks = () => {
        const tasksContainer = document.querySelector('[data-container="tasks"]');
        tasksContainer.innerHTML = '';

        const currentTasks = state.tasks.filter((task) => task.listId === state.currentListId);
        if (currentTasks.length === 0) return;

        const ul = document.createElement('ul');
        currentTasks.forEach((task) => {
            const li = document.createElement('li');
            li.textContent = task.name;
            ul.appendChild(li);
        });
        tasksContainer.appendChild(ul);
    };


    const newListForm = document.querySelector('[data-container="new-list-form"]');
    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newListForm.querySelector('input[name="name"]');
        const listName = input.value.trim();

        if (!listName) return;


        if (state.lists.some((list) => list.name.toLowerCase() === listName.toLowerCase())) {
            input.value = '';
            return;
        }

        const newList = { id: generateId(), name: listName };
        state.lists.push(newList);
        input.value = '';
        renderLists();
    });

    const newTaskForm = document.querySelector('[data-container="new-task-form"]');
    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newTaskForm.querySelector('input[name="name"]');
        const taskName = input.value.trim();

        if (!taskName) return;

        const newTask = {
            id: generateId(),
            name: taskName,
            listId: state.currentListId,
        };
        state.tasks.push(newTask);
        input.value = '';
        renderTasks();
    });

    renderLists();
    renderTasks();
};

export default taskPlanner;
// END