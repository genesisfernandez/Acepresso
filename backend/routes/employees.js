import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeesController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",          verifyToken, getEmployees);
router.get("/:id",       verifyToken, getEmployee);
router.post("/",         verifyToken, createEmployee);
router.put("/:id",       verifyToken, updateEmployee);
router.delete("/:id",    verifyToken, deleteEmployee);

export default router;