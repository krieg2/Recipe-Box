import axios from "axios";

export default {
  searchRecipes: function(ingredientString) {

  	let url = "https://thawing-headland-90979.herokuapp.com/api/recipes/search?&number=100";
  	let queries = "&query=" + ingredientString;
    url = url + queries;

    return axios.get(url);
  },
  getRecipe: function(recipeId) {

  	let url = "https://thawing-headland-90979.herokuapp.com/api/recipe/"+recipeId;

    return axios.get(url);
  }
};