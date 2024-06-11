
const ingredient = document.querySelectorAll(".aside_1 ul > li");

function MouseOver1(event){
	const liValue = event.currentTarget.value;
	let tablePieces = document.querySelectorAll(`.mainGrid fieldset label[data-value="${liValue}"]`)
	// let tablePieces = document.querySelectorAll(`.mainGrid fieldset label`).dataset.liColor
	if (tablePieces) {
		
		tablePieces.forEach(tablePiece => {
			// tablePiece.style.background = 'out';
			// tablePiece.classList.add("itemSelect");

			// const liColor = tablePiece.getAttribute('color');
			const liColor = tablePiece.dataset.color;
			
			// console.log("color", liColor,tablePiece.parentElement )
			tablePiece.parentElement.style.background = liColor
		})

	}
}

function Mouseout1(event){
	const liValue = event.currentTarget.value;
	// use currentTarget to get the parent element instead of the parent and the child

	let tablePieces = document.querySelectorAll(`.mainGrid fieldset label[data-value="${liValue}"]`)
	if(tablePieces){
		// console.log('tablePiece out');
		tablePieces.forEach(tablePiece => {
			// tablePiece.classList.remove("itemSelect");
			tablePiece.parentElement.style.background = ''

		})
	}
}

function MouseOver2(event){
	const liValue = event.currentTarget.value;
	let tablePieces = document.querySelectorAll(`.mainGrid fieldset label[data-value="${liValue}"]`)
	console.log(tablePieces);
}

if(ingredient){

	ingredient.forEach(li =>{
		li.addEventListener("mouseover", MouseOver1);
		li.addEventListener("mouseout", Mouseout1);
	})

