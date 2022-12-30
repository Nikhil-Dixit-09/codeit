const express=require('express');
const env=require('./config/environment');
const cookieParser=require('cookie-parser');
const app=express();
const port=process.env.CODEIT_PORT||8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');

const passport=require('passport');
const passportLocal=require('./config/passport');
const passportJWT=require('./config/passport-jwt-strategy')
const passportGoogle=require('./config/passport-google-auth2');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

// const chatServer=require('http').Server(app);
// const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);

// const io = require("socket.io")(chatServer, {
//     cors: {
//       origin: "http://localhost:8000",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });
//   chatServer.listen(5000);
app.use(cookieParser());

app.use(express.static('./assets'));
//make the upload path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
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
    secret: "abcdefg",
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
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));
// //ffefe
// const madge=require('madge')
// madge('./index.js').then((res) => {
// 	console.log(res.circular());
// });
app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});