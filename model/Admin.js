const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const AdminSchema = await new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    email: [true, "Enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Hr"],
    default: "Hr",
  },
});

AdminSchema.virtual("password").set(function () {
  this._password = password;
});

AdminSchema.pre("save", function (next) {
  const user = this;
  if (user._password == undefined) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) console.log(err);
    // hash the password using our new salt
    bcrypt.hash(user._password, salt, function (err, hash) {
      if (err) console.log(err);
      user.password = hash;
      next();
    });
  });
});

AdminSchema.methods = {
  comparePassword: function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  },
};

module.exports = mongoose.model("Admin", AdminSchema);
