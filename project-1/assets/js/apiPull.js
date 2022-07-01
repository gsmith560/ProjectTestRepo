console.log(sumOfScores);
var highestNum = 0;
var topMatch = "";
var tieMatch;
var matchedGenre;
var matchedDrinkLink;
// sumOfScores.happy = 0;
// sumOfScores.sad = 0;
// sumOfScores.scared = 2;
// sumOfScores.indifferent = 0;
var movieFinal;
var currentMovie;
var happyMovies = [
    "Deadpool",
    "21 Jump Street",
    "BridesMaids",
    "Pineapple Express",
    "Jumanji The Next Level",
    "Shazam!",
    "Django",
    "Let's Be Cops",
    "Baby Driver",
    "Deadpool 2",
    "Mean Girls",
    "Zoolander",
    "Wedding Crashers",
    "Men In Black",
    "Kingsman The Secrete Service"
]
var sadMovies = [
    
    "Five Feet Apart",
    "Lion",
    "Titanic",
    "The Notebook",
    "Good Will Hunting",
    "The Fault In Our Stars",
    "The Last Song",
    "Seven Pounds",
    "Charlie St. Cloud",
    "Room",
    "Remember Me",
    "The Boy in the Striped Pajamas"
];
var pgMovies = [
    "Moana",
    "Aladdin",
    "Hotel Transylvania",
    "Kung Fu Panda",
    "The Aristocats",
    "Tangled",
    "Charlie and the Chocolate Factory",
    "Shark Tale",
    "The Greatest Showman",
    "Lorax",
    "How To Train Your Dragon",
    "Shrek",
    "Coco",
    "Puss in Boots",
    "Scooby-Doo"
]
var randomMovies = [
    "The Shawshank Redemption",
    "The Dark Knight",
    "Pulp Fiction",
    "Fight Club",
    "Inception",
    "The Matrix",
    "Terminator 2: Judgment Day",
    "Parasite",
    "Casa blanca",
    "Rear Window",
    "The Dark Knight Rises",
    "Avengers: Endgame",
    "Die Hard",
    "Hereditary",
    "Midsommar"

]

// function to generate a random numeric value
function randomNumber(min, max) {
    var value = Math.floor(Math.random() * (max - min) + min);

    return value;
};
//Function to find top match
function findTopMatches(){
    // Find which category scored the most points
    if(highestNum < sumOfScores.happy){
        highestNum = sumOfScores.happy;
        topMatch = "happy";
        matchedGenre = happyMovies;
        matchedDrinkLink = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka"; 
        console.log("our new highNum is "  + highestNum + " and it was for category " + topMatch);
    }
    if(highestNum < sumOfScores.sad){
        highestNum = sumOfScores.sad;
        topMatch = "sad";
        matchedGenre = sadMovies;
        matchedDrinkLink = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Wine";
        console.log("our new highNum is "  + highestNum + "and it was for category " + topMatch);
    }
    if(highestNum < sumOfScores.scared){
        highestNum = sumOfScores.scared;
        topMatch = "scared";
        matchedGenre = pgMovies;
        matchedDrinkLink = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
        console.log("our new highNum is "  + highestNum + "and it was for category " + topMatch);
    }
    if(highestNum < sumOfScores.indifferent){

            highestNum = sumOfScores.indifferent;
            topMatch = "indifferent";
            matchedGenre = randomMovies;
            matchedDrinkLink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
            console.log("our new highNum is "  + highestNum + "and it was for category " + topMatch);
    }
console.log(topMatch);
    //check for ties
    if(topMatch != "happy" && highestNum == sumOfScores.happy){
        tieMatch = "happy";
        console.log("we have a match! Your tie is " + tieMatch);
    }
    if(topMatch != "sad" && highestNum == sumOfScores.sad){
        tieMatch = "sad";
        console.log("we have a match! Your tie is " + tieMatch);
    }
    if(topMatch != "scared" && highestNum == sumOfScores.scared){
        tieMatch = "scared";
        console.log("we have a match! Your tie is " + tieMatch);
    }
    if(topMatch != "indifferent" && highestNum == sumOfScores.indifferent){
        tieMatch = "indifferent";
        console.log("we have a match! Your tie is " + tieMatch);
    }
    return topMatch;

}

function findMovie(){
findTopMatches();

    //Evaluating our results
    switch (topMatch) {
        case "happy":
            var randomMovieIndex = randomNumber(0, happyMovies.length-1);
            var movieTitleSplit = happyMovies[randomMovieIndex].split(" ");
            movieFinal = movieTitleSplit.join('+');
            break;
        case "sad":
            var randomMovieIndex = randomNumber(0, sadMovies.length-1);
            var movieTitleSplit = sadMovies[randomMovieIndex].split(" ");
            movieFinal = movieTitleSplit.join('+');
            break;
        case "scared":
            var randomMovieIndex = randomNumber(0, pgMovies.length-1);
            console.log(randomMovieIndex);
            var movieTitleSplit = pgMovies[randomMovieIndex].split(" ");
            movieFinal = movieTitleSplit.join('+');
            break;
        case "indifferent":
            console.log("In indifferent case statement")
            var randomMovieIndex = randomNumber(0, randomMovies.length-1);
            console.log(randomMovieIndex);
            var movieTitleSplit = randomMovies[randomMovieIndex].split(" ");
            movieFinal = movieTitleSplit.join('+');
            break;
    }
    console.log("Took movie from: " + randomMovieIndex)
    getFilms();
    getDrink(matchedDrinkLink, topMatch);
}
console.log(movieFinal);



