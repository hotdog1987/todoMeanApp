var taskModel = require('../model/mongoModel').task;
var userModel = require('../model/mongoModel').user;

module.exports = {


    getTodoList: function(req,res,next){
        if(req.params.id){
            taskModel.findOne({taskId: req.params.id},function(fetchErr,task){
                if(fetchErr){
                    return res.status(500).json({message: 'Failed to fetch task with id: '+req.params.id+'. Log: '+existsErr});
                }
                else{
                    return res.status(200).json(task);
                }
            });
        }
        else{
            taskModel.find({},function(fetchAllErr,tasks){
                if(fetchAllErr){
                    return res.status(500).json({message: 'Failed to fetch all tasks. Log: '+fetchAllErr});
                }
                else{
                    return res.status(200).json(tasks);
                }
            });
        }
    },


    createList: function(req,res,next){
        userModel.findOne({username: req.body.username},function(fetchUserErr, user){
            if(fetchUserErr){
                return res.status(500).json({message: 'Failed to check user information for authorization: . Log: '+fetchUserErr});
            }
            else{
                if(user !== null){
                     if(user.role === 'Admin'){
                        var newTask = new taskModel({
                            taskId: req.body.task.taskId,
                            taskTitle: req.body.task.taskTitle,
                            taskDesc: req.body.task.taskDesc
                        });

                        taskModel.find({}).sort({taskId:'desc'}).limit(1).exec(function(fetchOneErr, task){
                            if(fetchOneErr){
                                return res.status(500).json({message: 'Failed to check if task with id: '+req.body.task.id+'exists. Log: '+fetchOneErr});
                            }
                            else{
                                if(task.length !== 0){
                                    newTask.taskId = task[0].taskId + 1;
                                }
                                else{
                                    newTask.taskId = 1;
                                }
                                newTask.save(function(createErr,success){
                                    if(createErr){
                                        return res.status(500).json({message: 'Failed to create a new task. Log: '+createErr});
                                    }
                                    else{
                                        return res.json({message: 'New task with id: '+newTask.taskId+' was created successfully.'});
                                    }
                                });
                            }
                        });
                    }
                    else{
                        return res.send(403).json({message: 'You are not authorized to perform this action.'});
                    }
                }
                else{
                    return res.send(500, {message: 'Uh ho! Looks like you don\'t exists in our db.'});
                }
               
            }
        });
    },


    editList: function(req,res,next){
         userModel.findOne({username: req.body.username},function(fetchUserErr, user){
            if(fetchUserErr){
                return res.status(500).json({message: 'Failed to check user information for authorization: . Log: '+fetchUserErr});
            }
            else{
                if(user !== null){
                     if(user.role === 'Admin'){
                        
                        taskModel.findOne({taskId: req.params.id}).exec(function(fetchOneErr, task){
                            if(fetchOneErr){
                                return res.status(500).json({message: 'Failed to check if task with id: '+newTask.taskId+'exists. Log: '+fetchOneErr});
                            }
                            else{
                                task.taskTitle = req.body.task.taskTitle;
                                task.taskDesc = req.body.task.taskDesc;

                                task.save(function(updateErr,success){
                                    if(updateErr){
                                        return res.status(500).json({message: 'Failed to update the task. Log: '+updateErr});
                                    }
                                    else{
                                        return res.send(200, {message: 'Task with id: '+req.params.id+' was updated successfully.'});
                                    }
                                });
                            }
                        });
                    }
                    else{
                        return res.send(403).json({message: 'You are not authorized to perform this action.'});
                    }
                }
                else{
                    return res.send(500, {message: 'Uh ho! Looks like you don\'t exists in our db.'});
                }
            }
        });
    },


    removeList: function(req,res,next){
        userModel.findOne({username: req.body.username},function(fetchUserErr, user){
            if(fetchUserErr){
                return res.status(500).json({message: 'Failed to check user information for authorization: . Log: '+fetchUserErr});
            }
            else{
                if(user !== null){
                     if(user.role === 'Admin'){
                        
                        taskModel.remove({taskId: req.params.id},function(fetchOneErr, removed){
                            if(fetchOneErr){
                                return res.status(500).json({message: 'Failed to check if task with id: '+newTask.taskId+'exists. Log: '+fetchOneErr});
                            }
                            else{
                                return res.status(200).json({message: 'Task with id: '+req.params.id + ' removed successfully.'});
                            }
                        });
                    }
                    else{
                        return res.send(403).json({message: 'You are not authorized to perform this action.'});
                    }
                }
                else{
                    return res.send(500, {message: 'Uh ho! Looks like you don\'t exists in our db.'});
                }
            }
        });
    }
};