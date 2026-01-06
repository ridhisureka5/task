import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import {
  PlusIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Task modal
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [creating, setCreating] = useState(false);

  // Edit Task modal
  const [editingTask, setEditingTask] = useState(null);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch {
        alert("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Create task
  const addTask = async () => {
    if (!newTaskTitle.trim()) {
      alert("Task title is required");
      return;
    }

    setCreating(true);
    try {
      const res = await api.post("/tasks", {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
      });

      setTasks((prev) => [...prev, res.data]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setShowModal(false);
    } catch {
      alert("Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  // Toggle status
  const toggleStatus = async (id) => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  // Update task
  const updateTask = async () => {
    if (!editingTask.title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      const res = await api.put(`/tasks/${editingTask._id}`, {
        title: editingTask.title.trim(),
        description: editingTask.description?.trim(),
        status: editingTask.status,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === editingTask._id ? res.data : t))
      );
      setEditingTask(null);
    } catch {
      alert("Failed to update task");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading tasks…
      </div>
    );
  }

  return (
   <div className="min-h-screen w-screen bg-black text-white relative overflow-hidden">

 
      {/* Smoky background */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[35rem] h-[35rem] bg-white/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[35rem] h-[35rem] bg-white/10 rounded-full blur-[160px]" />

      {/* Navbar */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/5 border-b border-white/10 px-10 py-5 flex justify-between">
        <h1 className="text-2xl font-extrabold">
          Task<span className="text-white/60">Flow</span>
        </h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </header>

      {/* Main */}
      <main className="px-10 py-14 relative z-10">
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-5xl font-black">My Tasks</h2>
          <button
            onClick={() => {
              setNewTaskTitle("");
              setNewTaskDescription("");
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-7 py-3 rounded-2xl font-bold shadow-xl transition"
          >
            <PlusIcon className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {tasks.length === 0 && (
          <p className="text-slate-400 text-lg">
            No tasks yet. Create your first task 🚀
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition"
            >
              {/* Delete */}
              <button
                onClick={() => deleteTask(task._id)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition"
              >
                <TrashIcon className="w-5 h-5 text-red-400" />
              </button>

              <h3 className="text-lg font-semibold mb-2">
                {task.title}
              </h3>

              {task.description && (
                <p className="text-sm text-slate-400 mb-4">
                  {task.description}
                </p>
              )}

              <span
                className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-4 ${
                  task.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-400/20 text-yellow-300"
                }`}
              >
                {task.status}
              </span>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => toggleStatus(task._id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    task.status === "Pending"
                      ? "bg-green-500 text-black hover:bg-green-400"
                      : "bg-yellow-400 text-black hover:bg-yellow-300"
                  }`}
                >
                  {task.status === "Pending"
                    ? "Complete"
                    : "Pending"}
                </button>

                <button
                  onClick={() => setEditingTask(task)}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-500 text-black hover:bg-blue-400 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ADD TASK MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center">
          <div className="bg-white/90 text-black rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">New Task</h3>
              <button onClick={() => setShowModal(false)}>
                <XMarkIcon className="w-6 h-6 text-black/60" />
              </button>
            </div>

            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 mb-4 outline-none"
            />

            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Task description (optional)"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 mb-6 outline-none"
            />

            <button
              onClick={addTask}
              disabled={creating}
              className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-slate-900 disabled:opacity-60"
            >
              {creating ? "Adding…" : "Create Task"}
            </button>
          </div>
        </div>
      )}

      {/* EDIT TASK MODAL */}
      {editingTask && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center">
          <div className="bg-white/90 text-black rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">Edit Task</h3>
              <button onClick={() => setEditingTask(null)}>
                <XMarkIcon className="w-6 h-6 text-black/60" />
              </button>
            </div>

            <input
              value={editingTask.title}
              onChange={(e) =>
                setEditingTask({ ...editingTask, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 mb-4 outline-none"
            />

            <textarea
              value={editingTask.description || ""}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 mb-6 outline-none"
            />

            <button
              onClick={updateTask}
              className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-slate-900"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
