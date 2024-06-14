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

// new postions storage

let archive = app.locals.storage = [];
// archive = sortArray(archive);

// page refresh counter
var bodycounter = app.locals.visitCounter = 0;

// sort function
function sortArray(arr) {
	return arr.map(Number).sort((a, b) => a - b); 
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
			archive.length = 0
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
			let view = 'brew/nasty-potion';
			if(matchFound){
				// level  1
				if( matchFound == true && bodycounter == 0 && JSON.stringify(sortArray(archive.map(Number))) === JSON.stringify([2,3,4])){ 
					view = 'brew2';
					bodycounter++;
					archive.length = 0 ;
					console.log("level 1 cleared");
				}else if(matchFound == true && bodycounter == 0 && archive.length < 3){
					view = 'brew';
					console.log('next one');			
				}
				// level 2
				if( matchFound == true && bodycounter == 1 && JSON.stringify(sortArray(archive.map(Number))) === JSON.stringify([5,6,7])){ 
					view = 'brew3';
					bodycounter++;
					archive.length = 0 ;
					console.log("level 2 cleared");
				}else if(matchFound == true && bodycounter == 1 && archive.length < 3){
					view = 'brew2';
					console.log('next one');			
				}
				// level 3
				if( matchFound == true && bodycounter == 2 && JSON.stringify(sortArray(archive.map(Number))) === JSON.stringify([8,9,10,11,12]) || archive.length == 3){ 
					view = 'brew4';
					bodycounter++;
					archive.length = 0 ;
					console.log("level 3 cleared");
				}else if(matchFound == true && bodycounter == 2 && archive.length < 3){
					view = 'brew3';
					console.log('next one');			
				}
		} else {
			view = view;
			archive.length = 0
			bodycounter = 0 ;
		}
			console.log(ingredient,`is there a match: ${matchFound}`,`bodycounter ${bodycounter}`);
			console.log(`archive content =  ${archive} sorted = ${sortArray(archive)}`,`arrayLegth = ${archive.length}`,);
			res.render(view,{potionsId : PotionId, ingredients : ingredientsData, potions : potionsData })

		  
		// if (matchFound == false) {
		// 		res.redirect(301, 'brew/nasty-potion')
		// 	console.log(`sorted ${sortArray(archive)}`,`arrayLegth ${archive.length}`);
		//   }

		// if (matchFound) {
		// 	// level  2
		// 	if (archive.lengt === 3 && sortArray(archive) == [2,3,4]){ 
		// 		res.render("brew2",{potionsId : PotionId, ingredients : ingredientsData, potions : potionsData })
		// 	}else{
		// 		res.render("brew",{potionsId : PotionId, ingredients : ingredientsData, potions : potionsData })
		// 		}
		// 	// level 3
		// 	if (archive.lengt === 3 && sortArray(archive) == [5,6,7]){
		// 		res.render("brew3",{potionsId : PotionId, ingredients : ingredientsData, potions : potionsData })
		// 	} else {
		// 		res.render("brew2",{potionsId : PotionId, ingredients : ingredientsData, potions : potionsData })
		// 	}
		// 	// level 4
		// 	if (archive.lengt === 5 && sortArray(archive) == [8,9,10,11,12]){
		// 		res.render("brew4",{potionsId : PotionId, ingredients : ingredientsData, potions : potionsData })
		// 		} else {
		// 			res.render("brew3",{potionsId : PotionId, ingredients : ingredientsData, potions : potionsData })
		// 		}
			
		// 	console.log(`sorted ${sortArray(archive)}`,`arrayLegth ${archive.length}`);

		  
		// }else {
		// 	res.redirect(301, 'brew/nasty-potion')
		// 	console.log(`sorted ${sortArray(archive)}`,`arrayLegth ${archive.length}`);
		//   }
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