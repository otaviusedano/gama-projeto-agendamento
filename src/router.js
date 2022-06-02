import { Router } from "express"
import UserController from "./app/controllers/userController"
import SessionController from "./app/controllers/sessionController"
import authMiddlewares from "./app/middlewares/auth"

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares)

routes.put('/users', UserController.update)

export default routes