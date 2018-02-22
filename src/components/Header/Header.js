import React from "react";
import { Jumbotron, Navbar, Nav, NavItem, Row, Col, Clearfix } from "react-bootstrap";

const customStyle = {
    fontFamily: "Arial, Helvetica, sans-serif",
    backgroundColor: "#20315A",
    color: "white",
    textAlign: "center",
    marginTop: "80px",
    opacity: 0.85
};

const Header = (props) =>
  <div>
    <Navbar style={{opacity: 0.75, textAlign: "center"}} fixedTop={true}>
      <Nav bsStyle="tabs" justified>
        <NavItem eventKey={1} href="/Recipe-Box/">
          Home / Search
        </NavItem>
        <NavItem eventKey={2} href="/Recipe-Box/favorites">
          Favorites
        </NavItem>
        <NavItem eventKey={3} href="/Recipe-Box/cart">
          Cart
        </NavItem>
        {props.fb.auth().currentUser ?
          <NavItem eventKey={4} onClick={() => props.fb.auth().signOut()}>
            Logout
          </NavItem>          
        :
          <NavItem eventKey={4} href="/Recipe-Box/login">
            Login
          </NavItem>
        }
      </Nav>
    </Navbar>
    <Row>
      <Col xs={12} md={12}>
        <Clearfix visibleXsBlock>
          <Row style={{minHeight: "100px"}}>
          </Row>
        </Clearfix>
        <Jumbotron style={customStyle}>
          <h1><i className="fa fa-list-alt"></i>  Recipe Box</h1>
        </Jumbotron>
      </Col>
    </Row>
  </div>;

export default Header;