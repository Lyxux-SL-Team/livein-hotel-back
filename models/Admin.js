import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    countryCode:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
 
}, { timestamps: true }); 

const Admin = mongoose.model("Admin", userSchema);

export default Admin;
