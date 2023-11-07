function addTask() {
    const newTaskInput = document.querySelector(".input-container__input");
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        const taskList = document.querySelector(".list-container__list");
        const taskItem = document.createElement("li");
        taskItem.classList.add("list-container__item");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("list-container__checkbox");
        checkbox.addEventListener("change", function() {
            toggleTask(checkbox);
        });
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.classList.add("list-container__task");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.classList.add("list-container__delete-button");
        deleteButton.addEventListener("click", function() {
            deleteTask(deleteButton);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        newTaskInput.value = "";
    }
}


function toggleTask(checkbox) {
    const taskSpan = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskSpan.classList.add("completed");
    } else {
        taskSpan.classList.remove("completed");
    }
}


function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
