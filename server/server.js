var express = require('express');
const _ = require('lodash');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

/** This section is used to manipluate TODOS */
app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text,
        completed: request.body.completed !== undefined ? request.body.completed : null,
        completedAt: request.body.completed !== undefined && request.body.completed !== false ?
        `${new Date().getHours()}:${new Date().getMinutes()}, on ${new Date().getDate()} ${new Date().getMonth()+1} ${new Date().getFullYear()}` : null
    });
    todo.save().then((doc) => {
        response.send({doc});
        console.log(request.body.completed);
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

app.delete('/todos/:id', (request,response)=> {
    var id = request.params.id;
    if(!ObjectID.isValid(id)) {
        return response.status(404).send({
            errorMessage: 'Bad User ID'
        });
    }
    Todo.findOneAndRemove({
        _id: id
    }).then((doc)=> {
        if(!doc) {
            return response.status(404).send({
                errorMessage: 'User not Found'
            });
        }
        return response.send({doc});
    });
},(e)=> {
    return response.status(400).send()
});

app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;
    var body = _.pick(request
    .body,['text','completed']);
    if(!ObjectID.isValid(id)) {
        return response.status(404).send({
            errorMessage: 'Bad User ID'
        });
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = `${new Date().getHours()}:${new Date().getMinutes()}, on ${new Date().getDate()} ${new Date().getMonth()+1} ${new Date().getFullYear()}`;
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set: body}, {new:true}).then((doc)=> {
        if(!doc) {
            return response.status(404).send({
                errorMessage: 'User not Found'
            });
        }
        return response.send({doc});
    }, (e) => {
        return response.status(400).send()
    });

});

/** This section is used to manipulate users */

app.post('/users' , (request, response) => {
    var body = _.pick(request.body,['email','password'])
    var user = new User(body);
    user.save().then(()=> {
        return user.generateAuthToken()
    }).then((token)=> {
        return response.header('x-auth', token).send({user})
    }).catch((e)=> {
        response.status(400).send({e});
    });
});


app.get('/users/me', authenticate, (request, response)=> {
    response.send(request.user);
});

// POST -> users/ogin [email,password]

app.post('/users/login', (request, response) => {
    var body = _.pick(request.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            response.header('x-auth', token).send(user);
        });
    }).catch(() => {
        return response.status(400).send({'error': 'Credentials invalid'});
    });
})

/** Start of the server */
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});