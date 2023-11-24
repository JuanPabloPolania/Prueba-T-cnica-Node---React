import { connection } from "../lib/connect.js";

const createPriorityTable = `CREATE TABLE IF NOT EXISTS priority (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
)`;

const createStatusTable = `CREATE TABLE IF NOT EXISTS status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
)`;

const createTasksTable = `CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  beginDate TIMESTAMP NULL,
  endDate TIMESTAMP NULL,
  duration INT NOT NULL,
  id_priority INT NOT NULL,
  CONSTRAINT id_priority FOREIGN KEY(id_priority) REFERENCES priority(id),
  id_status INT NOT NULL,
  CONSTRAINT id_status FOREIGN KEY(id_status) REFERENCES status(id)
)`;

const insertPriority = `INSERT INTO priority (name, description)
VALUES
('Urgente', 'Tareas con máxima prioridad'),
('Normal', 'Tareas con prioridad media'),
('Bajo', 'Tareas con prioridad baja')`;

const insertStatus = `INSERT INTO status (name, description)
VALUES
('Iniciada', 'Tarea anteriormente iniciada'),
('En Proceso', 'Tarea en proceso de ejecución'),
('Terminada', 'Tarea finalizadas')`;

const printError = (msg) => (error) => {
  error && console.log(msg, error);
};

connection.connect((error) => {
  error && console.log("Error connecting to database", error);
  connection.query(
    createPriorityTable,
    printError("Error creating priority table")
  );
  connection.query(insertPriority, printError("Error inserting priorities"));
  connection.query(
    createStatusTable,
    printError("Error creating status table")
  );
  connection.query(insertStatus, printError("Error inserting status"));
  connection.query(createTasksTable, printError("Error creating tasks table"));
  console.log("Creation tables and inserting rows done");

  connection.end();
});
