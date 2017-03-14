/*
Author :- Vishesh Tanwar
Purpose :- Service used to send email
*/

var nodemailer = require('nodemailer');

let transporter= nodemailer.createTransport({
     service:'Gmail',
     auth:{
          user: 'tanwar.tony136@gmail.com',
          pass: '9416950571'
     }
});

module.exports = {
     send:function(mailOptions , callback){
          transporter.sendMail(mailOptions ,function(err , info){
               if(err){
                    return callback(err, null);
               }
               else{
                    return callback(null, info);
               }
          });
     }

}
