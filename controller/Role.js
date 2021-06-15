const Role = require("../model/Role");
const { roleValidation } = require("../validation/role");

exports.create = (req, res) => {
  const role = new Role(req.body);

  const { error } = roleValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  role.save((err, role) => {
    if (err)
      return res.status(400).json({ success: false, error: err.message });

    res.json({
      success: true,
      data: role,
    });
  });
};

exports.roles = (req, res) => {
  Role.find().exec((err, roles) => {
    if (err)
      return res.status(400).json({ success: false, error: err.message });
    res.json({
      success: true,
      data: roles,
    });
  });
};

exports.getRoleById = async (req, res, next, id) => {
  await Role.findById(id).exec((err, role) => {
    if (err)
      return res.status(400).json({ success: false, error: err.message });

    req.role = role;
    next();
  });
};

exports.getRole = async (req, res) => {
  let role = await req.role;
  res.json({
    success: true,
    data: role,
  });
};
