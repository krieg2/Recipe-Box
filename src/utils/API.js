import axios from "axios";

export default {
  searchRecipes: function(ingredientString) {

  	let url = "https://thawing-headland-90979.herokuapp.com/api/recipes/search?&number=100";
  	let queries = "&query=" + ingredientString;
    url = url + queries;

  	console.log(url);
    return axios.get(url);
  }
};