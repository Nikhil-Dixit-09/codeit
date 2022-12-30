const { localsName } = require('ejs');
var User=require('../models/user');
const fs=require('fs');
const path=require('path');
var Reset=require('../models/resetp');
const crypto=require('crypto');
var passwordReset=require('../mailers/password');
module.exports.home=function(req,res){
    console.log(req.params);
    User.findById(req.params.id,function(err,user_f){
        if(err){
            console.log('error');
            return;
        }
        return res.render('users',{
            title: "User",
            cuser: user_f
        });
    });
    
}
module.exports.signin=function(req,res){
    console.log('in sign in');
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    return res.render('u_sign_in',{
        title: "User Sign in"
    });
}
module.exports.signup=function(req,res){
    console.log('in sign up');
    return res.render('u_sign_up',{
        title: "User Sign up"
    });
}
module.exports.create=function(req,res){
    console.log('in user creation');
    console.log(req.body);
    if(req.body.password!=req.body.confirm_password){
        console.log('hi');
        res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating');
                    return;
                }
                return res.redirect('/users/signin');
            });
        }
        if(user){
            res.redirect('back');
        }
    });
    
}
module.exports.createSession=function(req,res){
    console.log(req.user);
    console.log('hiiin req');
    req.flash('success','Logged In Successfully!!');
    res.redirect('/');
}
module.exports.signout=function(req,res){

    req.logout(function(err){
        if(err){
            console.log('error');
            return;
        }
        req.flash('success','Logged Out successfully!!');
        return res.redirect('/');
    });
    
}  
module.exports.reset=function(req,res){
    // console.log(req.body);
    // console.log(req.query);
    // req.flash('success','Please check your email for further process!!');
    return res.render('reset',{
        title: "Reset Password"
    });
} 
module.exports.initiateReset=async function(req,res){
    console.log(req.body);
    var user=await User.findOne({email: req.body.email});
    // console.log(user);
    // console.log(user._id);
    if(user){
        console.log(user.id);
        Reset.create({
            user: user.id,
            token: crypto.randomBytes(20).toString('hex')
        },function(err,reset){
            if(err){
                console.log(err);
                return;
            }
            console.log(reset);
            passwordReset.newPassword(reset,user.email,user);
            req.flash('success','Please see the message for further process!!');
        });
    }
    return res.redirect('back');
}
module.exports.finalp=async function(req,res){
    console.log(req.query);
    console.log('hiiiii');
    var reset=await Reset.findOne({token: req.query.token});
    if(reset.isValid==true){
        res.render('changep',{
            title: "Change Password",
            token: req.query.token
        });
    }else{
        res.send("The token is expired!!");
    }
}
module.exports.pass=async function(req,res){
    console.log(req.body);
    if(req.body.password==req.body.confirmpassword){
        var reset=await Reset.findOneAndUpdate({token: req.body.token},{
            isValid: false
        });
        var user=await User.findByIdAndUpdate(reset.user,{
            password: req.body.password
        });
        return res.redirect('/users/signin');
    }
    req.flash("success","Please enter the same password");
    return res.redirect('back');
}
module.exports.update=async function(req,res){
    console.log(req.params);
    // console.log(req.body);
    // if(req.params.id==req.user.id){
    //     User.findByIdAndUpdate(req.params.id,{
    //         name: req.body.name,
    //         email: req.body.email
    //     },function(err,user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     res.status(401).send('unauthorized');
    // } 
    try{
        if(req.params.id==req.user.id){
           let user= await User.findById(req.params.id);
           User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('multer error',err);
                return;
            }
            console.log('avatar');
            console.log(req.file);
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    
                }
                //this is saving the path of uploaded file into the avatar field in the user
                user.avatar=User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');
           });
            // return res.redirect('back');
    
        }else{
            res.status(401).send('unauthorized');
        }
    }catch(err){
        console.log('error',err);
        return res.redirect('back');
    }
    
}
