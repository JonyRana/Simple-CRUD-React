/* *********************
Author:Vishesh Tanwar
Module: User model
Description: use for User Imfo
************************/

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 let ObjectId = Schema.ObjectId;

let bcrypt=require('bcrypt-nodejs');
SALT_WORK_FACTOR = 10;

 var userSchema = new Schema({

      name: {type : String},
      email:{type : String},
      phone: {type : Number},
      password: {type : String},
      otp: { type:String, default : " ", },
      varification: { type: Boolean, default:false},
      city:  {type:String},
      createdDate: { type: Date, default: Date.now },
      lastModify: { type: Date, default: Date.now },
      status: { type: String, default: true }
},{
      timestamps: true
});


/** function to run before UserModel data save */
userSchema.pre('save', function(next) {
     var user = this;

     // only hash the password if it has been modified (or is new)
     if (!user.isModified('password')) return next();

     // generate a salt
     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);

          // hash the password using our new salt
          bcrypt.hash(user.password, salt, null,function(err, hash) {
               if (err) return next(err);

               // override the cleartext password with the hashed one
               user.password = hash;
                    console.log(user.password+"hlooooooooooooooooooooooooo");
               next();
          });
     });
});

/** function to run before UserModel data update */
userSchema.pre('beforeUpdate',function(values, next) {
     bcrypt.genSalt(10, function(err, salt) {
          if (err) return next(err);
          if (values.password) {
               //code
               bcrypt.hash(values.password, salt, function(err, hash) {
                    if (err) return next(err);
                    values.password = hash;
                    next();
               });
          }
          else{
               next();

          }

     });
})

/** Check if password match */
userSchema.methods.comparePassword = function(password, user, cb) {
     console.log(user.password+"password Compare");
     bcrypt.compare(password, user.password, function(err, match) {
          if (err) cb(err);
          if (match) {
               cb(null, true);
          } else {
               cb(err);
          }
     });
};


var User = mongoose.model('User', userSchema);
module.exports = User;
