import React from "react";
import { Panel, Col, Thumbnail,
         Tooltip, OverlayTrigger } from "react-bootstrap";

const removeFromCart = (firebase, id) => {

  let userId = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/'+userId+'/cart/'+id).remove()
  .catch((error) => {
    console.log(`Remove of item ${id} failed: ${error.message}`)
  });
};

const buttonStyle = {
  position: "absolute",
  top: "5px",
  right: "20px",
  cursor: "pointer"
};

const priceStyle = {
  position: "absolute",
  top: "10px",
  right: "30px"
};

const tooltip = (<Tooltip id="tooltip">
    Remove
  </Tooltip>);

const Cart = (props) => (
  <Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">
        <strong><i className="fa fa-shopping-cart"></i>&nbsp;&nbsp;Shopping Cart</strong>
        <span style={priceStyle}>Total:&nbsp;${props.total.toFixed(2)}</span>
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      {props.items.map( (element, index) => {
          return (<Col xs={3} md={3} key={index}>
            <Thumbnail style={{overflow: "hidden"}} src={element.image}>
              <OverlayTrigger placement="top" overlay={tooltip}>
                <i className="fa fa-window-close-o"
                   aria-hidden="true"
                   style={buttonStyle}
                   onClick={() => removeFromCart(props.fb, element.id)}>
                </i>
              </OverlayTrigger>
              <p>{element.name}</p>
              <p>${element.price}</p>
            </Thumbnail>
          </Col>);
        })
      }
    </Panel.Body>
  </Panel>
);

export default Cart;