import dotenv from "dotenv"
dotenv.config();
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
// Check email admin
const CheckEmail = async (email) => {
  const admin = await Admin.findOne({ email });
  if (admin) {
    return true;
  } else {
    return false;
  }
};

//create admin
const CreateAdmin = async (adminData, res) => {
    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);
  
      // Replace the plain password with the hashed password
      adminData.password = hashedPassword;
  
      const admin = new Admin(adminData);
      await admin.save();
  
      const token = jwt.sign({ id: admin._id }, process.env.KEY, { expiresIn: '1d' });
  
      // Set cookie
      res.cookie("token", token, { maxAge: 36000, httpOnly: true });
      return {admin,token};
    } catch (error) {
      console.error("Error creating admin:", error);
      throw new Error("Failed to create admin");
    }
  };

  //login admin
  const LoginAdmin = async (email, password,res) => {
    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new Error('Admin not found');
        }

        // Compare provided password with hashed password in database
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.KEY, { expiresIn: '1h' });
        // Set JWT token in a cookie
        res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
        return  {admin,token};
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update admin
const UpdateAdmin = async (adminId, updateData) => {
    try {
      // Find the admin by ID
      const admin = await Admin.findById(adminId);
      if (!admin) {
        throw new Error('Admin not found');
      }
  
      // Update admin details
      if (updateData.password) {
        // If password is included, hash it before saving
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(updateData.password, saltRounds);
      }
  
      // Use the `update` method to update admin details
      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });
      
      if (!updatedAdmin) {
        throw new Error('Failed to update admin');
      }
  
      return updatedAdmin;
    } catch (error) {
      console.error("Error updating admin:", error);
      throw new Error(error.message);
    }
  };

  //check admin Id
  const CheckAdminId = async (adminId) => {
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        throw new Error("Admin not found");
      }
    
      return admin;
    } catch (error) {
      throw new Error(`Error checking admin: ${error.message}`);
    }
  };

export { CheckEmail ,CreateAdmin,LoginAdmin,UpdateAdmin,CheckAdminId};