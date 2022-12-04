import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const isCustomToken = token.length < 500

    let decodedData

    if (isCustomToken && token) {
      decodedData = jwt.verify(token, 'test')
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    res.status(401).send({ message: 'Invalid or expired token' })
  }
}

export default auth
