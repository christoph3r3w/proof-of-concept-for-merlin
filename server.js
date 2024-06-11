import express from "express";
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

// page refresh counter
var bodycounter = app.locals.visitCounter = 0;


// homepage 
app.get("/", (req, res) => {
	Promise.all([
		fetchJson(IngrUrl),
		fetchJson(potionsUrl),
	])
		.then(([ingredientsData, potionsData]) => {
			res.render("index.ejs", { ingredients : ingredientsData, potions : potionsData });
			bodycounter++

			console.log("home success",	bodycounter	);
		})
		.catch(err => alert("home failed"));
});

app.get("/brew/1", (req, res) => {
	Promise.all([
		fetchJson(IngrUrl),
		fetchJson(potionsUrl),
	])
		.then(([ingredientsData, potionsData]) => {
			res.render("brew.ejs", { ingredients : ingredientsData, potions : potionsData });
			bodycounter++

			console.log("page1 success",	bodycounter	);
		})
		.catch(err => alert("home failed"));
})

app.post("/brew/1",(req,res) =>{
	fetchJson(potionsUrl).then((potions) => {
	const {description,ingredients} = req.body;

	

	// if (!Array.isArray(ingredients)) {
	// 	return response.status(400).send('nop');
	//   }
	res.render("brew.ejs",{description})

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