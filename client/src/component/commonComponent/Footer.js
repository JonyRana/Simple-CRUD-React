import React ,{ Component } from 'react';
// import {navbar } from 'react-bootstrap';

class Footer extends Component {
     render(){
          const parag = {
               marginLeft: 480
          }
          return(
               <div className="navbar  navbar-inverse navbar-bottom">
                              <div className="container">
                         <div className="navbar-text pull=left">
                              <p style={parag}>  VisheshTanwar© company 2017.</p>
                         </div>
                    </div>
               </div>
          )}
     }

     export default Footer;
