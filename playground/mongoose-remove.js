var {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

// Todo.remove({}).then() ======= removes all the entries from db

// Todo.findOneAndRemove({}).then((doc)=>{});
Todo.findByIdAndRemove('5b8ad31698b2c40df0709cc4').then((doc)=>{
    console.log(JSON.stringify(doc,undefined,2));
});