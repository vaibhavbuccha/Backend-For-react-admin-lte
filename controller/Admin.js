const Admin = require("../model/Admin");
const { registerValidation } = require("../validation/admin");

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
