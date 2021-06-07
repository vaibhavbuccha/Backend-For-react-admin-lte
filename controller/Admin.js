const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation/admin");

exports.register = async (req, res) => {
  const admin = new Admin(req.body);

  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  // check for unique email
  const emailExists = await Admin.findOne({ email: req.body.email });
  if (emailExists)
    return res
      .status(400)
      .json({ success: false, message: "Email Already Used." });

  //console.log(admin);
  await admin.save((err, user) => {
    if (err)
      return res.status(400).json({ success: false, error: err.message });

    res.json({
      success: true,
      data: user,
    });
  });
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const user = await Admin.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "Email is not registered." });

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validatePassword)
    return res
      .status(419)
      .json({ success: false, message: "Password is invalid" });

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.TOKEN_SECRET
  );
  res
    .status(200)
    .header("auth-token", token)
    .json({ success: true, message: "Login Successfully", token, user });

  // create and assign a token
};
