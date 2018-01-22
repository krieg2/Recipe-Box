import React from "react";
import { Jumbotron } from "react-bootstrap";

const customStyle = {
	backgroundColor: "#20315A",
	color: "white",
	textAlign: "center",
	marginTop: "20px"
};

const Header = () =>
  <Jumbotron style={customStyle}>
    <h1><strong><i className="fa fa-list-alt"></i>  Recipe Box</strong></h1>
  </Jumbotron>;

export default Header;