const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const emptyState = document.getElementById("emptyState");
const activeCount = document.getElementById("activeCount");
const totalCount = document.getElementById("totalCount");

// Fetch todos from backend
async function fetchTodos() {
  const res = await fetch("/api/todos");
  const todos = await res.json();

  todoList.innerHTML = "";

  if (todos.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.className =
      "flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition";

    div.innerHTML = `
      <button onclick="toggleTodo('${todo._id}')"
        class="w-6 h-6 rounded-full border-2 ${
          todo.completed
            ? "bg-purple-500 border-purple-500"
            : "border-gray-300"
        }">
      </button>

      <span class="flex-1 ${
        todo.completed ? "line-through text-gray-400" : "text-gray-700"
      }">
        ${todo.title}
      </span>

      <button onclick="deleteTodo('${todo._id}')" class="text-red-500">
        ❌
      </button>
    `;

    todoList.appendChild(div);
  });

  const active = todos.filter((t) => !t.completed).length;
  activeCount.textContent = `${active} tasks remaining`;
  totalCount.textContent = `${todos.length} total`;
}

// Add todo
async function addTodo() {
  const title = todoInput.value.trim();
  if (!title) return;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  todoInput.value = "";
  fetchTodos();
}

// Toggle completed
async function toggleTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "PATCH" });
  fetchTodos();
}

// Delete todo
async function deleteTodo(id) {
  try {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Failed to delete todo");
      return;
    }

    fetchTodos();
  } catch (error) {
    alert("Server unreachable");
  }
}

// Enter key support
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// Initial load
fetchTodos();
