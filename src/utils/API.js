import axios from "axios";

export default {
  searchRecipes: function(ingredientString, cuisine, type) {

  	let url = "https://thawing-headland-90979.herokuapp.com/api/recipes/search?&number=100";
  	let queries = "&query=" + ingredientString;

    if(cuisine){
      queries += "&cuisine=" + cuisine;
    }
    if(type){
      queries += "&type=" + type;
    }

    url = url + queries;

    return axios.get(url);
  },
  getRecipe: function(recipeId) {

  	let url = "https://thawing-headland-90979.herokuapp.com/api/recipe/"+recipeId;

    return axios.get(url);
  },
  getProducts: function(ingredient) {

    let url = "https://thawing-headland-90979.herokuapp.com/api/product/search/"+ingredient;

    return axios.get(url);
  }
};