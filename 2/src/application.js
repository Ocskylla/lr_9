import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN

const displayTaskList = (tasksData) => {
    const listContainer = document.getElementById('tasks');
    listContainer.innerHTML = '';
    tasksData.forEach((task) => {
        const listElement = document.createElement('li');
        listElement.className = 'list-group-item';
        listElement.textContent = task.name;
        listContainer.appendChild(listElement);
    });
};


const appendNewTask = (taskName) => {
    const listContainer = document.getElementById('tasks');
    const newListItem = document.createElement('li');
    newListItem.className = 'list-group-item';
    newListItem.textContent = taskName;
    listContainer.insertBefore(newListItem, listContainer.firstChild);
};


const fetchTasksFromServer = async () => {
    const response = await axios.get(routes.tasksPath());
    return response.data.items;
};


const sendTaskToServer = async (taskName) => {
    const response = await axios.post(routes.tasksPath(), { name: taskName });
    return response.status;
};


const handleFormSubmission = (formElement) => {
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskInput = formElement.querySelector('input[name="name"]');
        const taskName = taskInput.value.trim();

        if (!taskName) return;

        const status = await sendTaskToServer(taskName);
        if (status === 201) {
            appendNewTask(taskName);
            taskInput.value = '';
            taskInput.focus();
        }
    });
};


const initializeApp = async () => {
    const initialTasks = await fetchTasksFromServer();
    displayTaskList(initialTasks);

    const formElement = document.querySelector('form');
    handleFormSubmission(formElement);
};

export default initializeApp;
// END