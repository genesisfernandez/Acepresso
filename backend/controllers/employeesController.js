import Employee from "../models/Employee.js";

// GET all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({visible: true}).sort({ createdAt: -1 });
    res.json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single employee
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id, { visible: true });
    if (!employee)
      return res.status(404).json({ success: false, message: "Employee not found" });
    res.json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, position, department, salary, status } = req.body;
    const existing = await Employee.findOne({ email });
    if (existing)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const employee = await Employee.create({ name, email, position, department, salary, status });
    res.status(201).json({ success: true, employee, message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee)
      return res.status(404).json({ success: false, message: "Employee not found" });
    res.json({ success: true, employee, message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// SOFT DELETE employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { visible: false },
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};