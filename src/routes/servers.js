import { Router } from "express";

import { getAll, create, remove } from "../controllers/servers.js";

export const routerServer = Router();

const apiUrl = "/api/servers";

routerServer.get(apiUrl, getAll);
routerServer.post(apiUrl, create);
routerServer.delete(`${apiUrl}/:id`, remove);

// routerServer.put(`${apiUrl}/:id`, put);
// routerServer.patch(`${apiUrl}/:id`, patch);
