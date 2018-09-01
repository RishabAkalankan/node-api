var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text
    });
    todo.save().then((doc) => {
        response.send(doc);
    }, (e) => {
        response.status(400).send(`Unable to save the todo: ${e.errors.text.message}`)
    })
});

app.get('/todos', (request, response) => {
    Todo.find().then((docs) => {
        response.send({ docs });
    }, (e) => {
        response.status(400).send({ e });
    })
});

app.get('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send({
            errorMessage: 'Invalid User ID'
        });
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send({
                errorMessage: 'Bad User ID'
            });
        }
        return response.send({todo});
    }, (err)=> {
        return response.status(400).send();
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});