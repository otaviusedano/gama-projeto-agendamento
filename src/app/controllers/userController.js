import * as Yup from 'yup'
import User from "../models/user"

class UserController {
  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    if (!schema.isValidSync(req.body)) {
      return res.status(400).json({
        error: "Schema inválido"
      })
    }

    const emailExist = await User.findOne({
      where: {email: req.body.email}
    })

    if (emailExist) {
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

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),    
      password: Yup.string().min(6).when(
        'oldPassword', (oldPassword, field) => 
          oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) => 
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if (!schema.isValidSync(req.body)) {
      return res.status(400).json({
        error: "Schema inválido"
      })
    }

    const { email, oldPassword } = req.body
    const user = await User.findByPk(req.userId)

    if (email && email !== user.email) {
      const emailExist = await User.findOne({
        where: {email}
      })

      if (emailExist) {
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