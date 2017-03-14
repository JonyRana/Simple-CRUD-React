import React, {Component} from 'react';
import request from 'superagent';
import {Link} from 'react-router'
import '../../css/profile.css';
import avatar from '../../assets/avatar2.png';




class About extends Component {
     constructor(props){
          super(props);
          this.state= { }

          this.getUser();


     }

     getUser(){
          var id = this.props.params.id;
          var ab = {}
          ab = localStorage.getItem('react_user');
          ab = JSON.parse(ab);
          if(!id){
                    id =ab.result;
               }




          request
          .get("http://127.0.0.1:3001/users/singleUser/"+id)
          .end(function(err , res){
               if(err) throw err;
               else{
                    this.setState(res.body.data);

                   }
          }.bind(this))
     }
      // style

     render() {
          var imgP = {
               width : 300,
               height : 300
          }
          return (
    <div className="container">
        <div className="row">
          <div className="col-md-5  toppad  pull-right col-md-offset-3 ">
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
               <div className="panel panel-info">
                    <div className="panel-heading">
                         <h3 className="panel-title">{this.state.name}</h3>
                    </div>
                    <div className="panel-body">
                    <div className="row">
                    <div className="col-md-3 col-lg-3 "> <img alt="User Pic" style={imgP} src={avatar} className="img-circle img-responsive"/> </div>
                    <div className=" col-md-9 col-lg-9 ">
                         <table className="table table-user-information">
                              <tbody>
                                   <tr>
                                        <td>User Status</td>
                                        {this.state.varification ? <td className="text-success">Verified<i className="glyphicon glyphicon-ok"></i></td> : <td className="text-danger">Not Verified<span className="glyphicon glyphicon-remove"></span></td>}
                                   </tr>
                                   <tr>
                                       <td>Department:</td>
                                       <td>Programming</td>
                                   </tr>
                                   <tr>
                                        <td>Address</td>
                                        <td>{this.state.city}</td>
                                   </tr>
                                   <tr>
                                        <td>Phone</td>
                                        <td>{this.state.phone}</td>
                                   </tr>
                                   <tr>
                                        <td>Email</td>
                                        <td>{this.state.email}</td>
                                   </tr>
                                   <tr>
                                        <td>Registration date:</td>
                                        <td>{this.state.createdDate}</td>
                                   </tr>
                              </tbody>
                         </table>
                         <Link className="btn btn-primary" to={"/update/"+ this.props.params.id}>Edit</Link>
               </div>
          </div>
     </div>
     <div className="panel-heading">
          <h1></h1>
     </div>
     </div>
     </div>
     </div>
</div>
          )
     }
}

export default About;
