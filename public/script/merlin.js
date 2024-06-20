const ingredient = document.querySelectorAll(".aside_1 ul > li");
const PO_t = document.querySelectorAll(".aside_2 ul > li");
const menu_p = document.querySelector("section.menu");
const mid_i = document.querySelector(".mid_2");
const mid_b = document.querySelector(".mid_2 div:has(button)");

// const flip = document.querySelector(".menu-flip");
const collection = window.collection;
const bodycounter = window.bodycounter;

// mouse over
function MouseOver1(event) {
	const liValue = event.currentTarget.value;
	let tablePieces = document.querySelectorAll(
		`.mainGrid fieldset label[data-value="${liValue}"]`
	);
	// let tablePieces = document.querySelectorAll(`.mainGrid fieldset label`).dataset.liColor
	if (tablePieces) {
		tablePieces.forEach((tablePiece) => {
			// tablePiece.style.background = 'out';
			// tablePiece.classList.add("itemSelect");

			// const liColor = tablePiece.getAttribute('color');
			const liColor = tablePiece.dataset.color;

			// console.log("color", liColor,tablePiece.parentElement )
			tablePiece.parentElement.style.background = liColor;
		});
	}
}

// mouse out
function Mouseout1(event) {
	const liValue = event.currentTarget.value;
	// use currentTarget to get the parent element instead of the parent and the child

	let tablePieces = document.querySelectorAll(
		`.mainGrid fieldset label[data-value="${liValue}"]`
	);
	if (tablePieces) {
		// console.log('tablePiece out');
		tablePieces.forEach((tablePiece) => {
			// tablePiece.classList.remove("itemSelect");
			tablePiece.parentElement.style.background = "";
		});
	}
}

function MouseOver2(event) {
	const liValue = event.currentTarget.value;
	let tablePieces = document.querySelectorAll(
		`.mainGrid fieldset label[data-value="${liValue}"]`
	);
	// console.log(tablePieces);
}

// add event listener to each li
if (ingredient) {
	ingredient.forEach((li) => {
		li.addEventListener("mouseover", MouseOver1);
		li.addEventListener("mouseout", Mouseout1);
	});

	PO_t.forEach((li) => {
		li.addEventListener("mouseover", MouseOver2);
		// li.addEventListener("mouseout", Mouseout);
	});
}

if (menu_p) {
	document.addEventListener("DOMContentLoaded", (event) => {
		menu_p.classList.add("menu-flip");
		console.log("Data:", bodycounter, collection, menu_p);

		if (collection >= 1) {
			menu_p.classList.remove("menu-flip");
			console.log("it should be gone");
		}

		// Use the server data as needed
		// e.g., update the page with server data
		// document.getElementById('some-element').innerText = serverData.lives;
	});
}

document.addEventListener("DOMContentLoaded", (e) => {
	e.preventDefault();
	////// cauldron animation end

	// Function to redirect after animation ends
	function redirectToNextPage() {
		window.location.href = "brew";
	}

	if (mid_i) {
		mid_b.addEventListener("click", (e) => {
			// e.preventDefault();

			// this doesn't work becaise animation is not an animatable element
			// mid_i.style.animationDuration = '.5s';
			document.body.classList.add("fast-rotate");

			console.log("mid click succes", e);
			setTimeout(() => {
				redirectToNextPage();
				console.log("redirect after timeout");
				mid_i.classList.add("itemSelect");
			}, 2000);

			e.addEventListener("animationend", (event) => {
				if (event.animationName === "fast-rotate") {
					setTimeout(redirectToNextPage, 2000);
				}
			});
		});
	}

	////// succes brew checker
	if (collection && PO_t) {
		for (let i = 0; i < PO_t.length; i++) {
			for (let j = 0; j < collection.length; j++) {
				const coll = collection[j];
				const li = PO_t[i].dataset.id;
				if (li == coll) {
					PO_t[i].parentElement.classList.add("check");
					PO_t[i].classList.add("itemSelect");
					console.log("you made potion 2 ", PO_t);
				}
			}
		}
		// if(collection.includes(2)){
		// 		console.log('you made potion 2 ',PO_t);
		// 		PO_t[0].classList.add('check');
		// 		// PO_t[0].style.background = 'green';
		// }
	}
});
