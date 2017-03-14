/*********************
Author: Vishesh Tanwar
Description: All the User related Info

*/


const UserModel = require(APP_PATH +'/api/model/userModel.js');
const UserModelMethods = new UserModel(); // Using User Models Methods
const CommonService = require(APP_PATH +'/api/service/CommonService.js');
const EmailService = require(APP_PATH +'/api/service/EmailService.js');
const AppConstants = require(APP_PATH +'/config/Constant.js');
const JwtService = require(APP_PATH + '/api/service/JwTokenService.js');



var UserObj = module.exports = {

     // Add new user********************************************************************
     AddUser(req , res ){
          var email = req.body.email;
          if(email){
               req.body.email = email.trim();
               console.log(email);
          }
          if (!req.body.name || !req.body.phone || !req.body.email || !req.body.password ||!req.body.city) {
               return res.json({resStatus:'error', msg :'Please fill all fields'});
          }

          UserModel.findOne({email:email}, function(err, data){
               if(data){
                    return res.json({resStatus : 'error', msg:'Email is already register'});
               }
               else {
                    let OTP = CommonService.generateOtp(6);
                    req.body.otp = OTP;
                    let data = {
                         subject:"OTP Recived",
                         description:'<p>Hello&nbsp;<b>'+req.body.name+"</b></p>"+ OTP +"&nbsp;This is your One Time Password(OTP).<br>Please verify your Account. <br><br>Thanks & Regards,<br>Admin."
                    }
                    UserModel(req.body).save(function(err ,result){
                         if(err){
                              console.log(err);
                              return res.json({resStatus:'error' , msg:'Not Save'});
                         }
                         else {
                              let mailOptions = {
                                   from: AppConstants.EMAIL,
                                   to: [req.body.email],
                                   subject: data.subject,
                                   html: data.description
                              }
                              EmailService.send(mailOptions,function(err, response){
                                   if(err) {
                                        console.log(err +"Email Not Sent");
                                   } else {
                                        console.log("Email Sent Succesfully");
                                   }
                              });
                              return res.json({resStatus:'success' , msg:'OTP code Sent on your Email' ,data :result});
                         }
                    });
               }
          })
     },

     // check Otp is matched or not
     confirmOtp: function (req, res) {
          let otp = req.body.otp;
          let reqId = req.body.id;
          console.log(otp);
          console.log(reqId);
          UserModel.findOneAndUpdate({ "_id" : reqId, "otp" : otp},{$set:{'varification':true , opt: null}},{new:true},
          function (err, resData) {
               if(err) {
                    console.log(err);
                    return res.json({resStatus:'error', msg :"some error try again"});
               }
               if(resData == null) {
                    return res.json({resStatus:'error', msg :'INVALID_OTP'});
               }
               else {

                    return res.json({resStatus:'success', msg :'Account Created', result: resData});
               }
          });
     },



     //login user

     login(req , res){
          //console.log(email)
          var email = req.body.email;
          var password = req.body.password;

          req.body.platform = req.body.platform || 'WEB';
          req.body.deviceToken = req.body.deviceToken || '';

          UserModel.findOne({'email' : email }, function(err, data){
               if(err){
                    return res.json({resStatus : 'error', msg:'some error occure'});
               }
               else {
                    //console.log(data);
                    if(!data){
                         return res.json({resStatus:'success' , msg:'Some error try again', data: data});
                    }
                    if(data.varification == false){
                         return res.json({resStatus:'success' , msg:'Account Not Verifiy', data: data});
                    }
                    else if (data.varification == true) {
                         //console.log(data)
                         UserModelMethods.comparePassword(password, data, function(err, valid) {
                              if (err) {
                                   return res.json({
                                             status:'error',
                                             msg : 'Invalid Password'
                                   });
                              }

                              if (!valid) {
                                   return res.json({
                                             status:'error',
                                             msg : "Invalid Username or Password"
                                   });
                              } else {
                                   return res.json({
                                             status:'success',
                                             msg : "You have successfully logged In",
                                              token: JwtService.issueToken(
                                                                  data._id,
                                                                  req.body.platform,
                                                                  req.body.deviceToken),
                                             result : data._id
                                   });
                              }
                         });
                    }

               }
          });

     },

     // Delete user
     deleteUser(req , res ){
          var _id = req.body.id;
          UserModel.findByIdAndRemove(_id, function(err, data){
               if(err){
                    return res.json({resStatus : 'error', msg:'some error occure'});
               }
               else {
                    return res.json({resStatus:'success' ,data:data , msg:'Delete  successfully'});
               }
          });

     },




     // Get All Users ******************************************************************

     AllUser(req , res ){
          //console.log("hello");
          UserModel.find({}).sort({name: 1}).limit(100).exec(function(err,result){
               if(err){
                    //console.log(err);
                    return res.json({resStatus:'error',msg:"Some error Try again"});
               }
               else{
                    return res.json({resStatus:'success',data :result });
               }
          })
     },

     //Get single user Detail ***********************************************************
     GetSingleUser(req , res){
          var id = req.params.id ;
          //console.log(id);return
          UserModel.findOne({_id:id},function(err,result){
               if(err){
                    return res.json({resStatus:'error',msg:"Some error Try again"});
               }
               else{
                    if(result){
                         const cDate = result.createdDate.toDateString();
                         result.createdDate = cDate;
                         console.log(cDate);
                         return res.json({resStatus:'success',data :result });

                    }


               }
          })
     },

     //update user ***********************************************************
     updateUser(req , res){
          var _id = req.params.id ;
          //console.log(id);return
          UserModel.findOneAndUpdate({_id:_id},{$set:req.body} ,function(err,result){
               if(err){
                    return res.json({resStatus:'error',msg:"Some error Try again"});
               }
               else{
                    return res.json({resStatus:'success', msg:"user info Updated", data :result });
               }
          })
     },

// uploading file

uploading(req ,res){

     console.log(req.body); return;


},

  // use to logout the user

  logout : function (req, res)  {
       return res.json({status:'success', msg : 'USER LOGOUT' });
  }
}
