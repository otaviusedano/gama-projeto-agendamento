export default (req, res, next) => {
  const authHeaders = req.headers.authorizartion

  console.log(authHeaders)
}