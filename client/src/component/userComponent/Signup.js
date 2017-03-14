import React , { Component } from 'react';
import {  browserHistory  } from 'react-router';
import {Button ,  form , FormControl } from 'react-bootstrap';
import request  from 'superagent';


class Signup extends Component {
     constructor(props) {
          super(props);
          this.state= {
               name:  " ",
               email: " " ,
               phone: " " ,
               city:  " ",
               password: " ",

          };
          this.updateState = this.updateState.bind(this);
          this.getComponent = this.getComponent.bind(this);
     }
     // Get the change value of form and update the state
     updateState(event) {
          const target = event.target;
          const value = target.value;
          const name = target.name;
          this.setState({
               [name]: value
          });
     }
     // save the form data
     getComponent(event) {
          event.preventDefault();
          console.log(this.state);

          request
          .post('http://127.0.0.1:3001/users/addUser')
          .send({name: this.state.name , email:this.state.email,phone:this.state.phone,city:this.state.city,password:this.state.password})
          .accept('application/json')
          .end(function(err, res){
               if(err) throw err;
               else {
                    if(res.body.msg !== "OTP code Sent on your Email"){
                         alert(res.body.msg);
                    }
                    else{
                         alert(res.body.msg);
                         browserHistory.replace("/VerifyAccount/"+res.body.data._id)
                         //self.setState({ r: res.body.message });
                    }
               }
          });
     }


     render() {
          return(
               <form className="col-ex-8" onSubmit={this.getComponent}>
                    <h1>Registration Form</h1>

                    <label>
                         Name:
                         <FormControl type="text"  onChange={this.updateState} name="name" />
                    </label><br></br>
                    <label>
                         Email:
                         <FormControl type="text" value={this.state.email}  onChange={this.updateState}name="email" />
                    </label><br></br>
                    <label>
                         Phone:
                         <FormControl type="text" value={this.state.phone}  onChange={this.updateState}name="phone" />
                    </label><br></br>
                    <label>
                         City:
                         <FormControl type="text" value={this.state.city}  onChange={this.updateState}name="city" />
                    </label><br></br>
                    <label>
                         Password:
                         <FormControl type="password"   onChange={this.updateState}name="password" />
                    </label><br></br>

                    <Button className="btn btn-primary" type="submit">Submit</Button>

               </form>
          )
     }
}
export default Signup;
