const e = require('express');
const nodemailer=require('../config/nodemailer');

module.exports.newPassword=function(reset,email,user){
    console.log(reset);
    let htmlString=nodemailer.renderTemplate({reset:reset,email:email,user:user},'/password/newPassword.ejs');
    nodemailer.transporter.sendMail({
        from: 'nikhil09.dixit@gmail.com',
        to: email,
        subject: "Reset Procedure",
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('error',err);
            return;
        }
        console.log('message sent',info);
        return;
    });
}