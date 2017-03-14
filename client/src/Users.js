import React from 'react';
import request from 'superagent';

import {Link} from 'react-router';

class Users extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               data: []
          };

          this.getUser = this.getUser.bind(this);
          // this.delete = this.delete.bind(this);
          this.getUser();
     }


     // Get  all user
     getUser() {
          let token = JSON.parse(localStorage.getItem('react_user')).token;
          console.log(token);
          request
          .get("http://127.0.0.1:3001/users/allUser")
          .set('Authorization','Bearer' + ' '+ token)
          .end(function(err , res){
               if(err) throw err;
               else{
                    this.setState({data:res.body.data});
                    // console.log(this.state.data);
               }
          }.bind(this))
     }
     //delete user
          request

     delete(item){
          request
          .post("http://127.0.0.1:3001/users/delete")
          .send({id:item._id})
          .accept("application/json")
          .end(function(err,res){
               if(err) throw err;
               else {
                    const newState = this.state.data;
                    if (newState.indexOf(item) > -1) {
                         newState.splice(newState.indexOf(item), 1);
                         this.setState({data: newState})
                    }
               }
          }.bind(this))

     }

     render() {
          var listItems = this.state.data.map((person , index) =>{
               return (

                    <tr key={person._id}>
                         <td>{index+1}</td>
                         <td>{person.name}</td>
                         <td>{person.email}</td>
                         <td>{person.phone}</td>
                         <td>{person.city}</td>
                         <td>


                              <Link className="btn btn-primary" to={"/about/"+ person._id}>Profile</Link>
                              &nbsp;&nbsp;
                              <button className="btn btn-danger"
                                   onClick={this.delete.bind(this, person)}>Delete
                              </button>
                         </td>

                    </tr>

               );
          });
          return (
               <div className="container table-responsive">
                    <h2>User List</h2>
                    <p>List of All the Register Users</p>
                    <table className="table table-striped table-bordered" >
                         <thead>
                              <tr>
                                   <td><b>Sr No</b></td>
                                   <td><b>Name</b></td>
                                   <td><b>Email</b></td>
                                   <td><b>Phone</b></td>
                                   <td><b>City</b></td>
                                   <td><b>Action</b></td>
                              </tr>
                         </thead>
                         <tbody>

                              {listItems}
                         </tbody>
                    </table>
               </div>
          )
     }
}

export default Users;
