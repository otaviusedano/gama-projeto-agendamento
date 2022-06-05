import multer from 'multer'
import crypto from 'crypto'
import {  extname, resolve } from 'path'

const multerConfig = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(10, (error, res) => {
        if(error) return cb(error)

        return cb(null, res.toString('hex') + extname(file.originalname))
      })
    },
  })
}

export default multerConfig
