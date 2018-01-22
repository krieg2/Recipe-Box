import React, { Component } from "react";
import Results from "../Results";
import API from "../../utils/API";
import { Panel, FormGroup, Button,
         ControlLabel, FormControl,
         Radio, Form } from "react-bootstrap";

const requiredStyle = {
    color: "red"
};

class Search extends Component {

  state = {
    searchText: "",
    results: [],
    baseURL: ""
  };

  handleSubmit = (event) => {

    event.preventDefault();

    API.searchRecipes(this.state.searchText)
    .then( searchResults => {
      //console.log(searchResults);
      //console.log(searchResults.data.results);
      this.setState({
        results: searchResults.data.results,
        baseURL: searchResults.data.baseUri
      })
    });

    return;
  };

  handleChange = (event) => {

    event.preventDefault();

    this.setState({searchText: event.target.value});

    return;
  };

  render(){

    return(
      (this.state.results.length > 0) ?
        <Results baseURL={this.state.baseURL} recipes={this.state.results}/>
      :
        <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            <strong><i className="fa fa-search"></i>  Search for Recipe</strong>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <form>
            <FormGroup controlId="searchForm">
              <ControlLabel>Ingredient</ControlLabel>
              <span style={requiredStyle}>*</span>
              <FormControl
                componentClass="input"
                type="text"
                placeholder="Enter text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="searchForm">
              <ControlLabel>Cuisine</ControlLabel>
                <FormControl
                  componentClass="select"
                  type="text"
                >
                  <option value="none">Select a Cuisine</option>
                  <option value= "african">African</option>
                  <option value = "chinese"> Chinese </option>
                  <option value = "japanese"> Japanese </option>
                  <option value = "korean"> Korean </option>
                  <option value = "vietnamese"> Vietnamese </option>
                  <option value = "thai"> Thai </option>
                  <option value = "indian"> Indian </option>
                  <option value = "british"> British </option>
                  <option value = "irish"> Irish </option>
                  <option value = "french"> French </option>
                  <option value = "italian"> Italian </option>
                  <option value = "mexican"> Mexican </option>
                  <option value = "spanish"> Spanish </option>
                  <option value = "middle eastern"> Middle Eastern </option>
                  <option value = "jewish"> Jewish </option>
                  <option value = "american"> American </option>
                  <option value = "cajun"> Cajun </option>
                  <option value = "southern"> Southern </option>
                  <option value = "greek"> Greek </option>
                  <option value = "german"> German </option>
                  <option value = "nordic"> Nordic </option>
                  <option value = "eastern european"> Eastern European </option>
                  <option value = "caribbean"> Caribbean </option>
                  <option value = "latin american"> Latin American </option>
                </FormControl>
                <FormGroup>
                  <ControlLabel>Additional Filters</ControlLabel>
                  <Radio name="radioGroup" value="breakfast"> Breakfast</Radio>
                  <Radio name="radioGroup" value="lunch"> Lunch</Radio>
                  <Radio name="radioGroup" value="dinner"> Dinner</Radio>
                  <Radio name="radioGroup" value="side dish"> Side Dish</Radio>
                  <Radio name="radioGroup" value="appetizer"> Appetizer</Radio>
                  <Radio name="radioGroup" value="salad"> Salad</Radio>
                </FormGroup>
              </FormGroup>
              <br/>
              <Button onClick={this.handleSubmit} bsStyle="default" type="submit"><i className="fa fa-search"></i> Submit</Button>
            </form>
        </Panel.Body>
      </Panel>);
  }
}

export default Search;