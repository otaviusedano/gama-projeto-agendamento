import { Router } from "express"
import multer from 'multer'
import multerConfig from "./config/multer"
import UserController from "./app/controllers/userController"
import SessionController from "./app/controllers/sessionController"
import authMiddlewares from "./app/middlewares/auth"

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares)

routes.put('/users', UserController.update)

routes.post('/files', upload.single('file'),(req, res) => {
  return res.json({
    msg: true
  })
})

export default routes