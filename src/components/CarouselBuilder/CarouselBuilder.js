import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import API from "../../utils/API";

class CarouselBuilder extends Component {

  state = {
    items: []
  };

  componentWillMount() {

    setTimeout( (ingredient) => {

        API.getProducts(ingredient)
        .then( res => {

          if(typeof res.data.items !== 'undefined'){
            this.setState({
              items: res.data.items
            });
          }
        })
        .catch( err => console.log(err));

      }, this.props.delay, this.props.ingredient);
  }

  render() {

    const carouselStyle = {
      marginBottom: "10px",
      minWidth: "100px"
    };

    const captionStyle = {
      fontSize: "16px",
      textShadow: "3px 3px 10px #000000, -3px -2px 5px #000000"
    }

    return(<Carousel style={carouselStyle} interval={null}>
           {this.state.items.map( element => {
             return(<Carousel.Item key={element.name}>
                      <span>${element.salePrice}</span>
                      <img width={200} height={200} alt="200x200" src={element.thumbnailImage} />
                      <Carousel.Caption>
                        <h2 style={captionStyle}>{element.name}</h2>
                      </Carousel.Caption>
                    </Carousel.Item>
             )}
           )}
           </Carousel>
    );
  }
}

export default CarouselBuilder;