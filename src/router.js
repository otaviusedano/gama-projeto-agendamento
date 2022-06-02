import { Router } from "express"
import UserController from "./app/controllers/userController"
import SessionController from "./app/controllers/sessionController"

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.put('/update', UserController.update)


export default routes