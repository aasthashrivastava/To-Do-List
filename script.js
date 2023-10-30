
function createTodoList() {
    // debugger
    const todoListsContainer = document.getElementById('todoListsContainer');
    const newTodoList = document.createElement('div');
    function generateRandomID() {
        return Math.floor(Math.random() * 100);
    }
    var id = generateRandomID();

    newTodoList.innerHTML = `
                <div class="todo-container" data-id="${id}">
                <h1>To Do List ${id}</h1>
                <button class='allButton'>All</button>
                <button class='pendingButton'>Pending</button>
                <button class='completeButton'>Completed</button>
                <input type="text" id="taskInput" placeholder="Add your task...">
                <button class="add-task" id="addTask">Add Task</button>
                <ul id="todoList">
                </ul>
                <p>Completed Tasks: <span id="completedCount">0</span></p>
                <p>Pending Tasks: <span id="pendingCount">0</span></p>
                <p>All Tasks: <span id="allCount">0</span></p>
                </div>
            `
    todoListsContainer.appendChild(newTodoList);

    const allBtn = newTodoList.querySelector('.allButton');
    const pendingBtn = newTodoList.querySelector('.pendingButton');
    const completeBtn = newTodoList.querySelector('.completeButton');
    const taskInput = newTodoList.querySelector('#taskInput');
    const addtaskButton = newTodoList.querySelector('.add-task');
    const list = newTodoList.querySelector("#todoList");
    const completedCount = newTodoList.querySelector("#completedCount");
    const pendingCount = newTodoList.querySelector("#pendingCount");
    const allCount = document.querySelector('#allCount');
    let currentView = 'all';
    // debugger

    let listItems = JSON.parse(localStorage.getItem(`listitems_${id}`)) || [];


    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            newElement(id);
        }
    });


    function updateTodoList() {
        list.innerHTML = "";
        let completed = 0;
        let pending = 0;

        listItems.forEach((task, i) => {
            if (currentView === "all" ||
                (currentView === "pending" && !task.completed) ||
                (currentView === "completed" && task.completed)) {
                let li = document.createElement("li");
                li.className = 'checked'
                const isCompleted = task.completedCount ? 'completed' : "";
                li.innerHTML = `
                    <div class="todo-item ${isCompleted}">
                    <button data-index="${i}" class="completeStatus">${task.completed ? "&#10003" : ""}</button>
                    <span class="${task.completed ? 'completed-task' : ''}">${task.text}</span>
                    <button data-index="${i}" class="removeTask">\u00D7</button>
                    </div>
                    `
                li.querySelector('.completeStatus').addEventListener('click', completeItem);
                li.querySelector('.removeTask').addEventListener('click', deleteItem);

                list.appendChild(li);
                if (task.completed) {
                    completed++;
                }
                else {
                    pending++;
                }
            }
        });


        if (currentView === "all") {
            completedCount.textContent = completed;
            pendingCount.textContent = pending;
        } else if (currentView === "pending") {
            completedCount.textContent = completedCount.textContent;
            pendingCount.textContent = pending;
        } else if (currentView === "completed") {
            completedCount.textContent = completed;
            pendingCount.textContent = pendingCount.textContent;
        }

        allCount.textContent = listItems.length
    }

    function newElement(id) {
        // debugger
        let listLi = document.createElement('li');
        let inputValue = taskInput.value;
        if (inputValue === '') {
            alert('write something first!');
        } else {
            listLi.appendChild(document.createTextNode(inputValue));
            list.appendChild(listLi);
            taskInput.value = "";
            listItems.push({ text: inputValue, completed: false });
            localStorage.setItem(`listitems_${id}`, JSON.stringify(listItems));
        }
        updateTodoList();
    }


    function deleteItem(event) {
        let close = document.getElementsByClassName('removeTask');
        if (close) {
            const index = event.target.getAttribute('data-index');
            listItems.splice(index, 1);
            localStorage.setItem(`listitems_${id}`, JSON.stringify(listItems));
            updateTodoList();
        }
    }

    function completeItem(event) {
        let status = document.getElementsByClassName('completeStatus');
        if (status) {
            const index = event.target.getAttribute('data-index');
            listItems[index].completed = !listItems[index].completed;
            localStorage.setItem(`listitems_${id}`, JSON.stringify(listItems));
            updateTodoList()
        }
    }

    function showAll() {
        currentView = "all";
        updateTodoList();
    }

    function showPending() {
        currentView = "pending";
        updateTodoList();
    }

    function showCompleted() {
        currentView = "completed";
        updateTodoList();
    }

    allBtn.addEventListener('click', showAll);
    pendingBtn.addEventListener('click', showPending);
    completeBtn.addEventListener('click', showCompleted);
    addtaskButton.addEventListener("click", () => newElement(id));

}
// createTodoList()

function clearTableData() {
    localStorage.clear();
    document.getElementById('todoListsContainer').innerHTML = '';
    window.location.reload();
}


// var aa = new controller();
// aa
// var bb = new controller();
// bb










