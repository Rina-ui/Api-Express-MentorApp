import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   role: {
    type: String,
    enum: ['mentor', 'learner'],
    required: true,
   }
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

export default User;