import { useState } from "react";

// PROPS: data (todo) and functions (onToggle, onDelete, onSave) come from the parent.
// STATE: editing/draft are local because only this item cares about them.
export default function TodoItem({ todo, onToggle, onDelete, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  // EVENT HANDLERS
  function save() {
    if (draft.trim()) onSave(todo.id, draft.trim());
    else setDraft(todo.text);
    setEditing(false);
  }
  function cancel() {
    setDraft(todo.text);
    setEditing(false);
  }

  if (editing) {
    return (
      <li>
        <input
          type="text"
          value={draft}
          autoFocus
          aria-label="Edit task"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
        />
        <div className="actions">
          <button className="primary" onClick={save}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </li>
    );
  }

  return (
    <li className={todo.done ? "done" : ""}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label="Mark done"
      />
      <span className="title">{todo.text}</span>
      <div className="actions">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button className="danger" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
}