function getFilms(){
var apiKey = "95278f49";
 var ombdUrl = "http://www.omdbapi.com/?apikey="+ apiKey +"&t=" + movieFinal;
    fetch(ombdUrl)
        .then(function(response){
            if(response.ok){
                response.json()
                    .then(function(data){
                        currentMovie = data;
                    })
            }
        })

}

function printToScreen(drink){
    console.log(drink);
    var watchSectionEl = document.querySelector("#what-to-watch");
    var resultsTextEl = document.querySelector("#results-text");
    var resultTitle = document.createElement("h2");
    resultTitle.classList = "title text-movie";
    resultTitle.textContent = "You got the " + topMatch + " category!";
    
    var resultExcerptEl = document.createElement("p");
    resultExcerptEl.classList = "text-movie movie-red-back rounded m-3 p-1 has-text-centered";
    if(topMatch === "happy"){
        resultExcerptEl.textContent = "You enjoy being on your toes and ready for the day! Uplifting and exciting content really speaks to you. See what movie and drink combo you should enjoy below!";
    }
    else if(topMatch === "sad"){
        resultExcerptEl.textContent = "You tend to ponder things quite often. Deep thinking and getting lost in emotion ad empathy describe your perfect friday night. See what movie and drink combo you should enjoy below!";
    }
    else if(topMatch === "scared"){
        resultExcerptEl.textContent = "You love to take the safe, clear path. No risks, just an easy road to the finish. PG movies seem to be the best fit for you, and maybe we can stick to the Non-Alcoholic beverages... See what movie and drink combo you should enjoy below!";
    }
    else if( topMatch === "indifferent"){
        resultExcerptEl.textContent = "You don't seem to really care about this quiz, let alone what type of movies you want. You always just go with the flow and hope to get something out of it. Whatever results you want, as long as it's given to you. If you want to see your results, just look below I guess.."
    }
   
    resultsTextEl.appendChild(resultTitle);
    resultsTextEl.appendChild(resultExcerptEl);

    var ulResultSectionEl = document.querySelector("#results");
    var listMovieItemEl = document.createElement("li");
    var movieBlockSection = document.createElement("div");
    var listDrinkItemEl = document.createElement("li");
    var drinkBlockSection = document.createElement("div");
    generateMovieEls(movieBlockSection);
    generateDrinkEls(drinkBlockSection, drink);
    listMovieItemEl.appendChild(movieBlockSection);
    listDrinkItemEl.appendChild(drinkBlockSection);
    ulResultSectionEl.appendChild(listMovieItemEl);
    ulResultSectionEl.appendChild(listDrinkItemEl);
    


}
// function to generate movie elements
function generateMovieEls(movieBlockSection){
    // Create the contents of our movie li element
    
    movieBlockSection.classList = "columns";

    var moviePoster = document.createElement("img");

    var movieInfoDiv = document.createElement("div");
    movieInfoDiv.classList = "column is-outlined";

    var movieTitle = document.createElement("h2");
    var moviePlot = document.createElement("p");
    moviePoster.className = "column is-half";
    moviePoster.src = currentMovie.Poster;
    movieTitle.textContent = currentMovie.Title + "(" + currentMovie.Year + ")";
    movieTitle.classList = "text-movie title";
    moviePlot.textContent = currentMovie.Plot;
    moviePlot.classList = "text-movie is-size-6";

    movieInfoDiv.appendChild(movieTitle);
    movieInfoDiv.appendChild(moviePlot);


    movieBlockSection.appendChild(moviePoster);
    movieBlockSection.appendChild(movieInfoDiv);
}

// Function to generate the paired drink
function generateDrinkEls(drinkBlockSection,drink){
    console.log(drink.drinks[0]);
    drinkBlockSection.classList = "columns"
    
    var drinkImg = document.createElement("img");
    drinkImg.classList = "column is-half"
    drinkImg.src = drink.drinks[0].strDrinkThumb;

    var drinkInfoDiv = document.createElement("div");
    drinkInfoDiv.classList = "column";
    
    var drinkName = document.createElement("h2");
    var drinkInstructions = document.createElement("p");
    drinkName.classList = "title";
    drinkName.textContent = drink.drinks[0].strDrink;

    drinkInstructions.classList = "is-size-6";
    drinkInstructions.textContent ="Ingredients: " + drink.drinks[0].strIngredient1 + "," + drink.drinks[0].strIngredient2 + "," + drink.drinks[0].strIngredient3 + ".    " +  drink.drinks[0].strInstructions;

    drinkInfoDiv.appendChild(drinkName);
    drinkInfoDiv.appendChild(drinkInstructions);

    drinkBlockSection.appendChild(drinkImg);
    drinkBlockSection.appendChild(drinkInfoDiv);

}
function fetchDrinkById(drinkId){
    console.log("in fetch drink function");
    var cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
    fetch(cocktailUrl)
    .then(function(response){
        if(response.ok){
            response.json()
                .then(function(data){
                    // console.log( data);
                    printToScreen(data);
                    
                })
        }
    })
}
function getDrinkData(drink){
    console.log("in getDrinkData function")
    if(topMatch != "indifferent"){
        console.log("in happy sad if statement")
        var randomIndex = randomNumber(0, drink.drinks.length - 1);
        var chosenDrink = drink.drinks[randomIndex];
        console.log(chosenDrink);

        fetchDrinkById(chosenDrink.idDrink);

        

    }
    else if(topMatch === "indifferent"){
        printToScreen(drink);
    }

}
function getDrink(cocktailUrl){
    

    fetch(cocktailUrl)
        .then(function(response){
            if(response.ok){
                response.json()
                    .then(function(data){
                        console.log(data);
                        getDrinkData(data);
                    })
            }
        })

}


var pageContentEl = document.querySelector("#page-content");



// pageContentEl.addEventListener("click", resultButtonHandler);

// getFilms();
// getDrink();
