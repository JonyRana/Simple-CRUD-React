import React ,{ Component } from 'react';
import {Navbar , NavItem ,Nav } from 'react-bootstrap';
// import { Router, Route, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, browserHistory} from 'react-router';
import logo from '../../assets/logo.svg';


class  Navigation extends Component {
     constructor(props){
          super(props);
          this.logout = this.logout.bind(this);
     }


       logout(){
          localStorage.removeItem('react_user');
          this.setState({
               isLogin: false
          })
          this.forceUpdate();
          //console.log(this.state.isLogin+"logouttttttttttttttt");
          browserHistory.replace('/login');

     }

     render() {
          let navState = this.props.loginStatus === 'loggedIn' ?
               <Nav pullRight>
                    <NavItem onClick={this.logout}>Logout</NavItem>
               </Nav>
               :
               <div>
               <Nav pullRight>
                    <LinkContainer to="/login">
                         <NavItem>Login</NavItem>
                    </LinkContainer>
               </Nav>
               <Nav pullRight>
                    <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                    </LinkContainer>
               </Nav>
               </div>
               ;
               //console.log(navState);
          return (
               <div>
                    <Navbar inverse>
                         <Navbar.Header>
                              <Navbar.Brand>
                                   <Link to="/">
                                        <img src={logo}  alt="logo" />
                                   </Link>

                              </Navbar.Brand>
                              <Navbar.Toggle />
                         </Navbar.Header>
                         <Navbar.Collapse>
                              <Nav>

                                   <LinkContainer to="/home">
                                        <NavItem>Home</NavItem>
                                   </LinkContainer>
                                   <LinkContainer to="/about">
                                        <NavItem>About</NavItem>
                                   </LinkContainer>:
                                   <LinkContainer to="/users">
                                        <NavItem>Users</NavItem>
                                   </LinkContainer>
                              </Nav>

                              {navState}
                         </Navbar.Collapse>
                    </Navbar>
                    <div className="content">
                         
                         {this.props.children}
                    </div>
               </div>
          )
     }

}
export default Navigation ;
