const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const env=require('./environment');
// console.log(env.jwtSecret);
let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret"
};
//from payloads
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    console.log(jwtPayload);
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            // console.log('error in finding id');
            console.log(err,'*********************************************************');
            return done(err, false);
        }
        console.log(user);
        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
        
    });
}));
module.exports=passport;