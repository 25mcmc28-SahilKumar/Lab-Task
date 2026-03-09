let tasks = [];    //store all tasks
let currentFilter = "all";  //decide what to show
function addTask() {
    const text = document.getElementById("taskInput").value;    //adding a new task 
    const date = document.getElementById("dueDate").value;

    if (text === "") return;    //If user didn’t type anything -> stop immediately

    tasks.push({
        text: text,
        completed: false,
        dueDate: date
    });

    document.getElementById("taskInput").value = "";  //Clear the input box so user can type next task.
    renderTasks(); //updating screen based on latest data
}

//This function : clears the list, filter taks, sorts them, display them
function renderTasks() {
    const list = document.getElementById("taskList");  
    list.innerHTML = "";

    let filteredTasks = tasks; //by default all tasks

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.completed); //if tasks are completed {text: "do lab work", completed: true}
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(t => !t.completed); //give only pending tasks.
    }

    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); //sorting by due date, earlier date come first

    filteredTasks.forEach((task, index) => {  //loop through each task one by one
        const li = document.createElement("li");   //creates <li></li>

        //if task is not completed
        /* 
        <input type="checkbox">
        do lab work (2026-01-21)
        <button>X</button>
        */

        //if task is completed
        /*
        <input type="checkbox" checked>
        do lab work (2026-01-21)
        <button>X</button>

        */

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}   
                onclick="toggleTask(${index})">
            ${task.text} (${task.dueDate || "No date"})
            <button onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });
}

//mark complete/pending
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;  //before click false, after click true 
    renderTasks(); // screen refreshes to reflect change.
}

//renice task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

//change view
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}
