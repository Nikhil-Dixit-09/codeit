var User=require('../models/user');
module.exports.home=function(req,res){
    console.log('hi');
    return res.render('users',{
        title: "User"
    });
}
module.exports.signin=function(req,res){
    console.log('in sign in');
    console.log(req.cookies);
    res.cookie('user_id',25);
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
    console.log('in user session');
    console.log(req.body);
    
    return res.render('u_sign_in',{
        title: "User Sign in"
    });
}