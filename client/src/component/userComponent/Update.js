import React , {Component} from 'react';
import {button,  form} from 'react-bootstrap';
import request from 'superagent';
import {  browserHistory  } from 'react-router'

class Update extends Component {
     constructor(props){
          super(props);
          this.state={
               name:  " ",
               email: " " ,
               phone: " " ,
               city:  " ",
               password: " "
          }
          this.getUser = this.getUser.bind(this);
          this.saveChange= this.saveChange.bind(this);
          this.updateState= this.updateState.bind(this);
          this.getUser();
     }

     // get single user info
     getUser(){

          const id = this.props.params.id;


          //alert(id);
          request
          .get("http://127.0.0.1:3001/users/singleUser/"+id)
          .end(function(err , res){
               if(err) throw err;
               else{
                    this.setState(res.body.data);
                    //alert(this.state.name);
               }
          }.bind(this))
     }

     updateState(event) {
          event.preventDefault();
          const target = event.target;
          const value = target.value;
          const name = target.name;
          this.setState({
               [name]: value
          });
     }

     // save the Changes
     saveChange(event){
          event.preventDefault();
          console.log(this.state);
          const id = this.props.params.id;
          request
          .post('http://127.0.0.1:3001/users/update/'+id)
          .send({name: this.state.name , email:this.state.email,phone:this.state.phone,city:this.state.city,password:this.state.password})
          .accept('application/json')
          .end(function(err, res){
               if(err) throw err;
               else {
                    if(res.body.msg !== "user info Updated"){
                         alert(res.body.msg);
                    }
                    else{
                         browserHistory.replace("/users")
                    }
               }
          });
     }

     render(){
          return(
               <div className="container">
                    <h2>Edit User Information</h2>

                    <form onSubmit={this.saveChange}>
                         <div className="form-group">
                              <label>Email:</label>
                              <input type="email" className="form-control" value={this.state.email} readOnly placeholder="Enter Email" name="email" />
                         </div>
                         <div className="form-group">
                              <label>Name:</label>
                              <input type="text" className="form-control" value={this.state.name} onChange={this.updateState} placeholder="Enter name" name="name" />
                         </div>

                         <div className="form-group">
                              <label>Phone:</label>
                              <input type="text" className="form-control"value={this.state.phone}
                                   onChange={this.updateState} placeholder="Enter Phone" name="phone" />
                         </div>
                         <div className="form-group">
                              <label>City:</label>
                              <input type="text" className="form-control" value={this.state.city} onChange={this.updateState} placeholder="Enter City" name="city" />
                         </div>

                         <button type="submit" className="btn btn-default">Save Changes</button>
                    </form>


               </div>
          )
     }

}
export default Update;
