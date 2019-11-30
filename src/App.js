import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Notes from './pages/notes/notes';
import SignUp from './pages/authPages/signup/signup';
import LogIn from './pages/authPages/login/login';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/notes" component={(props) => <Notes {...props}/>} />
          <Route exact path="/" component={(props) => <SignUp {...props}/>} />
          <Route exact path="/login" component={(props) => <LogIn {...props}/>} />
        </div>
      </Router>
    )
  }  

}

export default App;
