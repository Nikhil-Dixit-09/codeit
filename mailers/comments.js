const nodemailer=require('../config/nodemailer');



//this is another way of exporting a method
exports.newComment=(comment,user)=>{
    console.log('inside new comment mailer');
    // console.log(email);
    console.log(comment);
    let htmlString=nodemailer.renderTemplate({comment: comment,user:user},'/comments/newcomment.ejs');
    nodemailer.transporter.sendMail({
        from: 'nikhil09.dixit@gmail.com',
        to: user.email,
        subject: "New comment published",
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