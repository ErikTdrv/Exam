const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
// User Schema
const userSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
})
userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      return next();
    });
  });
// User model
const User = mongoose.model('User', userSchema);
module.exports = User;