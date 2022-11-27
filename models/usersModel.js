import mongoose from 'mongoose'

const usersModelSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String }
})

const usersModel = mongoose.model('Users', usersModelSchema)

export default usersModel
