import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    validate: {
      async validator(email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: 'The specified email adress is already in use',
    },
    required: [true, 'Email is required'],
    unique: true,
  },
  password: { type: String, required: true },
  list: [{ type: mongoose.Types.ObjectId, required: true, ref: 'list' }],
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});
const User = mongoose.model('user', userSchema);
export default User;
