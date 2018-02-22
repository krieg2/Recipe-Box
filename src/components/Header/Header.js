import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Navbar, Nav, NavItem,
         Row, Col, Clearfix } from "react-bootstrap";

const customStyle = {
  fontFamily: "Arial, Helvetica, sans-serif",
  backgroundColor: "#20315A",
  color: "white",
  textAlign: "center",
  marginTop: "80px",
  opacity: 0.85
};

const linkStyle = {
  textDecoration: "none",
  color: "#777"
};

const Header = (props) => 
  (<div>
    <Row>
      <Navbar style={{opacity: 0.75, textAlign: "center"}} fixedTop={true}>
        <Nav bsStyle="tabs" justified>
          <NavItem eventKey={1}>
            <Link to="/" style={linkStyle}>Home / Search</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="/favorites" style={linkStyle}>Favorites</Link>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to="/cart" style={linkStyle}>Cart</Link>
          </NavItem>
          {props.signedin ?
            <NavItem eventKey={4} onClick={() => props.fb.auth().signOut()}>
              Logout
            </NavItem>          
          :
            <NavItem eventKey={4}>
              <Link to="/login" style={linkStyle}>Login</Link>
            </NavItem>
          }
        </Nav>
      </Navbar>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        <Clearfix visibleXsBlock>
          <Row style={{minHeight: "150px"}}>
          </Row>
        </Clearfix>
        <Jumbotron style={customStyle}>
          <h1><i className="fa fa-list-alt"></i>  Recipe Box</h1>
        </Jumbotron>
      </Col>
    </Row>
   </div>
  );

export default Header;