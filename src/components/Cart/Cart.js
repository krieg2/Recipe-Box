import React, { Component } from "react";
import { Panel } from "react-bootstrap";

class Cart extends Component {

  state = {
    items: [{}]
  };

  render() {

      return(
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <strong><i className="fa fa-shopping-cart"></i>  Shopping Cart   Total: </strong>
                  <span id="cart-total"></span>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
              
              </Panel.Body>
            </Panel>);
  }
}

export default Cart;