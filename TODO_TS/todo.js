var storedTasks = localStorage.getItem('tasks');
var tasks = storedTasks ? JSON.parse(storedTasks) : [];
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addTask() {
    var newTaskInput = document.querySelector(".input-container__input");
    var taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        var taskList = document.querySelector(".list-container__list");
        var taskObject = {
            text: taskText,
            completed: false
        };
        tasks.push(taskObject);
        saveTasksToLocalStorage();
        renderTask(taskObject, taskList);
        newTaskInput.value = "";
    }
}
function renderTask(task, taskList) {
    var taskItem = document.createElement("li");
    taskItem.classList.add("list-container__item");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("list-container__checkbox");
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
        toggleTask(task);
    });
    var taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.classList.add("list-container__task");
    if (task.completed) {
        taskSpan.classList.add("completed");
    }
    var deleteButton = document.createElement("button");
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
function toggleTask(task) {
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    renderTaskList();
}
function deleteTask(task) {
    var taskIndex = tasks.indexOf(task);
    tasks.splice(taskIndex, 1);
    saveTasksToLocalStorage();
    renderTaskList();
}
function renderTaskList() {
    var taskList = document.querySelector(".list-container__list");
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        renderTask(task, taskList);
    });
}
renderTaskList();
