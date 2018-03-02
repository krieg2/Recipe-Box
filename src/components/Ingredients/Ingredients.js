import React, { Component } from "react";
import { Panel, Button, Well, Image,
         Grid, Col, Row } from "react-bootstrap";
import CarouselBuidler from "../CarouselBuilder";
import API from "../../utils/API";
const queryString = require("query-string");

class Ingredients extends Component {

  state = {
    recipeId: '',
    image: '',
    title: '',
    isFavorite: false,
    items: [],
    instructions: ''
  };

  componentDidMount() {

    const params = queryString.parse(this.props.location.search);

    this.setState({recipeId: params.id});

    let isFavorite = this.props.checkIsFavorite(params.id);

    API.getRecipe(params.id)
    .then( res => {

      this.setState({
        items: res.data[0].extendedIngredients,
        instructions: res.data[0].instructions,
        image: res.data[0].image,
        title: res.data[0].title,
        isFavorite: isFavorite
      });
    })
    .catch( err => console.log(err));
  }

  addFavorite = () => {

    let recipeId = this.state.recipeId;
    let userId = this.props.fb.auth().currentUser.uid;

    this.props.fb.database().ref('/users/'+userId+'/favorites/'+recipeId).set({
      recipeId: recipeId,
      image: this.state.image,
      title: this.state.title,
      timeStamp : this.props.fb.database.ServerValue.TIMESTAMP
    });

    this.setState({isFavorite: true});
  };

  addToCart = (name, price, image) => {

    let userId = this.props.fb.auth().currentUser.uid;

    this.props.fb.database().ref('/users/'+userId+'/cart').push({
      name: name,
      price: price,
      image: image,
      timeStamp : this.props.fb.database.ServerValue.TIMESTAMP
    });
  };

  render() {

      const buttonStyle = {
        float: "right",
        margin: "5px",
        position: "absolute",
        top: "0px",
        right: "15px"
      };

      const wellStyle = {
        marginLeft: "10px",
        fontSize: "20px"
      };

      const imageStyle = {
        border: "2.5px solid grey"
      };

      const starStyle = {
        cursor: "pointer"
      };
      if(this.state.isFavorite){
        starStyle.color = "gold";
      } else{
        starStyle.color = "white";
      }

      let delay = 0;

      return(
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <strong><i className="fa fa-list-alt"></i>&nbsp;&nbsp;Ingredients</strong>
                  <h2 style={{textAlign: "center"}}>{this.state.title}</h2>
                  <Button onClick={this.props.history.goBack} bsSize="small" bsStyle="default" style={buttonStyle}>Back</Button>
                </Panel.Title>
                <div>
                  <i id="star" className={this.state.isFavorite ? 'fa fa-star' : 'fa fa-star-o'}
                     aria-hidden="true" onClick={this.addFavorite} style={starStyle}>&nbsp;&nbsp;Favorite</i>
                </div>
              </Panel.Heading>
              <Panel.Body>
              <Grid>
                <Row>
                  <Col xs={6}>
                  {this.state.items.map( element => {
                    delay += 250;
                    return (
                      <Row key={element.name}>
                        <Col xs={4}>
                          <CarouselBuidler ingredient={element.name} delay={delay} addToCart={this.addToCart} />
                        </Col>
                        <Col xs={8}>
                          <Well>
                            <i className="fa fa-circle-o" aria-hidden="true"></i>
                            <span style={wellStyle}>{element.name}</span>
                          </Well>
                        </Col>
                      </Row>);
                  })}
                  </Col>
                  <Col xs={6}>
                    <Image src={this.state.image} style={imageStyle} responsive rounded />
                    <h3><strong>Recipe: </strong></h3>
                    <p id="recipeInstructions">{this.state.instructions}</p>
                  </Col>
                </Row>
              </Grid>
              </Panel.Body>
            </Panel>);
  }
}

export default Ingredients;