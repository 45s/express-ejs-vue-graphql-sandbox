import { Router } from "express";

import { getAll } from "../controllers/servers.js";

export const routerServer = Router();

routerServer.get("/api/servers", getAll);
