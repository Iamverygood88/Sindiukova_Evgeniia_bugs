(() => {

     // click
	// window.addEventListener("load", changeHeadline);

	// function changeHeadline() {
	// 	document.querySelector("h1").textContent = "Hey There from JS!";
	// 	document.querySelector("p").textContent = "This is the subhead";
	// }
	// // set up the puzzle pieces and boards

	// const theButton = document.querySelector("#buttonHolder img");

	// theButton.addEventListener("click", changeHeadline);

    // need a referance to each piece that we want to create
	const thePieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
	// drag side
	let piecesBoard = document.querySelector(".puzzle-pieces");
	let puzzleBoard = document.querySelector(".puzzle-board");
	// buttons at the bottom for changing the puzzles
	let puzzleSelectors = document.querySelectorAll("#buttonHolder img");

	// drop area
	let dropZones = document.querySelectorAll('.drop-zone');

	// function go in the middle
	function createPuzzlePieces(pictureIndex) {
		// generate image here -> need to make 4 (top left, right, bottom left, right)
		// loop throutgh the images and generate one for each
		thePieces.forEach((piece, index) => {
			let newPuzzlePiece = `<img id="piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg" alt="puzzle piece" draggable>`;

			piecesBoard.innerHTML += newPuzzlePiece;
		});

		initDrag();

	}

	// drag and drop functionality
	// this is a 3-step process
	// 1.handle the drag event
	// 2. handle the drag over event
	// 3. handle the drop event 

	// dragging sets some data reference(an audio track name, image source, etc)
	// drag over => just prevent the default behaviour
	// on a drop is where the magic happens -> script that behaviour, get the data reference and what you need to do with it



	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener('dragstart', function(e) {
				console.log("draggin...");
				e.dataTransfer.setData('text/plain', this.id);
			});
		});
	}

	// handle the drop
	dropZones.forEach(zone => {
		zone.addEventListener('dragover', function(e) {
			e.preventDefault();
			console.log('dragged over me!');

		});

		
		function drop(e){
			e.preventDefault();
			console.log("you dropped something on me");
			let piece = e.dataTransfer.getData('text/plain');
			e.target.appendChild(document.querySelector(`#${piece}`));
		}

        // pazzles just for one item only
		zone.addEventListener('drop', function(e) {
			e.preventDefault();
			if(!zone.innerHTML){
				drop(e);
			} else {
				console.log("There is no space for you, dude");
			}
		}

        );

	});


	function resetPuzzlePieces() {
		// change current puzzles, regenerate the pieces
		piecesBoard.innerHTML = "";
		createPuzzlePieces(this.dataset.puzzleref);

	}

	// event headlining goes here
	puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));

	// call this function to set up; generate pieces on load

	createPuzzlePieces(0);

	
})();
