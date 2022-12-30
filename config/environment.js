const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');


const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});


const development={
    name: 'development',
    asset_path: './assets',
    session_cookie: 'blahSomething',
    db: 'codeinit_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'nikhil09.dixit@gmail.com',
            pass: 'paigpwxtmhjhwtdh'
        }
    },
    google_clientID: '133487419438-53er0mss9ieffj0avk07gjb0i8io9vsr.apps.googleusercontent.com',
    google_clientSecret: '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',
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwtSecret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}
const producution={
    name: 'production',
    asset_path: process.env.CODEIT_ASSET_PATH,
    session_cookie: process.env.CODEIT_SESSION_COOKIE,
    db: process.env.CODEIT_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIT_SMTP_USER,
            pass: process.env.CODEIT_SMTP_PASS
        }
    },
    google_clientID: process.env.CODEIT_GOOGLE_CLIENTID,
    google_clientSecret: process.env.CODEIT_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODEIT_GOOGLE_CALLBACK,
    jwtSecret: process.env.CODEIT_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}
module.exports=producution;
