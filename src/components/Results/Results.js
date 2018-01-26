import React, { Component } from "react";
import { Panel, Thumbnail, Row, Col, Button, ButtonGroup } from "react-bootstrap";
const baseURL = "/Recipe-Box";

class Results extends Component {

  state = {
    allRecipes: [{}],
    currentItems: [{}],
    pageSize: 8,
    totalPages: 0,
    currentPage: 1
  };

  componentWillMount() {
    // Initialize the recipe array.
    if (this.props.recipes && this.props.recipes.length > 0) {

      let total = Math.floor(this.props.recipes.length / this.state.pageSize);
      total += (this.props.recipes.length % this.state.pageSize > 0) ? 1 : 0;
      console.log("total pages:"+total);
      this.setState({
        allRecipes: this.props.recipes,
        currentItems: this.props.recipes.slice(0, this.state.pageSize),
        totalPages: total
      });
    }
  }

  setPage = (num) => {
    this.setState({
        currentPage: num,
        currentItems: this.state.allRecipes.slice((num - 1) * this.state.pageSize,
                                            num * this.state.pageSize)
    });
  };

  nextPage = () => {
    this.setState( (prevState) => {
      if(prevState.currentPage < this.state.totalPages){
        let nextPage = prevState.currentPage + 1;
        return {
          currentPage: nextPage,
          currentItems: prevState.allRecipes.slice(prevState.currentPage * this.state.pageSize,
                                                   nextPage * this.state.pageSize)
        };
      } else {
        return {
          currentPage: prevState.currentPage
        };
      }
    });
  };

  prevPage = () => {
    this.setState( (prevState) => {
      if(prevState.currentPage > 1){
        let prevPage = prevState.currentPage - 1;
        return {
          currentPage: prevPage,
          currentItems: prevState.allRecipes.slice((prevPage - 1) * this.state.pageSize,
                                                   prevPage * this.state.pageSize)
        };
      } else {
        return {
          currentPage: prevState.currentPage
        };
      }
    });
  };

  displayPageBtns = () => {

    let result = [];
    for(let i=1; i <= this.state.totalPages; i++){
      result.push(<Button onClick={ () => this.setPage(i) }
                   bsStyle="default"
                   disabled={(this.state.currentPage === i) ? true : false}
                   >{i}</Button>);
    }

    return(result)
  };

  displayRecipes = () => {

    let i = 0;
    let result = [];
    let recipes = this.state.currentItems;

    const customStyle = {
      overflow: "hidden",
      cursor: "pointer"
    };

    for(i=0; i < recipes.length &&
                 recipes.length - i >= 4; i += 4){

      result.push(<Row key={recipes[i].id}>
        <Col xs={3} md={3}>
          <Thumbnail style={customStyle} src={this.props.baseURL + recipes[i].image} href={baseURL+"/recipe?id="+recipes[i].id}>
            <p>{recipes[i].title}</p>
          </Thumbnail>
        </Col>
        <Col xs={3} md={3}>
          <Thumbnail style={customStyle} src={this.props.baseURL + recipes[i+1].image} href={baseURL+"/recipe?id="+recipes[i].id}>
            <p>{recipes[i+1].title}</p>
          </Thumbnail>
        </Col>
        <Col xs={3} md={3}>
          <Thumbnail style={customStyle} src={this.props.baseURL + recipes[i+2].image} href={baseURL+"/recipe?id="+recipes[i].id}>
            <p>{recipes[i+2].title}</p>
          </Thumbnail>
        </Col>
        <Col xs={3} md={3}>
          <Thumbnail style={customStyle} src={this.props.baseURL + recipes[i+3].image} href={baseURL+"/recipe?id="+recipes[i].id}>
            <p>{recipes[i+3].title}</p>
          </Thumbnail>
        </Col>
      </Row>);
    }

    if(i <= recipes.length-1){

      let remainingCols = recipes.slice(i).map( element => {
        return (<Col xs={3} md={3}>
                  <Thumbnail style={customStyle} src={this.props.baseURL + element.image} href={baseURL+"/recipe?id="+element.id}>
                    <p>{element.title}</p>
                  </Thumbnail>
                </Col>);
      });

      result.push(<Row key={recipes[i].id}>
                   {remainingCols}
                  </Row>);
    }

    return result;
  };

  render() {

      const buttonGrpStyle = {
        float: "right",
        marginBottom: "25px"
      };

      return(
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  <strong><i className="fa fa-cutlery"></i>  Recipes </strong>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Row>
                  <Col xs={12} md={12}>
                    <ButtonGroup bsSize="small" style={buttonGrpStyle}>
                      <Button onClick={this.prevPage} bsStyle="default">Previous Page</Button>
                      {this.displayPageBtns()}
                      <Button onClick={this.nextPage} bsStyle="default">Next Page</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                {this.displayRecipes()}
              </Panel.Body>
            </Panel>);
  }
}

export default Results;