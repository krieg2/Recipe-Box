import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Row, Col } from 'react-bootstrap';
import Header from "./components/Header";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Ingredients from "./components/Ingredients";
import Favorites from "./components/Favorites";
import NoMatch from "./components/NoMatch";
import "./style.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Header />
          <br />
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Router>
              <Switch>
                <Route exact path="/" component={Search} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/recipe/:id" component={Ingredients} />
                <Route component={NoMatch} />
              </Switch>
            </Router>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
