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

var searchURL = "https://thawing-headland-90979.herokuapp.com/api/recipes/search?&number=100&query="
var recipesTitles = [];
var recipeImg=[];
var recipeIDArray=[];
var baseURI;
var timerId;
var recipeTitle;
var ingredientsList=[];
var ingredientNames=[];
var recipe;
var recipeID;
var currentImgURL;

var divsForPagination =[];

var cartTotal = 0;
var divLength = ($("#favorited-list").length);
var favoritesList = [];

//creates a container with food images for the user's favorited list from firebase
database.ref().on("value", function(snapshot) {
    $("#favorited-list").empty();
        snapshot.forEach(function(child) {
            child.forEach(function(grandchild) {
                var key = grandchild.val();
                var imgContainer = $('<div>');
                var imgDiv = $('<div>');
                var titleDiv = $('<div>');
                var imgTag = $('<img>');
                imgContainer.addClass("image-container");
                imgTag.attr("src", key.imgURL);
                imgTag.attr("width", 200);
                imgTag.addClass("img-fluid");
                imgDiv.append(imgTag);
                imgDiv.addClass("image-div");
                imgContainer.append(titleDiv);
                titleDiv.addClass("image-title");
                imgTag.attr("data-recipe-title", key.recipeTitle);
                titleDiv.text(key.recipeTitle);
                imgContainer.append(imgDiv);
                imgTag.attr("data-recipe-id", key.recipeID);
                imgDiv.append(imgTag);
                $("#favorited-list").append(imgContainer);

            });

        });
});



function ajax(URL, CALLBACK){ //ajax function for search recipes 

    $.ajax({
      url: URL,
      method: "GET",
      headers: {
         "Accept": "application/json"
      }
    }).done(CALLBACK);
}

function searchRecipesCallback(response){ //this is the callback function for the ajax search recipes
    // put stuff to firebase
    // TODO - we should delete the object from the previous search and put in the new one.

    baseURI = response.baseUri;
    recipesTitles = [];
    recipeImg=[];
    recipeIDArray=[];

    // going to get the title from each result and console log it



    for(i=0; i<response.results.length; i++){
        //console.log(response.results[i].title);
        recipesTitles.push(response.results[i].title);
        recipeImg.push(response.results[i].image);
        recipeIDArray.push(response.results[i].id);
    }

    if(response.results <1){
        $("#recipe-images").html("No results found.");
        $("#recipe-panel").removeClass("hidden");
    }
    appendTitleAndImages();
//breaks out the recipe images into multiple pages
    $('#pagination-container').pagination({
    dataSource: divsForPagination,
    callback: function(data, pagination) {
        // template method of yourself

        console.log(data);
        $("#recipe-images").empty();
        for(i=0; i<data.length;i++){
            var html = data[i].html();
            console.log(html);
            console.log(data[i]);
            var imgContainer = $("<div>");
            imgContainer.html(html);
            imgContainer.addClass("image-container");
            $("#recipe-images").append(imgContainer);

        }
    }
})

}

function submitSearch(event){ //this is the function for the submit button on the search form

    var SearchQueryParameter = $("#ingredient-text").val().trim();
    var cuisine = $("#cuisine-text").val().trim();
    var searchQueryURL = searchURL + SearchQueryParameter;
    var selectedRadioButton;


    if(SearchQueryParameter == ""){
        swal ( "Oops" ,  "Please enter an Ingredient!" ,  "error" );
    }

    else{

        // hide search form
        // display results under the recipes panal
        $("#ingredient-panel").addClass("hidden");
        $("#recipe-images").empty();
        $("#ingredients").empty();

        //console.log("emptied");
        event.preventDefault();



        //both the cuisine filter and checkboxes are populated
        if(!cuisine == "" && $('input[name=type]:checked').length > 0){
            selectedRadioButton = $('input[name=type]:checked').val();
            searchQueryURL = searchURL+ SearchQueryParameter +"&cuisine=" + cuisine +"&type="+ selectedRadioButton;
            //console.log(searchQueryURL);
        }
        // if just the cuisine filter is filled out
        else if(cuisine !== "none"){
            searchQueryURL = searchURL + SearchQueryParameter +"&cuisine=" + cuisine;

            //console.log(searchQueryURL);
        }
        // if just the checkbox filter is selected
        else if($('input[name=type]:checked').length > 0){
            selectedRadioButton = $('input[name=type]:checked').val();
            searchQueryURL = searchURL + SearchQueryParameter +"&type=" + selectedRadioButton;
            //console.log(searchQueryURL);
        }

        ajax(searchQueryURL, searchRecipesCallback);
        //console.log("searched");
    }

}

