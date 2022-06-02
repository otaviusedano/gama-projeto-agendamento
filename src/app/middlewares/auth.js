export default (req, res, next) => {
  const authHeaders = req.headers.authorization

  if (!authHeaders) {
    return res.status(401).json({
      error: "É necessário estar logado"
    })
  }

  const [ _, token ] = authHeaders.split(' ')
  console.log('Token', token)

  next()
}