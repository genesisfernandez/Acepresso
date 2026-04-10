import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    position:   { type: String, required: true },
    department: { type: String, required: true },
    salary:     { type: Number, required: true },
    status:     { type: String, enum: ["Active", "Inactive"], default: "Active" },
    visible: { type: Boolean, default: true }, // 👈 soft delete flag

  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);