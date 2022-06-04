import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'

const authMiddlewares = async (req, res, next) => {
  const authHeaders = req.headers.authorization

  if (!authHeaders) {
    return res.status(401).json({
      error: "É necessário estar logado"
    })
  }

  const [ _, token ] = authHeaders.split(' ')

  const jwtVerify = promisify(jwt.verify);
  jwtVerify(token, authConfig.secret)
    .then((stats) => {
      req.userId = stats.id
      next()
    })
    .catch((error) => {
      if (error) {
        res.status(401).json({
          error: "Token inválido"
        })
      }
    })
}

export default authMiddlewares