const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const env=require('./environment');
const User=require('../models/user');
passport.serializeUser((user, done) => {
    console.log('juio');
    done(null, user.googleId || user.id);
});

passport.deserializeUser((googleId, done) => {
    console.log('uiuop');
    database.findOne({ googleId : googleId }, (err, user) => {
        done(null, user);
    });
});
//tell passport to use a strategy for a google login and signup
passport.use(new googleStrategy({
        clientID: env.google_clientID,
        clientSecret: env.google_clientSecret,
        callbackURL: env.google_callbackURL
},function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error**',err);
            return;
        }
        console.log('hi');
        console.log(profile);
        if(user){
            console.log('hiiiiiiiiiiiiiiiiiiiiiiiiii');
            //if found set this user as req.user
            return done(null,user);
        }else{
            console.log('hiiiiiiiiiiiiiiiiiiiiiiiiii12');
            //if not found create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error**',err);
                    return;
                }
                return done(null,user);
            });
        }
    });
}


));
module.exports=passport;