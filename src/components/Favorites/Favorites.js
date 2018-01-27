import React, { Component } from "react";
import { Panel } from "react-bootstrap";

class Favorites extends Component {

  state = {
    recipes: []
  };

  render() {

      return(
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <strong><i className="fa fa-star"></i>  Favorite Recipes</strong>
                  <span id="cart-total"></span>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                {this.state.recipes.map( element => (<p> </p>))}
              </Panel.Body>
            </Panel>);
  }
}

export default Favorites;