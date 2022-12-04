import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization header must be provided' })
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Authorization header must contain Bearer followed by the token' })
  }
  const isCustomToken = token.length < 500

  let decodedData
  try {
    if (isCustomToken && token) {
      decodedData = jwt.verify(token, 'test')
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      req.userId = decodedData?.sub
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
  next()
}

export default auth
