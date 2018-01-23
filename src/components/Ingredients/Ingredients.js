import React, { Component } from "react";
import { Panel, Button, Well } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../../utils/API";
const queryString = require("query-string");

class Ingredients extends Component {

  state = {
    items: [],
    instructions: ""
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    console.log("params: " + JSON.stringify(params));
    API.getRecipe(params.id)
      .then( res => {
        console.log(res);
        this.setState({
          items: res.data[0].extendedIngredients,
          instructions: res.data[0].instructions
        });
      })
      .catch( err => console.log(err));
  }

  render() {

      const buttonStyle = {
        float: "right",
        margin: "5px",
        position: "absolute",
        top: "0px",
        right: "15px"
      };

      return(
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <strong><i className="fa fa-list-alt"></i>  Ingredients</strong>
                  <span id="cart-total"></span>
                  <Link to="/"><Button bsSize="small" bsStyle="default" style={buttonStyle}>Back</Button></Link>
                </Panel.Title>
                <div>
                  <i id="star" className="fa fa-star-o" aria-hidden="true">  Favorite</i>
                </div>
              </Panel.Heading>
              <Panel.Body>
                {this.state.items.map( element => {
                  return (<Well key={element.name}>
                    <i className="fa fa-circle-o" aria-hidden="true" style={{"marginRight": "5px"}}></i>
                    {element.name}
                  </Well>);
                })}
                <br/><h3><strong>Recipe: </strong></h3><br/><p>{this.state.instructions}</p>
              </Panel.Body>
            </Panel>);
  }
}

export default Ingredients;