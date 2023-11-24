const Task = ({ task, onDelete }) => {
  const env = import.meta.env;
  const handleRemoveTask = async (taskId) => {
    const response = await fetch(
      `${env.VITE_API_REST_URL}${env.VITE_TASKS_ENDPOINT}/${taskId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      onDelete();
    }
  };
  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>{task.duration}</td>
      <td>{task.id_priority}</td>
      <td>{task.id_status}</td>

      <td>
        <button
          onClick={() => {
            handleRemoveTask(task.id);
          }}
        >
          🗑
        </button>
      </td>
    </tr>
  );
};
export default Task;
