function TaskModal({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Task title" />
      <textarea {...register("description")} placeholder="Description" />
      <button>Add Task</button>
    </form>
  );
}
