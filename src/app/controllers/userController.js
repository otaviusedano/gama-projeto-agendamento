import User from "../models/user"

class UserController {
  async store(req, res) {
    const emailExist = await User.findOne({
      where: {email: req.body.email}
    })
    const idExist = await User.findOne({
      where: {id: req.body.id}
    })
    if (emailExist || idExist) {
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