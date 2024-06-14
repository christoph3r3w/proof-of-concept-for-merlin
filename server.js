import express, { json } from "express";
import fetchJson from "./helpers/fetch-json.js"

const app = express();

// main HTML files and the public files
app.set("views", "./views");
app.use(express.static("./public/"));

// ejs
app.set("view engine", "ejs");

// dont know what this does
app.use(express.urlencoded({ extended: true }));

// merlin book of potion api 
const apiUrl = "https://potion-api-jet.vercel.app/";

// all ingridients endpoint
const IngrUrl = `${apiUrl}ingredients`;
const potionsUrl = `${apiUrl}potions`;

// level archive
let archive = app.locals.storage = [];

// new postions storage
let collection = app.locals.storage = [] ;

// page refresh counter
var bodycounter = app.locals.visitCounter = 0;

// sort function
function sortArray(arr) {
	return arr.map(Number).sort((a, b) => a - b); 
  }
// no duplication function (set)
  function getUniqueValues(array) {
    return [...new Set(array)];
}


// homepage 
app.get("/", (req, res) => {
	Promise.all([
		fetchJson(IngrUrl),
		fetchJson(potionsUrl),
	])
		.then(([ingredientsData, potionsData]) => {
			res.render("index.ejs", { ingredients : ingredientsData, potions : potionsData });
			

			console.log("home success",	bodycounter	);
		})
		.catch(err => alert("home failed"));
});


// first brew
app.get("/brew", (req, res) => {
	Promise.all([
		fetchJson(IngrUrl),
		fetchJson(potionsUrl),
	])
		.then(([ingredientsData, potionsData]) => {
			res.render("brew", { ingredients : ingredientsData, potions : potionsData });
			bodycounter = bodycounter > 0 ? 0 : bodycounter;
			archive.length = 0;
			collection;
			console.log("page1 success" ,`bodycounter ${bodycounter}`);
		})
		.catch(err => alert("home failed"));
})

// nasty brew
app.get("/brew/bad-brew", (req, res) => {
	Promise.all([
		fetchJson(IngrUrl),
		fetchJson(potionsUrl),
	])
		.then(([ingredientsData, potionsData]) => {
			res.render("bad-brew", { ingredients : ingredientsData, potions : potionsData });
			bodycounter = bodycounter > 0 ? 0 : bodycounter;
			archive.length = 0;
			collection;
			console.log("page1 success" ,`bodycounter ${bodycounter}`);
		})
		.catch(err => alert("home failed"));
})



// brewing - post route  
app.post("/brew",(req,res) =>{
	Promise.all([
		fetchJson(IngrUrl),
		fetchJson(potionsUrl),
		fetchJson(potionsUrl)

	])
	.then(([ingredientsData,potionsData,PData]) => {

	let ingredients = req.body;
	let matchFound = false;
    let PotionId = null;

	let ingredient = Object.values(ingredients).map(Number);
	// console.log('req body',ingredient,'array',Array.isArray(ingredient));
	// console.log(potionsData[2],Array.isArray(potionsData));
	
	if (!Array.isArray(ingredient)) {
		return res.status(400).send('nop');
		}

	
	  	// console.log(PData.ingredients);
	
	    for( let i = 0; i < PData.length ;i++){
		if(JSON.stringify(sortArray(ingredient)) === JSON.stringify(sortArray(PData[i].ingredients))){
			matchFound = true;
			archive.push(PotionId = PData[i].id);

			console.log('--------------------------------------------------------------------------------');
			console.log(PData[i].name,PData[i].id,`archive content ${archive}`, `archive match `, JSON.stringify(sortArray(archive.map(Number))) === JSON.stringify([2,3,4]) );
			}

			} 

			let view = './partials/bad-brew';
			// let view = 'index';
			let lives = 3;
	if (matchFound) {
		// level 1
		let previousView = view;

		if (bodycounter === 0) {
			collection = getUniqueValues(archive); // Ensure collection is updated
			if (JSON.stringify(sortArray(archive.map(Number))) === JSON.stringify([2, 3, 4])) {
				view = 'brew2';
				bodycounter++;
				lives = 3
				archive.length = 0;
				console.log("level 1 cleared");
			} else if (archive.length < 3 ) {
				view = 'brew';
				collection = getUniqueValues(archive); // Ensure collection is updated
				console.log('next one');
			} else if (archive.length == 3 && collection.length == 1 || archive.length == 3 && collection.length == 2) {
				view = 'index';
				console.log("you're going to fail the first year wizard school ");
			} else if (lives == 3) {
				lives--;
				view = 'brew';
			}
		}
		// level 2
		else if (bodycounter === 1) {
			collection = getUniqueValues(archive); 

			if (JSON.stringify(sortArray(archive.map(Number))) === JSON.stringify([5, 6, 7])) {
				view = 'brew3';
				bodycounter++;
				lives++
				archive.length = 0;
				console.log("level 2 cleared");
			} else if (archive.length < 3) {
				view = 'brew2';
				collection = getUniqueValues(archive); 
				console.log('next one');
			} else if (archive.length >= 3 && collection.length == 1 || archive.length >= 3 && collection.length == 2) {
				view = 'index';
				console.log("you're parents are going to be really disapointed");
			} else{
				lives--;
				view = 'brew2'
				
			}
		}
		// level 3
		else if (bodycounter === 2) {
			collection = getUniqueValues(archive); 
			if (JSON.stringify(sortArray(archive.map(Number))) === JSON.stringify([8, 9, 10, 11, 12]) && archive.length == 3) {
				view = 'brew4';
				bodycounter++;
				archive.length = 0;
				console.log("level 3 cleared");
			} else if (archive.length < 3) {
				view = 'brew3';
				collection = getUniqueValues(archive); 
				console.log('next one');
			} else if (archive.length == 3 && collection.length == 1 || archive.length == 3 && collection.length == 2) {
				view = 'index';
				console.log("you are not a hary, wizard. and you owe 300k in debt ");
			} else{
				lives--;
				view = 'brew3'
				
			}

		}
	} else if(matchFound == false) {
		view = view;
		archive.length = 0;
		bodycounter = 0;
		collection = getUniqueValues(archive); 
		console.log('collection', collection, 'no match');
	}

	// Logs
		console.log(ingredient, `is there a match: ${matchFound}`, `bodycounter ${bodycounter}`);
		console.log(`archive content =  ${archive} sorted = ${sortArray(archive)}`, `arrayLength = ${archive.length}`);
		console.log("you still have" ,lives, "lives");
	// New potions storage
		console.log('collection inventory:', collection, 'and inventory length:', collection.length);
		collection = getUniqueValues(archive);

		res.render(view, { potionsId: PotionId, ingredients: ingredientsData, potions: potionsData });
		
	})
})
	  
			





// app.post('/brew/1', function(req,res){
// 	fetchJson(potionsUrl).then((potions) => {

// 	})
// })








// ports //
app.set("port", process.env.PORT || 8777);

app.listen(app.get("port"), function(){
	console.log(`Test link ${app.get("port")}`);
	console.log("Server listening on port " + '👉 ' + `http://localhost:${app.get("port")}`+ ' 👈');
});