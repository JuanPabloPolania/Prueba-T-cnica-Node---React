import { connection } from "../lib/connect.js";

function getPriorities() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM priority";
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export default { getPriorities };
