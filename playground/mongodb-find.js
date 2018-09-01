const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server');
    }
    console.log('connected to mongodb successfully');
    db.collection('Todos').find({
        _id: new ObjectID('5b86ea02e98e8cfcdb77f0f3')
    }).toArray().then((documents) => {
        console.log('Successfully fetched the data');
        console.log(JSON.stringify(documents, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Total Count:', count);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });
    // db.close();
});