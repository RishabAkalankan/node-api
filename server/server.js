var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (request,response)=> {
    var todo = new Todo({
        text: request.body.text
    });
    todo.save().then((doc)=> {
        response.send(doc);
    }, (e)=> {
        response.status(400).send(`Unable to save the todo: ${e.errors.text.message}`)
    })
});

app.get('/todos',(request, response)=> {
    Todo.find().then((docs)=> {
        response.send({docs});
    }, (e)=> {
        response.status(400).send({e});
    })
});



app.listen(3000, ()=> {
    console.log('Started on port 3000');
});