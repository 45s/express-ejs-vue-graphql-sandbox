import { Router } from 'express'

import { api } from '../config/api.js'

import { getAll, create, remove } from '../controllers/servers.js'

export const routerServer = Router()

const { servers } = api

routerServer.get(servers, getAll)
routerServer.post(servers, create)
routerServer.delete(`${servers}/:id`, remove)

// routerServer.put(`${apiUrl}/:id`, put);
// routerServer.patch(`${apiUrl}/:id`, patch);
