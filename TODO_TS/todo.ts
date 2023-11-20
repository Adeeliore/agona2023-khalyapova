interface Task {
    text: string;
    completed: boolean;
}

const storedTasks = localStorage.getItem('tasks');
const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const newTaskInput = document.querySelector<HTMLInputElement>(".input-container__input");
    const taskText = newTaskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.querySelector<HTMLUListElement>(".list-container__list");
        const taskObject: Task = {
            text: taskText,
            completed: false
        };

        tasks.push(taskObject);
        saveTasksToLocalStorage();
        renderTask(taskObject, taskList);
        newTaskInput.value = "";
    }
}

function renderTask(task: Task, taskList: HTMLUListElement) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("list-container__item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("list-container__checkbox");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
        toggleTask(task);
    });

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.classList.add("list-container__task");
    if (task.completed) {
        taskSpan.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("list-container__delete-button");
    deleteButton.addEventListener("click", function () {
        deleteTask(task);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function toggleTask(task: Task) {
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    renderTaskList();
}

function deleteTask(task: Task) {
    const taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    saveTasksToLocalStorage();
    renderTaskList();
}

function renderTaskList() {
    const taskList = document.querySelector<HTMLUListElement>(".list-container__list");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        renderTask(task, taskList);
    });
}

renderTaskList();
