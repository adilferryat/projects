const tasksDiv = document.querySelector(".tasks");
const input = document.querySelector(".input");
const submit = document.querySelector(".add");
let arrayOf = [];

// Event delegation
tasksDiv.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("del")) {
        // Delete button clicked
        target.parentElement.remove();
        deleteTask(target.parentElement.getAttribute("data-id"));
    }

    if (target.classList.contains("task")) {
        // Task text clicked
        toggleStatue(target.getAttribute('data-id'));
        target.classList.toggle("done");
    }
});

// Load data from local storage
if (localStorage.getItem("tasks")) {
    arrayOf = JSON.parse(localStorage.getItem("tasks"));
    renderTasks(arrayOf);
}

// Add task on submit
submit.onclick = function() {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
};

function addTaskToArray(taskText) {
    const taskData = {
        id: Date.now(),
        titleText: taskText,
        complete: false,
    };

    arrayOf.push(taskData);
    renderTasks(arrayOf);
    STORAGE(arrayOf);
}

function renderTasks(arrayOf) {
    tasksDiv.innerHTML = "";
    arrayOf.forEach((taskData) => {
        const div = document.createElement("div");
        div.className = taskData.complete ? "TDone" : "T1";
        div.setAttribute("data-id", taskData.id);
        div.textContent = taskData.titleText;

        const span = document.createElement("span");
        span.className = "del";
        span.textContent = "delete";

        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
}

function STORAGE(arrayOf) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOf));
}

function deleteTask(id) {
    arrayOf = arrayOf.filter((task) => task.id != id);
    renderTasks(arrayOf);
    STORAGE(arrayOf);
}

function toggleStatue(id) {
    arrayOf.forEach((task) => {
        if (task.id == id) {
            task.complete = !task.complete;
        }
    });
    STORAGE(arrayOf);
}


function deleteTask(tD) {
    arrayOf = arrayOf.filter((t) => t.id != tD);
    STORAGE(arrayOf);

}

function toggleStatue(tD) {
    for (let i = 0; i < arrayOf.length; i++) {
        if (arrayOf[i].id == tD) {
            arrayOf[i].complete == false ? (arrayOf.complete = true) : (arrayOf.complete = flase);

        }
    }
    STORAGE(arrayOf)
}