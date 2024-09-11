const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const {Schema} = mongoose; 

const userSchema = new Schema(
{
    firstName: {
        type: String, 
        required: true, 
        maxlength: 32
    }, 
    lastName: {
        type: String, 
        required: true, 
        maxlength: 32
    }, 
    email: {
        type: String, 
        trim: true, 
        required: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        required: true
    }, 
    purpose: {
        type: String,
        enum: ['Personal', 'Business', 'Educational'],
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
        maxlength: 15
    },
    dob: {
        type: Date,
        required: true
    },
    region: {
        type: String,
        required: true
    },
}, 
{
    collection: "adminUser", 
    timestamps: {
        createdAt: "createdAt", 
        updatedAt: "updatedAt", 
    }, 
} 
); 
userSchema.pre('save', async function(next){
    const user = this; 
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // Generate salt and hash the password
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
        console.log(error)
    }
}); 
// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("UserSchema", userSchema)
module.exports = {
    User
}