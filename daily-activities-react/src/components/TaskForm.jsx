import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TaskForm = ({ onSubmit }) => {
  const env = import.meta.env;
  const { register, handleSubmit, reset } = useForm();
  const [priorities, setPriorities] = useState([]);
  const [isPrioritiesLoading, setIsPrioritiesLoading] = useState(true);
  const [status, setStatus] = useState([]);
  const [isStatusLoading, setIsStatusLoading] = useState(true);

  const [error, setError] = useState();
  useEffect(() => {
    async function getPriorities() {
      try {
        const response = await fetch(
          `${env.VITE_API_REST_URL}${env.VITE_PRIORITIES_ENDPOINT}`
        );
        const { priorities } = await response.json();
        console.log(priorities);
        setPriorities(priorities);
      } catch (error) {
        console.log(error);

        setError(error);
      } finally {
        setIsPrioritiesLoading(false);
      }
    }
    async function getStatus() {
      try {
        const response = await fetch(
          `${env.VITE_API_REST_URL}${env.VITE_STATUS_ENDPOINT}`
        );
        const { status } = await response.json();
        setStatus(status);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsStatusLoading(false);
      }
    }
    getPriorities();
    getStatus();
  }, []);

  const getPriorityOption = () => {
    const options = priorities.map((priority) => (
      <option key={priority.id} value={priority.id}>
        {priority.name}
      </option>
    ));
    return [
      <option selected disabled key={crypto.randomUUID()}>
        Selecciona la prioridad
      </option>,
      ...options,
    ];
  };

  const getStatusOption = () => {
    const options = status.map((status) => (
      <option key={status.id} value={status.id}>
        {status.name}
      </option>
    ));
    return [
      <option selected disabled key={crypto.randomUUID()}>
        Selecciona el estado
      </option>,
      ...options,
    ];
  };

  const handleFormSubmit = async (data) => {
    data.duration = Number(data.duration);
    data.id_priority = Number(data.id_priority);
    data.id_status = Number(data.id_status);
    const response = await fetch(
      `${env.VITE_API_REST_URL}${env.VITE_TASKS_ENDPOINT}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      onSubmit();
      reset();
    }
  };

  const renderPriorities = () => {
    if (isPrioritiesLoading) return <span>Cargando prioridades...</span>;
    if (error) return <span>Ha ocurrido un error</span>;
    return (
      <label htmlFor="">
        Prioridad:
        <select {...register("id_priority", { required: true })}>
          {getPriorityOption()}
        </select>
      </label>
    );
  };

  const renderStatus = () => {
    if (isStatusLoading) return <span>Cargando estados...</span>;
    if (error) return <span>Ha ocurrido un error</span>;
    return (
      <label htmlFor="">
        Estado:
        <select {...register("id_status", { required: true })}>
          {getStatusOption()}
        </select>
      </label>
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h3>Registro de actividades</h3>
      <label htmlFor="">
        Nombre:
        <input {...register("name", { required: true, maxLength: 50 })} />
      </label>
      <label htmlFor="">
        Descripción:
        <textarea
          {...register("description", { required: true, maxLength: 255 })}
        />
      </label>
      <label htmlFor="">
        Duración:
        <input {...register("duration", { required: true, maxLength: 50 })} />
      </label>
      {renderPriorities()}
      {renderStatus()}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Limpiar
        </button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
};

export default TaskForm;
