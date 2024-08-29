const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const con = require('./db');

const login = require('./routes/auth/login');
const userCreate = require('./routes/user/create');

const questionCreate = require('./routes/question/create');
const questionRead = require('./routes/question/read');
const questionUpdate = require('./routes/question/update');
const questionDelete = require('./routes/question/delete');

const testCreate = require('./routes/test/create');
const testRead = require('./routes/test/read');
// const testUpdate = require('./routes/test/update');
// const testDelete = require('./routes/test/delete');
const { verifyToken } = require('./routes/helpers/token');

app.use(bodyParser.json());

app.use('/v1/login',login);
app.use('/v1/user',verifyToken,userCreate)

app.use('/v1/question',verifyToken,questionCreate);
app.use('/v1/question',verifyToken,questionRead);
app.use('/v1/question',verifyToken,questionUpdate);
app.use('/v1/question',verifyToken,questionDelete);

app.use('/v1/test',verifyToken,testCreate);
app.use('/v1/test',verifyToken,testRead);
// app.use('/v1/test',verifyToken,testRead);
// app.use('/v1/test',verifyToken,testDelete);

module.exports = app;




