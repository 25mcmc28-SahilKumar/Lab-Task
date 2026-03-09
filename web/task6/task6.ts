enum TaskStatus{
    pending,
    completed
}


class Task {
    text: string;
    status: TaskStatus;
    dueDate: string;

    constructor(text: string, dueDate: string){
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.pending;
    }

    toggleStatus(): void{
        this.status = this.status === TaskStatus.pending ? TaskStatus.completed : TaskStatus.completed;

    }
}

let tasks: Task[] = [];
let currentFilter: "all" | "completed" | "pending" = "all";


function addTask(): void {
    const input = document.getElementById("taskInput") as HTMLInputElement;
    const dateInput = document.getElementById("dueDate") as HTMLInputElement;

    if(input.value === "") return;

    const newTask = new Task(input.value, dateInput.value);
    tasks.push(newTask);
    
    input.value = "";
    renderTasks();
}

function renderTasks(): void {
    const list = document.getElementById("taskList") as HTMLUListElement;
    list.innerHTML = "";

    let filteredTasks: Task[] = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.status === TaskStatus.completed);
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(t => t.status === TaskStatus.pending);
    }

    filteredTasks.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox"
                ${task.status === TaskStatus.completed ? "checked" : ""}
                onclick="toggleTask(${index})">
            ${task.text} (${task.dueDate || "No date"})
            <button onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index: number): void {
    tasks[index].toggleStatus();
    renderTasks();
}

function deleteTask(index: number): void {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(type: "all" | "completed" | "pending"): void {
    currentFilter = type;
    renderTasks();
}