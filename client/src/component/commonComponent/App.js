import React, { Component } from 'react';
import '../../css/App.css';
import Navigation from  './Navigation';
// import Footer from  './Footer';

//   <Footer></Footer>
class App extends Component {
  render() {
     var loginStatus = localStorage.getItem('react_user') ? "loggedIn" : "loggedOut";
    return (
      <div className="App">
     <div className="">
          <Navigation loginStatus={loginStatus}/>
          {this.props.children}
     </div>


      </div>
    );
  }
}

export default App;
