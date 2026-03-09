var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["pending"] = 0] = "pending";
    TaskStatus[TaskStatus["completed"] = 1] = "completed";
})(TaskStatus || (TaskStatus = {}));
var Task = /** @class */ (function () {
    function Task(text, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.pending;
    }
    Task.prototype.toggleStatus = function () {
        this.status = this.status === TaskStatus.pending ? TaskStatus.completed : TaskStatus.completed;
    };
    return Task;
}());
var tasks = [];
var currentFilter = "all";
function addTask() {
    var input = document.getElementById("taskInput");
    var dateInput = document.getElementById("dueDate");
    if (input.value === "")
        return;
    var newTask = new Task(input.value, dateInput.value);
    tasks.push(newTask);
    input.value = "";
    renderTasks();
}
function renderTasks() {
    var list = document.getElementById("taskList");
    list.innerHTML = "";
    var filteredTasks = tasks;
    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function (t) { return t.status === TaskStatus.completed; });
    }
    else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(function (t) { return t.status === TaskStatus.pending; });
    }
    filteredTasks.sort(function (a, b) { return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); });
    filteredTasks.forEach(function (task, index) {
        var li = document.createElement("li");
        li.innerHTML = "\n            <input type=\"checkbox\"\n                ".concat(task.status === TaskStatus.completed ? "checked" : "", "\n                onclick=\"toggleTask(").concat(index, ")\">\n            ").concat(task.text, " (").concat(task.dueDate || "No date", ")\n            <button onclick=\"deleteTask(").concat(index, ")\">X</button>\n        ");
        list.appendChild(li);
    });
}
function toggleTask(index) {
    tasks[index].toggleStatus();
    renderTasks();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}
