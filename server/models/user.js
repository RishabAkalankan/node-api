const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Please enter a email'],
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type:String,
        required: [true, 'Please enter a password'],
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'forexEUR').toString();
    
    user.tokens.push({access, token});

    return user.save().then(()=> {
        return token;
    });

}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try { 
        decoded = jwt.verify(token, 'forexEUR');
        console.log('here');
    } catch (e) {
        // return new Promise((resolve,reject) => {
        //     reject();
        // });
        return Promise.reject();
    }
    return User.findOne({
        '_id':  decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

UserSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10).then((salt) => {
            bcrypt.hash(user.password, salt).then((hash)=> {
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }

})

var User = mongoose.model('User', UserSchema);

module.exports = {User}