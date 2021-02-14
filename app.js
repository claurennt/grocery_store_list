const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + '/public'));

//start list of ingredients
let ingredients = ["olio", "sale", "pepe"];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

//render date and initial list of ingredients when we make an app.get request to the root route
app.get("/", function(req, res) {

  //gets the date of today
  let dateOfToday = new Date();

  //date render options
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  //date of today as string with local format
  let today = dateOfToday.toLocaleDateString("it-IT", options);

  //renders .ejs file and the the respective key value paths
  res.render("list", {
    dayOfTheWeek: today,
    newIngredientsAdded: ingredients
  });
})

/*when we make a post request we add the added ingredient to the end of the ingredients
array and then redirects back to the root route and can render the new item added*/
app.post("/", function(req, res) {
  let newIngredient = req.body.newIngredient;
  ingredients.push(newIngredient);

  res.redirect("/");

});

app.listen(process.env.PORT, 3000, () => console.log('Example app listening on port 3000!'));
