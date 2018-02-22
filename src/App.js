import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Row, Col } from 'react-bootstrap';
import Header from "./components/Header";
import Search from "./components/Search";
import Results from "./components/Results";
import Cart from "./components/Cart";
import Ingredients from "./components/Ingredients";
import Favorites from "./components/Favorites";
import NoMatch from "./components/NoMatch";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./style.css";
import './App.css';

const config = {
  apiKey: "AIzaSyBoy2uC2ia1GYNEnaQNWwzl7FREjj6khDM",
  authDomain: "recipe-box-2002e.firebaseapp.com",
  databaseURL: "https://recipe-box-2002e.firebaseio.com",
  projectId: "recipe-box-2002e",
  storageBucket: "recipe-box-2002e.appspot.com",
  messagingSenderId: "523811496905"
};

const uiConfig = {
  signInFlow: 'popup',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccess: () => false
  },
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      signedIn: false // Local signed-in state.
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        console.log("mounted user:"+user.uid);
        this.setState({signedIn: !!user})
      }
    );
  }

  render() {
    return (
      <Grid fluid={true}>
        <Header fb={firebase}/>
        <Router basename="/Recipe-Box">
          <Row>
            <Col xs={12} md={12}>
                <Switch>
                  <Route exact path="/" component={Search} />
                  <Route exact path="/results" component={Results} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/favorites" render={(props) => <Favorites fb={firebase} {...props} />} />
                  <Route exact path="/recipe" render={(props) => <Ingredients fb={firebase} {...props} />} />
                  <Route exact path="/login" render={(props) => <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} {...props}/>} />
                  <Route component={NoMatch} />
                </Switch>
            </Col>
          </Row>
        </Router>
      </Grid>
    );
  }
}

export default App;
