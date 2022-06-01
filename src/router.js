import { Router } from "express"
import User from "./app/models/user"

const routes = new Router()

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: '',
    email: '',
    password_hash: '',
    id: 141
  })
  return res.send(user)
})

export default routes