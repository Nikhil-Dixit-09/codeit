const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email,password,done){
    console.log('in google');
    User.findOne({email: email},function(err,user){
        if(err){
            console.log('error in function');
            return done(err);
        }
        if(!user||user.password!=password){
            console.log('invalid details');
            console.log('wrong password');
            return done(null,false);
        }
        return done(null,user);
    }); 
}

));
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    console.log('hiiiiiiiis');
     done(null,user.id);
});
passport.deserializeUser(function(id,done){
    // console.log('hiii');
    // console.log(id);
    console.log('byeeeeeeee');
    User.findById(id,function(err,user){
        if(err){
            console.log('error');
            return done(err);
        }
        // console.log(user);
        
        return done(null,user);
    });
});
passport.checkAuthentication=function(req,res,next){
    // console.log(req.cookies);
    //if user is signed in pass on the request to the next function(controller's action)
    console.log('heyyyyyyyyyyyyyyy');
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/signin');
}
passport.checkNotAuthenticated=function(req,res,next){
    // console.log(req.cookies);
    console.log('hiiii456');
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/profile');
}
passport.setAuthenticatedUser=function(req,res,next){
    console.log('mr beast');
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;      
        }
        next();
}
module.exports=passport;