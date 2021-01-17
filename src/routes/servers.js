import { Router } from 'express'

import { api } from '../config/index.js'
import { getAll, create, remove } from '../controllers/servers.js'

export const routerServers = Router()

const { servers } = api

routerServers.get(servers, getAll)
routerServers.post(servers, create)
routerServers.delete(`${servers}/:id`, remove)

// routerServers.put(`${apiUrl}/:id`, put);
// routerServers.patch(`${apiUrl}/:id`, patch);
