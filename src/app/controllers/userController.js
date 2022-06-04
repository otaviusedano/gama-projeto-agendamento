import User from "../models/user"

class UserController {
  async store(req, res) {
    const idExist = await User.findOne({
      where: {id: req.body.id}
    })
    if (idExist) {
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
    const { email, oldPassword } = req.body
    const user = await User.findByPk(req.userId)

    if (email && email !== user.email) {
      const emailExist = await User.findOne({
        where: {email}
      })

      if ((await emailExist)) {
        res.status(401).json({
          error: "Usuário já cadastrado"
        })
      } 
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: "Senha Inválida"
      })
    }

    const { id, name, provider } = await user.update(req.body)

    return res.status(200).json({
      id, name, email, provider
    })
  }
}

export default new UserController()