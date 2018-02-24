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
      minWidth: "100px",
      padding: "5px"
    };

    const captionStyle = {
      position: "absolute",
      bottom: "0px",
      lineHeight: "16px",
      fontSize: "16px",
      textShadow: "3px 3px 10px #000000, -3px -2px 5px #000000"
    };

    const priceStyle = {
      position: "absolute",
      bottom: "8px"
    }

    return(<Carousel style={carouselStyle} interval={null}>
           {this.state.items.map( element => {
             return(<Carousel.Item key={element.name}
                     style={{cursor: "pointer"}}
                     onClick={() => this.props.addToCart(element.name,
                                                         element.salePrice,
                                                         element.thumbnailImage)}
                    >
                      <img width={200} height={200} alt="200x200" src={element.thumbnailImage} />
                      <Carousel.Caption>
                        <h2 style={captionStyle}>{element.name}</h2>
                      </Carousel.Caption>
                      <div style={priceStyle}>${element.salePrice}</div>
                    </Carousel.Item>
             )}
           )}
           </Carousel>
    );
  }
}

export default CarouselBuilder;