function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="bg-white/10 rounded-xl p-5">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-slate-300">{task.description}</p>

      <div className="flex justify-between mt-4">
        <button onClick={() => onToggle(task.id)}>
          {task.status === "completed" ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}
