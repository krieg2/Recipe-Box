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
      favorites: [],
      cart: [],
      signedIn: false // Local signed-in state.
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {

        if(user){
          this.populateFavorites();
          this.populateCart();
        } else{
          this.setState({
            favorites: [],
            cart: []
          });
        }
        this.setState({signedIn: !!user});
      }
    );
  }

  populateFavorites = () => {

    let userId = firebase.auth().currentUser.uid;
    let dbRef = firebase.database().ref('/users/'+userId+'/favorites');

    dbRef.on('value', (snapshot) => {

      let val = snapshot.val();
      let favorites = [];
      for(const recipeId in val) {

        if(val.hasOwnProperty(recipeId)) {
          favorites.push(val[recipeId]);
        }
      }

      this.setState({favorites: favorites});
    });  
  };

  populateCart = () => {

    let userId = firebase.auth().currentUser.uid;
    let dbRef = firebase.database().ref('/users/'+userId+'/cart');

    dbRef.on('value', (snapshot) => {

      let val = snapshot.val();
      let items = [];
      for(const itemId in val) {

        if(val.hasOwnProperty(itemId)) {
          let item = val[itemId];
          item.id = itemId;
          items.push(item);
        }
      }

      this.setState({cart: items});
    });  
  };

  checkIsFavorite = (recipeId) => {

    let found = this.state.favorites.find((e) => e.recipeId === recipeId) ? true : false;

    return found;
  };

  render() {
    return (
      <Grid fluid={true}>
        <Router basename="/Recipe-Box">
          <Row>
            <Col xs={12} md={12}>
              <Header fb={firebase} signedin={this.state.signedIn}
                      favorites={this.state.favorites.length}
                      cart={this.state.cart.length} />
            </Col>
            <Col xs={12} md={12}>
              <Switch>
                <Route exact path="/" component={Search} />
                <Route exact path="/results" component={Results} />
                <Route exact path="/cart" render={(props) => <Cart fb={firebase} items={this.state.cart} {...props} />} />
                <Route exact path="/favorites" render={(props) => <Favorites fb={firebase} favorites={this.state.favorites} {...props} />} />
                <Route exact path="/recipe" render={(props) => <Ingredients fb={firebase} checkIsFavorite={this.checkIsFavorite} {...props} />} />
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
