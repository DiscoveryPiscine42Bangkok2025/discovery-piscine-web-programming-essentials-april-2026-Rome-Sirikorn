const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

// Load todos from cookie on page load
window.onload = () => {
    const todos = getTodosFromCookie();
    todos.forEach(todo => addTodoToDOM(todo));
};

// Create new todo
newBtn.addEventListener("click", () => {
    const text = prompt("Enter a new TO DO:");

    if (text && text.trim() !== "") {
        addTodo(text.trim());
    }
});

// Add todo (top of list)
function addTodo(text) {
    addTodoToDOM(text, true);

    const todos = getTodosFromCookie();
    todos.unshift(text); // add to beginning
    saveTodosToCookie(todos);
}

// Create DOM element
function addTodoToDOM(text, insertTop = false) {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;

    // Click to remove
    div.addEventListener("click", () => {
        if (confirm("Do you want to remove this TO DO?")) {
            ftList.removeChild(div);
            removeTodoFromCookie(text);
        }
    });

    if (insertTop && ftList.firstChild) {
        ftList.insertBefore(div, ftList.firstChild);
    } else {
        ftList.appendChild(div);
    }
}

// COOKIE FUNCTIONS

function saveTodosToCookie(todos) {
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function getTodosFromCookie() {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        const [name, value] = c.split("=");
        if (name === "todos") {
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return [];
}

function removeTodoFromCookie(text) {
    let todos = getTodosFromCookie();
    todos = todos.filter(todo => todo !== text);
    saveTodosToCookie(todos);
}

