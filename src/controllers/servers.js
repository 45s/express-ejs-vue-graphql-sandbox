import { servers } from "../constants/servers.js";

export function getAll(req, res) {
  res.status(200).json(servers);
}
