import React, { Component } from "react";
import { Panel, Button } from "react-bootstrap";

// const customStyle = {
// 	"background-color": "#20315A",
// 	color: "white",
// 	"text-align": "center",
// 	"margin-top": "20px"
// };

class Ingredients extends Component {

  state = {
    items: [{}]
  };

  render() {

      return(
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <strong><i className="fa fa-list-alt"></i>  Ingredients</strong>
                  <span id="cart-total"></span>
                  <Button bsStyle="default"> Back </Button>
                </Panel.Title>
                <div>
                  <i id="star" className="fa fa-star-o" aria-hidden="true">  Favorite</i>
                </div>
              </Panel.Heading>
              <Panel.Body>
                {this.state.items.map( element => (<p> </p>))}
              </Panel.Body>
            </Panel>);
  }
}

export default Ingredients;