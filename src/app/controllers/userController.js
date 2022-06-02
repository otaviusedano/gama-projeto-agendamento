import User from "../models/user"

class UserController {
  async store(req, res) {
    const userExists = await User.findAll({
      where: {email: req.body.email, id: req.body.id}
    })
    if (userExists) {
      return res.status(401).json({
        error: "Usuário já cadastrado"
      })
    }
    const {id, name, email, provider} = await User.create(req.body)
    return res.json({
      id, name, email, provider
    })
  }

  async update(req, res) {
    return res.json({msg: true})
  }
}

export default new UserController()