import User from "./models/User.js";
import connectToDatabase from "./db/db.js";
import bcrypt from "bcrypt";

const userRegister = async () => {
  try {
    await connectToDatabase();

    const hashedPassword = await bcrypt.hash("admin", 10);

    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Register error:", error);
    process.exit(1);
  }
};

userRegister();