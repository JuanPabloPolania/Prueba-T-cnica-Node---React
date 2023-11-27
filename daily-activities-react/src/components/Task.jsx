import styles from "./Task.module.css";

const Task = ({ task, onDelete, onUpdate }) => {
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
      <td className={styles.taskData}>{task.name}</td>
      <td className={styles.taskData}>{task.description}</td>
      <td className={styles.taskData}>{task.duration}</td>
      <td className={styles.taskData}>{task.id_priority}</td>
      <td className={styles.taskData}>{task.id_status}</td>

      <td
        className={styles.taskData}
        style={{ display: "flex", gap: 10, alignItems: "center" }}
      >
        <button
          className={styles.taskButton}
          onClick={() => {
            onUpdate(task);
          }}
        >
          🖊
        </button>
        <button
          className={styles.taskButton}
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
