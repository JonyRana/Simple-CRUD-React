import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import request  from 'superagent';
import '../../css/VerifyAccount.css';

class VerifyAccount extends Component {
          constructor(props){
               super(props);
               this.state={
                   otp:""
              };
          this.getOTP= this.getOTP.bind(this);
          this.saveOTP= this.saveOTP.bind(this);
     }

     getOTP(event){
          this.setState({otp:event.target.value});
     }

     saveOTP(event){
          event.preventDefault();
          const id = this.props.params.id;
          //alert(this.state.otp);
          request
          .post('http://127.0.0.1:3001/users/confirm')
          .send({id:id ,otp:this.state.otp})
          .accept('Application/json')
          .end(function(err, res){
               if(err){
                     alert(res.body.msg);
               }
               else{
                    if(res.body.msg === "INVALID_OTP")
                    {
                         alert(res.body.msg);
                     }
                  else{
                    alert(res.body.msg);
                    browserHistory.replace('/login');
                     }

               }
          })
     }
     render(){
          return (
               <div className="container">
               <form className="form-horizontal" role="form" onSubmit={this.saveOTP}>
               <h2>Enter Your OTP</h2>
               <div className="form-group">
               <label className="col-sm-3 control-label"></label>
               <div className="col-sm-6">
               <input type="text" id="firstName"  onChange={this.getOTP} placeholder="Enter OTP" className="form-control" name="otp" />
               <span className="help-block"></span>
               </div>
               </div>
               <div className="form-group">
               <div className="col-sm-6 col-sm-offset-3">
               <button type="submit" className="btn btn-primary btn-block">Save</button>
               </div>
               </div>
               </form>
               </div>
          )
     }
}
export default VerifyAccount;
