import React, { Component } from "react";
import { Panel, Button } from "react-bootstrap";

// const customStyle = {
// 	"background-color": "#20315A",
// 	color: "white",
// 	"text-align": "center",
// 	"margin-top": "20px"
// };

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
                  <Button bsStyle="default"> Hide </Button>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
              
              </Panel.Body>
            </Panel>);
  }
}

export default Cart;