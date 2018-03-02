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
      marginBottom: "5px",
      textAlign: "center",
      border: "1px solid #ddd",
      borderRadius: "10px",
      overflow: "hidden"
    };

    const captionStyle = {
      position: "absolute",
      bottom: "0px",
      lineHeight: "14px",
      fontSize: "14px",
      textShadow: "3px 3px 10px black, -3px -2px 5px black"
    };

    const priceStyle = {
      backgroundColor: "white",
      fontSize: "14px",
      borderRadius: "10px",
      padding: "2px",
      position: "absolute",
      top: "2px",
      left: "4px"
    }

    const imageStyle = {
      border: "1px solid #ddd",
      borderRadius: "10px"
    };

    return(<Carousel style={carouselStyle} interval={null}>
           {this.state.items.map( element => {
             return(<Carousel.Item
                     key={element.name}
                     style={{cursor: "pointer"}}
                     onClick={() => this.props.addToCart(element.name,
                                                         element.salePrice,
                                                         element.thumbnailImage)}
                    >
                    
                      <img width={300} height={300} alt="300x300"
                           src={element.thumbnailImage}
                           style={imageStyle}
                      />
                      
                      <Carousel.Caption>
                        <h2 style={captionStyle}>{element.name}</h2>
                      </Carousel.Caption>
                      <div style={priceStyle}>${element.salePrice.toFixed(2)}</div>
                    </Carousel.Item>
             )}
           )}
           </Carousel>
    );
  }
}

export default CarouselBuilder;