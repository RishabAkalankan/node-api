const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');



var data = {
    id: 22
};

var hashServer = jwt.sign(data, 'forex');
console.log(hashServer);

var decoded = jwt.verify(hashServer, 'forex');
console.log(decoded);

// var message = 'I love sachin';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'Tamizhan').toString()
// } 

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultResult = SHA256(JSON.stringify(token.data) + 'Tamizhan').toString();

// if(resultResult === token.hash) {
//     console.log('Good to go');
// } else {
//     console.log('Security Breach');
// }