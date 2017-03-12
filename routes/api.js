var express = require('express');
var router = express.Router();
var userService = require('../services/userService');
var listService = require('../services/listService');

router.route('/login')
    // create user
    .post(function(req, res, next) {
        userService.loginUser(req, res, next);
    });

/* route for user */
router.route('/users')
    // create user
    .post(function(req, res, next) {
        userService.createUser(req, res, next);
    });

 router.route('/users/:username')   
    // get user
    .get(function(req,res,next){
        userService.getUser(req,res,next);
    })
    // delete user
    .delete(function(req, res, next) {
        userService.removeUser(req, res, next);
    });
/*****************/    

/* route for todolists */
router.route('/tasks')
    // GET list (get all tasks in todolist)
    .get(function(req,res,next){
        listService.getTodoList(req,res,next);
    })

    // POST list (create a task in todolist)
    .post(function(req, res, next) {
        listService.createList(req, res, next);
    });

 router.route('/tasks/:id')
    // GET (get one task)
    .get(function(req,res,next){
        listService.getTodoList(req,res,next);
    })
    // PUT (edit an existing task)
    .put(function(req,res,next){
        listService.editList(req,res,next);
    })
    // DELETE (remove the task)
    .post(function(req, res, next) {
        listService.removeList(req, res, next);
    });
/*****************/


module.exports = router;
