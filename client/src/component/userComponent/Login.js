import React , { Component } from 'react';
import {Button ,  form , FormControl } from 'react-bootstrap';
import request  from 'superagent';
import {  browserHistory  } from 'react-router'
//import { LinkContainer } from 'react-router-bootstrap';

class Login extends Component{
     constructor(props) {
          super(props);

          this.state={
               email: " ",
               password:" ",
               token:"",
          };

          this.updateLoginState = this.updateLoginState.bind(this);
          this.Userlogin = this.Userlogin.bind(this);

     }


     updateLoginState(event){
          const target=event.target;
          const name=target.name;
          const value=target.value;
          this.setState({
               [name]:value
          })
     }

     Userlogin(event){

          event.preventDefault();
          //console.log(this.state);

          request
          .post('http://localhost:3001/users/login')
          .send({email: this.state.email, password: this.state.password})
          .accept('application/json')
          .end(function(err , res){
               if(err) {
                    alert(res.body.msg);
                    }
               if(res.body.msg === "Account Not Verifiy"){
                     alert(res.body.msg);
                     //localStorage.setItem('react_user', JSON.stringify(res.body.data));
                     browserHistory.replace("/VerifyAccount/"+res.body.data._id);
                   }
               else {
                    if(res.body.msg === "You have successfully logged In"){
                          alert(res.body.msg);
                         localStorage.setItem('react_user',JSON.stringify(res.body));
                         this.setState(res.body);
                         // console.log(this.state);
                          //console.log(a);
                          browserHistory.replace("/users");
                           }
                    else{
                         alert(res.body.msg);
                         }
                    }
          }.bind(this))
          }

     render() {
          return(

               <form className="col-ex-8" onSubmit={this.Userlogin} >
                    <h1>Login Form</h1>
                    <label>Email:
                    <FormControl type="text"   onChange={this.updateLoginState} name="email" />
                    </label><br></br>
                    <label>Password:
                    <FormControl type="password"  onChange={this.updateLoginState} name="password" />
                    </label><br></br>
                    <Button className="btn btn-primary" type="submit">Submit</Button>
               </form>


          );
     }
}

export default Login ;
