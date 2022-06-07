import { Router } from "express"
import multer from 'multer'
import multerConfig from "./config/multer"
import UserController from "./app/controllers/userController"
import SessionController from "./app/controllers/sessionController"
import collaboratorController from "./app/controllers/collaboratorController"
import FileController from './app/controllers/fileController'
import authMiddlewares from "./app/middlewares/auth"

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares)

routes.put('/users', UserController.update)

routes.get('/collaborators', collaboratorController.index)

routes.post('/files', upload.single('file'), FileController.store)

export default routes