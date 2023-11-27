CREATE USER 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

CREATE DATABASE TORREFACTORA;
USE TORREFACTORA;

CREATE TABLE IF NOT EXISTS priority (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
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
);

INSERT INTO priority (name, description)
VALUES
('Urgente', 'Tareas con máxima prioridad'),
('Normal', 'Tareas con prioridad media'),
('Bajo', 'Tareas con prioridad baja');

INSERT INTO status (name, description)
VALUES
('Iniciada', 'Tarea anteriormente iniciada'),
('En Proceso', 'Tarea en proceso de ejecución'),
('Terminada', 'Tarea finalizadas');