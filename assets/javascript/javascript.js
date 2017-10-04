var config = {
apiKey: "AIzaSyCZV0Z65ENjbB4eYBkBxwa6fg6chRH3iec",
authDomain: "testproject-df5f0.firebaseapp.com",
databaseURL: "https://testproject-df5f0.firebaseio.com",
projectId: "testproject-df5f0",
storageBucket: "testproject-df5f0.appspot.com",
messagingSenderId: "815993396775"
};
firebase.initializeApp(config);

var database = firebase.database();

var searchURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query="
var apiKey = "rnhXAWLOK1mshe92gRq8upcR4GQap1kYjhnjsnG92yzGgZRARJ";
var recipesTitles = [];


function searchRecipes(URL, APIkey, CALLBACK){ //ajax function for search recipes 
	$.ajax({
      url: URL,
      method: "GET",
      headers: {	
      	"X-Mashape-Key": APIkey,
		"Accept": "application/json"
		}
    }).done(CALLBACK);
}

function searchRecipesCallback(response){ //this is the callback function for the ajax search recipes 
	console.log(response);
	// put stuff to firebase
	// TODO - we should delete the object from the previous search and put in the new one. 
	database.ref("search").set({
		response
	})

	// going to get the title from each result and console log it 
	for(i=0; i<response.results.length; i++){
		//console.log(response.results[i].title);
		recipesTitles.push(response.results[i].title);
	}
	
}

function submitSearch(event){ //this is the function for the submit button on the search form
	// hide search form 
	// display results under the recipes panal 
	event.preventDefault();
	var SearchQueryParameter = $("#ingredient-text").val().trim();
	var cuisine = $("#cuisine-text").val().trim();
	var searchQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + SearchQueryParameter; 

	searchRecipes(searchQueryURL, apiKey, searchRecipesCallback);
	console.log(recipesTitles);
}

$("#submit").on("click", submitSearch);



// Walmart API search.
function productSearch(event){

	event.preventDefault();
	var searchQueryParameter = $("#").val().trim();

	var searchQueryURL = "http://api.walmartlabs.com/v1/search?" +
	                     "apiKey=z5m92qf29tv7u76f4vaztra4" +
	                     "&query=" + searchQueryParameter; 

	$.ajax({
      url: searchQueryURL,
      method: "GET"
    }).done(function(response){
    	//
    });
}








