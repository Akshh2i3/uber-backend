const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            require: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
})


// came across an error where i found my token contain no payload or data
// after checking why i found that i am using arrow function and this keyword simultaneously
// due to which this._id stores undefined and my token contain no payload
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;