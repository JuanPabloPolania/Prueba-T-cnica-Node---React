import { connection } from "../lib/connect.js";

function getStatus() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM status";
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export default { getStatus };
