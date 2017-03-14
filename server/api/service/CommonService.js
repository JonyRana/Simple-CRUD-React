/*
Author :- Vishesh Tanwar
Purpose :- Common Service used to provide utility methods
*/

var serviceObj = module.exports = {
     generateOtp : function (num) {
          let text = "";
          let possible = "0123456789";
          for( let i = 0; i < num; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
     }
}
