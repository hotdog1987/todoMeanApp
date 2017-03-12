var user = require('../model/mongoModel').user;

module.exports = {
    // login user
    loginUser: function(req, res, next){
        user.findOne({username:req.body.username},function(findOneErr,user){
            if(findOneErr){
                return res.status(500).json({message: 'Failed to fetch user with username: '+req.body.username+'. Log: '+findOneErr});
            }
            else{
                if(user !== null){
                    if(user.password === req.body.password){
                        return res.status(200).json(user);
                    }
                    else{
                        return res.status(400).json({message: 'Incorrect password supplied. Log: '+findOneErr});
                    }
                }
                else{
                    return res.status(500).json({message: 'Failed to fetch user with username: '+req.body.username});
                }
            }
        });
    },

    // get user
    getUser: function(req, res, next){
        if(req.params.username){
            user.findOne({username: req.params.username},function(fetchErr,user){
                if(fetchErr){
                    return res.status(500).json({message: 'Failed to fetch user with username: '+req.params.username+'. Log: '+fetchErr});
                }
                else{
                    if(user !== null){
                        return res.status(200).json(user);
                    }
                    else{
                        return res.send(404,{message: 'User does not exists.'});
                    }  
                }
            });
        }
        else{
            user.find({},function(fetchAllErr,users){
                if(fetchAllErr){
                    return res.status(500).json({message: 'Failed to fetch all users. Log: '+fetchAllErr});
                }
                else{
                    return res.status(200).json(users);
                }
            });
        }
    },

    // create user
    createUser: function(req,res,next){
        user.findOne({username: req.body.username},function(existsErr, exists){
            if(existsErr){
                return res.status(500).json({message: 'Failed to check if '+req.body.username+' exists. Log: '+existsErr});
            }
            else{
                 if(exists){
                    return res.status(500).json({message: req.body.username + ' already exists'});
                }
                else{
                    for(var i = 0; i < req.body.length; i++){
                        var userOne = new user({
                            username: req.body[i].username,
                            password: req.body[i].password,
                            name: req.body[i].name,
                            role: req.body[i].role
                        });
                        userOne.save(function(createErr,created){
                            if(createErr){
                                return res.status(500).json({message: 'Failed to create '+ req.body.username+'. Log: '+createErr});
                            }
                        });
                    }
                    return res.status(200).json({message: 'User created successfully.'});
                }
            }
        });
    },

    // remove user
    removeUser: function(req,res,next){
        if(req.body.role === 'Admin'){
            user.findOne({username: req.params.username},function(existsErr){
                if(existsErr){
                    return res.status(500).json({message: 'Failed to check if '+req.params.username+' exists. Log: '+existsErr});
                }
                else{
                    user.remove({username: req.params.username},function(removeErr,removed){
                        if(removeErr){
                            return res.status(500).json({message:'Failed to remove '+req.params.username+'. Log: '+removeErr});
                        }
                            return res.status(200).json({message: req.params.username + ' removed successfully.'});
                    });
                }
            });
        }
        else{
            return res.send(403).json({message: 'You are not authorized to perform this action.'});
        }
    }
};