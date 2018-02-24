import React from "react";
import { Link } from "react-router-dom";
import { Panel, Col, Thumbnail,
         Tooltip, OverlayTrigger } from "react-bootstrap";

const removeFavorite = (firebase, id) => {

  let userId = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/'+userId+'/favorites/'+id).remove()
  .catch((error) => {
    console.log(`Remove of item ${id} failed: ${error.message}`)
  });
};

const buttonStyle = {
  cursor: "pointer",
  position: "absolute",
  left: "20px",
  top: "5px"
};

const divStyle = {
  border: "1px solid #ddd",
  padding: "20px 20px 0 20px"
};

const tooltip = (<Tooltip id="tooltip">
    Remove
  </Tooltip>);

const Favorites = (props) => (
  <Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">
        <strong><i className="fa fa-star"></i>&nbsp;&nbsp;Favorite Recipes</strong>
        <span id="cart-total"></span>
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      {props.favorites.map( (element, index) => {
          return (<Col xs={3} md={3} key={index}>
            <div style={divStyle}>
              <OverlayTrigger placement="top" overlay={tooltip}>
                <i className="fa fa-window-close-o"
                   aria-hidden="true"
                   style={buttonStyle}
                   onClick={() => removeFavorite(props.fb, element.recipeId)}>
                </i>
              </OverlayTrigger>
              <Link to={"/recipe?id="+element.recipeId}>
                <Thumbnail style={{overflow: "hidden", cursor: "pointer"}} src={element.image}>
                  <p>{element.title}</p>
                </Thumbnail>
              </Link>
            </div>
          </Col>);
        })
      }
    </Panel.Body>
  </Panel>
);

export default Favorites;