var {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var id = '5b8a9c114e32cc1f70fcb7b511';

if(!ObjectID.isValid(id)) {
    console.log('User ID is not valid');
}
// Todo.find({
//     _id:id
// }).then((todo)=> {
//     if(!todo) {
//         return console.log('no user found');
//     }
//     console.log('todo', JSON.stringify(todo, undefined, 2));
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=> {
//     if(!todo) {
//         return console.log('no user found');
//     }
//     console.log('todo single', JSON.stringify(todo, undefined, 2));
// },(e)=> {
//     console.log(e);
// });

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('no user found');
    }
    console.log('todo singleID', JSON.stringify(todo, undefined, 2));
},(e)=> {
    console.log(e);
});