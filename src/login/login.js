import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import styles from './style';
import './googleButton.css'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import github from './github.png'
const firebase = require("firebase");

class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
          email: null,
          password: null,
          useruid: null,
          serverError: false
        };
      }

      render() {

        const { classes } = this.props;
    
        return (
          <main className={classes.main}>
            <CssBaseline/>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                Log In!
              </Typography>
              <form onSubmit={(e) => this.submitLogin(e)} className={classes.form}>
                <FormControl required fullWidth margin='normal'>
                  <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
                  <Input autoComplete='email' autoFocus onChange={(e) => this.userTyping('email', e)} id='login-email-input'></Input>
                </FormControl>
                <FormControl required fullWidth margin='normal'>
                  <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
                  <Input autoComplete="current-password" type="password" onChange={(e) => this.userTyping('password', e)} id='login-password-input'></Input>
                </FormControl>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Log In</Button>
              </form>
              <h6 className="alternative-signup">or sign in with</h6>
                <hr/>
                <form onSubmit={(e) => this.googleSignin(e)}>
                  <div className="google-div">
                    <button type="submit" className="google-button">
                        <span className="google-button__icon">
                        <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>
                        </span>
                        <span className="google-button__text">Sign in with Google</span>
                    </button>
                  </div>
                </form>
                <p>or</p>
                    <form onSubmit={(e) => this.anonSignin(e)}>
                        <Button variant='contained' color='grey' type="submit" style={{marginBottom: 10 + 'px'}}>Sign in anonymously</Button>
                    </form>
                    <p style={{textAlign: 'center', fontSize: 10 + 'px', color: 'red'}}><i>Signing in anonymously is simply to test the service and will not save your data!</i></p>
              { this.state.serverError ? 
                <Typography className={classes.errorText} component='h5' variant='h6'>
                  Incorrect Login Information
                </Typography> :
                null
              }
              <h5 className={classes.noAccountHeader}>Don't Have An Account?</h5>
              <Link className={classes.signUpLink} to='/'>Sign Up!</Link>
            </Paper>
            <h6 style={{textAlign: 'center', fontWeight: 400, marginTop: 8 + 'px'}}><img src={github} height="20" width="20" style={{marginTop: 1 + 'px'}}/>This is an open source project.<a href="https://www.github.com/liam212/react-notes"> Check it out!</a></h6>
              <h6 style={{textAlign: 'center', fontWeight: 200, marginTop: 4 + 'px'}}>Designed and built by Liam Stout ©2019</h6>
          </main>
        );
      }
    

    userTyping = (whichInput, event) => {
        this.setState({ [whichInput]: event.target.value });
      }

    submitLogin = async (e) => {
      e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          return (
            <Redirect to={{ pathname: '/notes'}} />
          )
        }, err => {
          this.setState({ serverError: true });
          console.log('Error logging in: ', err);
        });
    };
    

    googleSignin = (e) => {
      e.preventDefault()
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      firebase.auth().signInWithPopup(provider).then(result => {
        return (
          <Redirect to={{ pathname: '/notes'}} />
        )
      }, error => {
          this.setState({ signupError: error });
      });
  }
  anonSignin = (e) => {
    e.preventDefault()
    firebase.auth().signInAnonymously().then(result => {
        this.props.history.push('/notes')
    }, error => {
        this.setState({ signupError: error });
    });
}

}
export default withStyles(styles)(LoginComponent);