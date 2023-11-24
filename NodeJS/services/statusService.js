import statusRepository from "../repositories/statusRepository.js";

async function getStatus() {
  return await statusRepository.getStatus();
}

export default { getStatus };
