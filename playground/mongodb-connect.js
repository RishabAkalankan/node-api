const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server');
    }
    console.log('connected to mongodb successfully');
    // db.collection('Todos').insertOne({
    //     text: 'Do modal permissions',
    //     completed: false
    // }, (err,res) => {
    //     if(err) {
    //         return console.log('Unable to insert todo')
    //     }
    //     console.log(JSON.stringify(res.ops , undefined , 2));
    // });
    // db.collection('Users').insertOne({
    //     name: 'Djokovic',
    //     age: 34,
    //     location: 'Serbia'
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('Unable to insert todo');
    //     }
    //     console.log(res.ops[0]._id.getTimestamp());
    // });

    db.close();
});