const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');

const passport=require('passport');
const passportLocal=require('./config/passport');
const session=require('express-session');
const MongoStore=require('connect-mongo');
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from the sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views'); 
//mongo store session cookie
app.use(session({
    name: 'codeit',
    //toDo in production
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/codeinit_development' ,
        autoRemove: 'disabled'
    },function(err){
        if(err){
            console.log(err||'fine working');
        }
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));
//ffefe
app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});