import { CheckEmail, CreateAdmin ,LoginAdmin,UpdateAdmin} from '../services/admin.js';

const CheckAdminEmailController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ success: false, message: 'Email is required' });
  }
  try {
    const emailExists = await CheckEmail(email);
    if (emailExists) {
      res.status(200).send({ success: false, message: 'Email exists' });
    } else {
      res.status(200).send({ success: true, message: 'Email not found' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
};

const CreateAdminController = async (req, res) => {
    const adminData = req.body;

    if (!adminData.email || !adminData.password) {
        return res.status(400).send({ success: false, message: 'Email and password are required' });
    }

    try {
        const emailExists = await CheckEmail(adminData.email);
        if (emailExists) {
            return res.status(400).send({ success: false, message: 'Email already exists' });
        }

        const admin = await CreateAdmin(adminData, res);
        res.status(201).send({ success: true, message: 'Admin created successfully', user:admin.admin,token:admin.token });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
};

//admin login
const LoginAdminController =async(req,res)=>{
    const { email, password } = req.body;

    try {
        // Call the login service
        const admin  = await LoginAdmin(email, password,res);

        // Respond with success
        res.status(200).json({
            message: 'Login successful',
            user: admin.admin,
            token:admin.token,
        });
    } catch (error) {
        // Handle errors from the service
        res.status(400).json({ message: error.message });
    }
}
// Admin update
const UpdateAdminController = async (req, res) => {
    const adminId = req.params.adminId;
    const  updateData  = req.body;
  
    if (!adminId) {
      return res.status(400).send({ success: false, message: 'Admin ID is required' });
    }
  
    try {
      // Call the update service
      const updatedAdmin = await UpdateAdmin(adminId, updateData);
  
      // If no admin is returned, respond with a 404 status code
      if (!updatedAdmin) {
        return res.status(404).send({ success: false, message: 'Admin not found' });
      }
  
      // Respond with success
      res.status(200).send({
        success: true,
        message: 'Admin updated successfully',
        admin: updatedAdmin
      });
    } catch (error) {
      // Handle errors from the service
      res.status(500).send({ success: false, message: error.message });
    }
  };
  
  export { CheckAdminEmailController, CreateAdminController, LoginAdminController, UpdateAdminController };
