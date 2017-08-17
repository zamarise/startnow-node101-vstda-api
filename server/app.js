// Create Express server framework
const express = require('express');
// Middleware: morgan is an HTTP request logger
const morgan = require('morgan');
// Middleware: body-parser for POST data of the body
const bodyParser = require('body-parser');
// "app" is an instance of Express
const app = express();
// Use Lodash to work with arrays
const _ = require('lodash');
// Concise output for development use
app.use(morgan('dev'));
// Parse JSON-encoded data
app.use(bodyParser.json());
// Parse URL-encoded data with qs library
app.use(bodyParser.urlencoded({
  extended: true
}));
// Global variables
var data = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }];
// var todoItemId = 2;
// GET '/' responds with a 200 response code
app.get('/', (req, res) => {
  res.status(200),
    res.json();
});
// GET '/api/TodoItems' responds with all items
app.get('/api/TodoItems', (req, res, next) => {
  res.status(200),
    res.json(data);
  next();
});
// GET '/api/TodoItems/{id}' responds with an item
// Uses a route parameter to respond with a single item with a matching todoItemId
// Use: Read Single Todo Item from List
app.get('/api/TodoItems/:todoItemId', (req, res) => {
  // var whichItem = data[req.params.todoItemId];
  var check = req.params.todoItemId;
  var checkNumber = Number(check);
  let newDataItem = _.find(data, {
    todoItemId: checkNumber
  });
  res.status(200),
    res.json(newDataItem);
});
// POST '/api/TodoItems' responds with item, status 201
// Adds an item to the dataset. If there is already an item with a matching todoItemId, overwrite the existing item.
// Use: Create a Single Todo Item
app.post('/api/TodoItems/', (req, res) => {
  // Get all todo items from key value pairs in the URL
  // var newTodoItem = req.body;
  // todoItemId++;
  // newTodoItem.todoItemId = Number(req.query.todoItemId);
  // newTodoItem.name = String(req.query.name);
  // newTodoItem.priority = Number(req.query.priority);
  // newTodoItem.completed = Boolean(req.query.completed);
  var newTodoItem = req.body;
  // Increment todoItemId by 1
  // todoItemId++;
  // newTodoItem.todoItemId = todoItemId + '';
  newTodoItem.todoItemId = Number();
  newTodoItem.name = '';
  newTodoItem.priority = Number();
  newTodoItem.completed = Boolean();
  data.push(newTodoItem);
  res.status(201),
    res.json(newTodoItem);
});
// ** DELETE '/api/TodoItems/{id}' responds with an item
// ** Use a route parameter to remove the item with a matching todoItemId from the dataset. Respond to the request with the deleted item.
// ** Delete Single Todo Item from List
app.delete('/api/TodoItems/:todoItemId', (req, res) => {
  var check = req.params.todoItemId;
  var checkNumber = Number(check);
  let newDataItem = _.findIndex(data, {
    todoItemId: checkNumber
  });
  if (!data[newDataItem]) {
    res.send();
  }
  else {
    var deleteItem = data[newDataItem];
    data.splice(newDataItem, 1);
    res.json(deleteItem);
  }
});
module.exports = app;
