import File from "../models/file"

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file
 
    const file = await File.create({
      name, path
    })

   console.log(req.file) // undefined

    return res.json({
      msg: file
    })
  }
}

export default new FileController()