//creates a container with food images for the user's search
function appendTitleAndImages(){
    for(var i=0;i<recipesTitles.length;i++){
        var imgContainer = $('<div>');
        var imgDiv = $('<div>');
        var titleDiv = $('<div>');
        var imgTag = $('<img>');
        imgContainer.addClass("image-container");
        imgTag.attr("src", baseURI+recipeImg[i]);
        imgTag.attr("width", 200);
        imgTag.addClass("img-fluid");
        imgDiv.append(imgTag);
        imgDiv.addClass("image-div");
        imgContainer.append(titleDiv);
        titleDiv.addClass("image-title");
        imgTag.attr("data-recipe-title",recipesTitles[i]);
        titleDiv.text(recipesTitles[i]);
        imgContainer.append(imgDiv);
        imgTag.attr("data-recipe-id",recipeIDArray[i]);
        imgDiv.append(imgTag);

        divsForPagination.push(imgContainer);

    }

    $("#recipe-panel").removeClass("hidden");
}



function ingredientBackButton(){

    $("#recipe-panel").removeClass("hidden");
    $("#ingredient-panel").addClass("hidden");
    $("#ingredients").empty();

}


// on click for submit and ingredients
function cartHideButton(){

    if($("#cart-hide-button").text().trim() === "Hide"){
        $("#cart-hide-button").text(" Show ");
        $("#shopping-cart").hide();
    } else{
        $("#cart-hide-button").text(" Hide ");
        $("#shopping-cart").show();
    }

}

$('input').click(function(e){
    console.log(e);
    if (e.altKey) {
        $(this).prop('checked', false);
    }
});

$("#submit").on("click", submitSearch);

$("#ingredient-back-button").on("click", ingredientBackButton);

$("#cart-hide-button").on("click", cartHideButton);

// Walmart API search. Note: this search does not always work well.
function productSearch(ingredient, ingredientNum){

    var searchQueryURL = "https://thawing-headland-90979.herokuapp.com/api/product/search/"+ingredient;

    $.ajax({
      url: searchQueryURL,
      method: "GET"  
    }).done(function(response){

        //console.log(response);

        if(typeof response.items !== 'undefined'){
            for(var i=0; i<response.items.length; i++){

               var name = response.items[i].name;
               var imgUrl = response.items[i].thumbnailImage;
               var price = response.items[i].salePrice;
               if(typeof price === 'undefined'){
                   price = 0.0;
               }

               addItemToCarousel(ingredientNum, name, imgUrl, price);
            }
        }
    });
}

//Get recipe information.
function recipeIngredients(event){

    var s = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +
         "583672" + "/information";
    $.ajax({
      url: s,
      method: "GET",
      headers: {
          "X-Mashape-Key": apiKey,
        "Accept": "application/json"
        }
    }).done(function(response) {
        //console.log(response)
    });
}

