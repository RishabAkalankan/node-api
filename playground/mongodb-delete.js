const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server');
    }
    console.log('connected to mongodb successfully');
    // db.collection('Todos').deleteMany({text: 'Eat at Johnas bistro'}).then((result)=> {
    //     console.log(result);
    // })
    // db.collection('Todos').deleteOne({text: 'complete sbap-785'}).then((result)=> {
    //     console.log(result);
    // })
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=> {
    //     console.log(result);
    // });
    /** test code */
    // db.collection('Users').deleteMany({name: 'Djokovic'}).then((result)=> {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("5b8a80641562eeedd468fc5f")
    }).then((result)=> {
        console.log(result);
    })

    // db.close();
});