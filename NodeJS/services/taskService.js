import taskRepository from "../repositories/taskRepository.js";
import { getCurrentDate } from "../utils/getCurrentDate.js";

async function getTasks() {
  const tasks = await taskRepository.getTasks();
  // Ordena las tareas por prioridad y duración
  const tasksSortedByPriority = tasks.sort((task1, task2) => {
    if (task1.id_priority !== task2.id_priority) {
      return task1.id_priority - task2.id_priority;
    }
    return task1.duration - task2.duration;
  });
  return tasksSortedByPriority;
}

async function createTask(task) {
  task.id_status = 1;
  return await taskRepository.createTask(task);
}

async function getTaskById(id) {
  return await taskRepository.getTaskById(id);
}

async function deleteTask(id) {
  return await taskRepository.deleteTask(id);
}

async function updateTask(newTask) {
  const oldTask = await getTaskById(newTask.id);
  newTask.beginDate = oldTask.beginDate;
  newTask.endDate = oldTask.endDate;
  if (newTask.id_status === 1) {
    newTask.beginDate = null;
    newTask.endDate = null;
  }

  if (newTask.id_status === 2) {
    newTask.endDate = null;
    if (oldTask.id_status === 1) {
      newTask.beginDate = getCurrentDate();
    }
  }
  if (newTask.id_status === 3 && oldTask.id_status === 2) {
    newTask.beginDate = oldTask.beginDate;
    newTask.endDate = getCurrentDate();
  }
  console.log(newTask);
  return await taskRepository.updateTask(newTask);
}

export default { getTasks, getTaskById, createTask, updateTask, deleteTask };
