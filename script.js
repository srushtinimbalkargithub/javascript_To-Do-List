const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
        saveData();
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = Array.from(listContainer.children).map(li => ({
        text: li.childNodes[0].textContent,
        checked: li.classList.contains("checked")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}

showTask();
