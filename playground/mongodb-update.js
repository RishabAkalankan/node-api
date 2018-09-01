const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server');
    }
    console.log('connected to mongodb successfully');
    //findOneAndUpdate()
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b8a74fb1562eeedd468f8cf")
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result)=> {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b86e50101b78a2404890e95')
    }, {
        $set: {
            name: 'Schrodinger'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result)=> {
        console.log(result);
    });

    // db.close();
});