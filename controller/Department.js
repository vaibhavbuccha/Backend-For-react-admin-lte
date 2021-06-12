const Department = require("../model/Department");
const { departmentValidation } = require("../validation/department");

exports.create = (req, res) => {
  const department = new Department(req.body);

  const { error } = departmentValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  department.save((err, department) => {
    if (err)
      return res.status(400).json({ success: false, error: err.message });

    res.json({
      success: true,
      data: department,
    });
  });
};

exports.departments = (req, res) => {
  Department.find().exec((err, departments) => {
    if (err)
      return res.status(400).json({ success: false, error: err.message });
    res.json({
      success: true,
      data: departments,
    });
  });
};
