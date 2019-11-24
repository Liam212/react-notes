import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Notes from './notes/notes';
import Navbar from './navbar/navbar';
import SignUp from './signup/signup';
import LogIn from './login/login';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Route exact path="/notes" component={(props) => <Notes {...props}/>} />
          <Route exact path="/" component={(props) => <SignUp {...props}/>} />
          <Route exact path="/login" component={(props) => <LogIn {...props}/>} />
        </div>
      </Router>
    )
  }  

}

export default App;
