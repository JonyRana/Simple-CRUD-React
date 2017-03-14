import React, {Component} from 'react';
import { Router, Route,  browserHistory, IndexRoute  } from 'react-router';

import App from '././././component/commonComponent/App';
import Slider from  '././././component/commonComponent/Slider';
import Signup from '././././component/userComponent/Signup';
import NoMatch from '././././component/commonComponent/NoMatch';
import Update from '././././component/userComponent/Update';
import Login from '././././component/userComponent/Login';
import About from '././././component/userComponent/About';
//import Logout from '././././component/userComponent/Logout';
//import Home from './Home';
import Users from './Users';
import Upload from './Upload';
import VerifyAccount from '././././component/userComponent/VerifyAccount';
import '././css/index.css';

const checkAuth = (nextState,replace)=>{
     let user = JSON.parse(localStorage.getItem('react_user'));
     if(!user){
          replace('/login');
     }

}

class Rout extends Component {

     render(){
          return(
               <Router history={browserHistory}>
                    <Route path="/" component={App}>
                         <IndexRoute component={Slider} />
                         <Route path="/home"  component={Slider} />
                         <Route path="/about" component={About} onEnter={checkAuth}/>
                         <Route path="/about/:id" component={About} onEnter={checkAuth} />
                         <Route path="/users" component={Users} onEnter={checkAuth} />
                         <Route path="/login" component={Login} />
                         <Route path="/signup" component={Signup} />
                         <Route path="/VerifyAccount/:id" component={VerifyAccount} />
                         <Route path="/update/:id" component={Update} />
                         <Route path="/upload" component={Upload} />
                         <Route path="*" component={NoMatch}/>
                    </Route>
               </Router>
          );
     }

}

export default Rout;
