import priorityRepository from "../repositories/priorityRepository.js";

async function getPriorities() {
  return await priorityRepository.getPriorities();
}

export default { getPriorities };
