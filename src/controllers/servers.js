import { servers } from "../constants/servers.js";

let mutableServers = [...servers];

export function getAll(req, res) {
  res.status(200).json(mutableServers);
}

export function create(req, res) {
  const newServer = {
    id: Date.now().toString(),
    ...req.body,
  };
  mutableServers.push(newServer);
  res.status(201).json(newServer);
}

export function remove(req, res) {
  const { id } = req.params;
  mutableServers = mutableServers.filter((s) => s.id !== id);
  res.status(200).json({
    message: "Server has been successfully removed.",
  });
}