//gets the information on recipe based on the images user click
$("#recipe-images").on("click","img",function(event){

    event.preventDefault();
    recipeID = $(this).attr("data-recipe-id");
    recipeTitle = $(this).attr("data-recipe-title");
    currentImgURL = $(this).attr('src');

    $.ajax({
      url: "https://thawing-headland-90979.herokuapp.com/api/recipe/"+recipeID,
      method: "GET"
    }).done(function(response) {

        //Store the ingredients in array.
        ingredientsList=[];
        ingredientNames=[];
        for(var i=0; i < response[0].extendedIngredients.length; i++){

            ingredientsList.push(response[0].extendedIngredients[i].originalString);
            ingredientNames.push(response[0].extendedIngredients[i].name);
        }

        //Add the ingredients to the page.
        $("#ingredients").empty();
        createIngredientList(ingredientsList);

        var limit = 5;
        var delay = 0;
        for(var i=0; i<ingredientNames.length; i++){

            var name = ingredientNames[i];

            delay += 500;

            timerId = setTimeout(productSearch, delay, name, i);
            $("#ingredient_"+i).append(createCarousel(i));
        }

        //Add the recipe to the page.
        recipe = response[0].instructions;
        var id = response[0].id;
        var recipeDiv = $("<div>");
        if(recipe === null){
            recipe = "";
        }
        recipeDiv.html("<br><h3><strong>Recipe: </h3></strong><br><p>"+recipe+"</p>");
        $("#ingredients").append(recipeDiv);
    });
})

//creates the recipe list html on the page
function createIngredientList(ingredientsList){

    $("#ingredients").append("<h2>"+recipeTitle+"</h2><br>");

    for(var i=0; i < ingredientsList.length; i++){

        ingredientDiv = $("<div class='well'>");
        ingredientDiv.append("<i class='fa fa-circle-o' aria-hidden='true'></i>");
        ingredientDiv.append(ingredientsList[i]);
        ingredientDiv.attr("id", "ingredient_"+i);

        $("#ingredients").append(ingredientDiv);
    }

    if(favoritesList.indexOf(recipeID) < 0) {
        $("#star").css({color: "white"});
        $("#star").removeClass();
        $("#star").addClass("fa fa-star-o");
    } else{
        $("#star").css({color: "gold"});
        $("#star").removeClass();
        $("#star").addClass("fa fa-star");
    }

    $("#recipe-panel").addClass("hidden");
    $("#ingredient-panel").removeClass("hidden");

}


function createCarousel(i){

    var id = "carousel_" + i;
    var outerDiv = $("<div class='carousel slide' data-ride='carousel' data-interval='false'>")
    outerDiv.attr("id", id);

    var oList = $("<ol class='carousel-indicators'>");
    outerDiv.append(oList);

    var innerDiv = $("<div class='carousel-inner'>");
    outerDiv.append(innerDiv);

    outerDiv.append("<a class='left carousel-control' href='#carousel_" + i +
        "' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left'>");
    outerDiv.append("<a class='right carousel-control' href='#carousel_" + i +
            "' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right'>");

    return outerDiv;
 }

function addItemToCarousel(cNum, caption, url, price){

    var id = "#carousel_" + cNum;
    var listIndex = $(id).children(".carousel-indicators").children().length;
    var active = "";
    if(listIndex === 0){
        active = "active";
    }
    $(id).children(".carousel-indicators").append("<li data-target='" + id +
                "' data-slide-to='"+listIndex+"' class='"+active+"'></li>");

    var item = $("<div class='item "+active+"'></div>");
    item.css("data-price", price);
    item.append("<span class='price'>$"+price+"</span>");
    item.append("<img class='carousel-image' src='"+url+"' alt=''>");
    var divCap = $("<div class='c-caption'></div>");
    divCap.append("<h2><strong>"+caption+"</strong></h2>");
    item.append(divCap);

    $(id).children(".carousel-inner").append(item);
}

function favoriteRecipeToFirebase(){

    database.ref(recipeID).push({
        recipeTitle: recipeTitle,
        ingredientsList: ingredientsList,
        recipe: recipe,
        recipeID: recipeID,
        imgURL: currentImgURL,
        timeStamp : firebase.database.ServerValue.TIMESTAMP
    });

}

function removeFromFirebase(recipeID){

    var rRef = firebase.database().ref(recipeID);
    rRef.remove()
      .then(function() {
        console.log("Remove of "+recipeID+" succeeded.")
      })
      .catch(function(error) {
        console.log("Remove of "+recipeID+" failed: " + error.message)
      });
}

