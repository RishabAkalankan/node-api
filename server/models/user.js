var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: [true,'Please enter a email'],
        minlength: 1,
        trim: true
    }
});

module.exports = {User}