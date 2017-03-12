var mongoose = require('mongoose');
var config = require('../config');

var Schema = mongoose.Schema;
var userDb = mongoose.createConnection(config.mongoUri);

var userSchema = new Schema({
    username: {type: String, required: 'Enter username'},
    password: {type: String, required: 'Enter password'},
    role: {type: String, required: 'Enter role'},
    name: {type: String, required: 'Enter name'}
});

var taskSchema = new Schema({
    taskId: {type: Number, required: 'Enter taskId'},
    taskTitle: {type: String, required: 'Enter Title'},
    taskDesc: {type: String}
});

var user = userDb.model('users',userSchema);
var task = userDb.model('tasks',taskSchema);

module.exports = {
    user: user,
    task: task
};