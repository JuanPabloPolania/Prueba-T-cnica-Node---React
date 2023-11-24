import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";

function App() {
  const env = import.meta.env;

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState();
  async function getTasks() {
    try {
      const response = await fetch(
        `${env.VITE_API_REST_URL}${env.VITE_TASKS_ENDPOINT}`
      );
      const { tasks } = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.log(error);

      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      <main>
        <aside>
          <h2>Gestión y control de actividades diarias</h2>
          <TaskForm onSubmit={getTasks} />
        </aside>
        <section>
          <h2>Lista de elementos</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Duración</th>
                <th>Prioridad</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <strong>No hay elementos en la lista.</strong>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <Task onDelete={getTasks} task={task} key={task.id} />
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default App;
