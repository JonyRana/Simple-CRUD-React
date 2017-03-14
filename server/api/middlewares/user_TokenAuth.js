/*
* Author : vishesh
* Module : UserAuthToken
* Description : Use to authenticate User by using JWT
*/
const UserModel = require(APP_PATH + '/api/model/userModel.js');
let jwToken = require(APP_PATH + "/api/service/JwTokenService.js");
module.exports = function(req, res, next) {
     let token;
     if (req.headers && req.headers.authorization) {
          let parts = req.headers.authorization.split(' ');

          if (parts.length == 2) {
               var scheme = parts[0],
               credentials = parts[1];
               if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
               }
          } else {
               return res.status(403).json({status : "error", message: '400 Bad Request",'});

          }
     } else if (req.params.token) {
          token = req.params.token;

          delete req.query.token;
     } else {

          return res.status(400).json({status : "error", message: 'ACCESS DENIED !! You are not authorize to access this Resource'});

     }

     jwToken.verify(token, function(err, token) {

          if(token && token.auth) {
               UserModel.findOne({_id : token.auth}, {_id : 1}, function (err, resData) {
                    if(resData) {
                         req.token = token;
                         req.sessionId = resData._id;
                         next();
                    } else {
                         return res.status(401).json({status : "error", message:'Your session has been expired, please login.'});
                    }
               });
          } else {
               return res.status(401).json({status : "error", message: '400 Bad Request",'});
          }

     });
};
