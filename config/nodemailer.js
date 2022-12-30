const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');
let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'nikhil09.dixit@gmail.com',
        pass: 'paigpwxtmhjhwtdh'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error',err);
                return;
            }
            mailHTML=template;

        }
    )
    return mailHTML;
}
module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}