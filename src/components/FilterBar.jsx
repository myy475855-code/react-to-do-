// PROPS: this component owns no state. It shows the current filter it is given
// and tells the parent (via onChange) when the user picks a different one.
export default function FilterBar({ filter, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {["all", "active", "done"].map((f) => (
        <button key={f} aria-pressed={filter === f} onClick={() => onChange(f)}>
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