$("#star").on("click", function(event){

    if(favoritesList.indexOf(recipeID) < 0) {
        favoriteRecipeToFirebase();
        $(this).css({color: "gold"});
        $(this).removeClass();
        $(this).addClass("fa fa-star");
    } else{
        removeFromFirebase(recipeID);

        var found = $("#favorited-list").find("img[data-recipe-id='"+recipeID+"']").length;
        if(found){
            $("#favorited-list").find("img[data-recipe-id='"+recipeID+"']").parent().parent().remove();
        }

        var idx = favoritesList.indexOf(recipeID);
        favoritesList = favoritesList.filter(function(element, index) { return index !== idx});
        $(this).css({color: "white"});
        $(this).removeClass();
        $(this).addClass("fa fa-star-o");
    }

});

$("#favorited").on("click", function(event) {

    event.preventDefault();
    $("#favorited-panel").removeClass("hidden");
});


$("#favorited-list").on("click","img",function(event){

    event.preventDefault();
    recipeID = $(this).attr("data-recipe-id");
    recipeTitle = $(this).attr("data-recipe-title");
    currentImgURL = $(this).attr('src');

    $.ajax({
      url: "https://thawing-headland-90979.herokuapp.com/api/recipe/"+recipeID,
      method: "GET"
    }).done(function(response) {

        //Store the ingredients in array.
        ingredientsList=[];
        ingredientNames=[];
        for(var i=0; i < response[0].extendedIngredients.length; i++){

            ingredientsList.push(response[0].extendedIngredients[i].originalString);
            ingredientNames.push(response[0].extendedIngredients[i].name);
        }

        //Add the ingredients to the page.
        $("#ingredients").empty();
        createIngredientList(ingredientsList);

        var limit = 5;
        var delay = 0;
        for(var i=0; i<ingredientNames.length; i++){

            var name = ingredientNames[i];

            delay += 500;

            timerId = setTimeout(productSearch, delay, name, i);
            $("#ingredient_"+i).append(createCarousel(i));
        }

        //Add the recipe to the page.
        recipe = response[0].instructions;
        recipeDiv = $("<div>");
        recipeDiv.html("<br><h3><strong>Recipe: </h3></strong><br><p>"+recipe+"</p>");
        $("#ingredients").append(recipeDiv);
        $("#favorited-panel").addClass("hidden");
    });
});

$("#ingredients").on("click","img",function(event){

    var shopImg = $(this).clone();
    shopImg.removeClass();

    var parent = $(this).parent();
    var price = parent.children(".price").text();
    var caption = parent.children(".c-caption").text();
    var innerDiv = $("<div>");
    innerDiv.addClass("caption");
    innerDiv.append("<h4 class='price'>"+price+"</h4>");
    innerDiv.append("<p>"+caption+"</p>");

    var cardDiv = $("<div>");
    cardDiv.addClass("thumbnail");
    cardDiv.append("<i class='fa fa-window-close-o' aria-hidden='true'></i>");
    cardDiv.append(shopImg);
    cardDiv.append(innerDiv);

    price = price.replace("$", "");
    var priceNum = parseFloat(price);
    cartTotal += priceNum;

    $("#cart-total").text("$"+cartTotal.toFixed(2));

    $("#shopping-cart").append(cardDiv);

    $("#shopping-panel").removeClass("hidden");

});

database.ref().on("value", function(snapshot) {

    console.log(snapshot.val());
    for(var key in snapshot.val()){
        if(favoritesList.indexOf(key) < 0){
            favoritesList.push(key);
        }
    }

});

$("#shopping-cart").on("click", "i", function(event){

    // Update the cart total.
    var price = $(this).parent().find(".price").text();
    price = price.replace("$", "");
    var priceNum = parseFloat(price);
    cartTotal -= priceNum;
    if(cartTotal <= 0.0){
        cartTotal = 0.0;
    }

    $("#cart-total").text("$"+cartTotal.toFixed(2));

    // Remove the item from the cart.
    $(this).parent().remove();

});
