import { useState } from "react";
import TodoItem from "./components/TodoItem.jsx";
import FilterBar from "./components/FilterBar.jsx";

export default function App() {
  // STATE lives in the parent because several children depend on it.
  const [todos, setTodos] = useState([
    { id: 1, text: "Read the React docs on state", done: true },
    { id: 2, text: "Pass props to a child component", done: false },
    { id: 3, text: "Handle a click event", done: false },
  ]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  // Never mutate state: build a new array and give it to the setter.
  function addTodo(e) {
    e.preventDefault(); // stop the browser's default form submit
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false }]);
    setText("");
  }
  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const editTodo = (id, newText) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  // DERIVED DATA: computed each render from state, not stored separately.
  const visible = todos.filter(
    (t) => filter === "all" || (filter === "done" ? t.done : !t.done)
  );
  const remaining = todos.filter((t) => !t.done).length;
  const hasDone = todos.some((t) => t.done);

  return (
    <main className="wrap">
      <h1>Tasks</h1>
      <p className="sub">Add, edit, delete and filter. Every change flows through state.</p>
      <div className="card">
        <form className="add" onSubmit={addTodo}>
          <input
            type="text"
            value={text}
            placeholder="What needs doing?"
            aria-label="New task"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="primary" type="submit">Add task</button>
        </form>

        <FilterBar filter={filter} onChange={setFilter} />

        {visible.length === 0 ? (
          <div className="empty">
            {todos.length === 0 ? "No tasks yet. Add your first one above." : "Nothing in this view."}
          </div>
        ) : (
          <ul>
            {visible.map((t) => (
              <TodoItem key={t.id} todo={t} onToggle={toggleTodo} onDelete={deleteTodo} onSave={editTodo} />
            ))}
          </ul>
        )}

        <div className="foot">
          <span>{remaining} {remaining === 1 ? "task" : "tasks"} left</span>
          {hasDone && <button onClick={() => setTodos(todos.filter((t) => !t.done))}>Clear completed</button>}
        </div>
      </div>
    </main>
  );
}
