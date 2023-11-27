import { connection } from "../lib/connect.js";

function getTasks() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tasks";
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function createTask(task) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO tasks SET ?";
    connection.query(query, task, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: results.insertId, ...task });
      }
    });
  });
}

function updateTask({
  taskId,
  name,
  description,
  beginDate,
  endDate,
  duration,
  id_priority,
  id_status,
}) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE tasks SET name = ?, description = ?, beginDate = ?, endDate = ?, duration = ?, id_priority = ?, id_status = ? WHERE id = ?";
    connection.query(
      query,
      [
        name,
        description,
        beginDate,
        endDate,
        duration,
        id_priority,
        id_status,
        taskId,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      }
    );
  });
}

function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM tasks WHERE id = ?";
    connection.query(query, taskId, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows);
      }
    });
  });
}

function getTaskById(taskId) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tasks WHERE id = ?";
    connection.query(query, taskId, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
}

export default { getTasks, getTaskById, createTask, updateTask, deleteTask };
