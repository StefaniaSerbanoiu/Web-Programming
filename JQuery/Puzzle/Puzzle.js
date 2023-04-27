// interchanges firstPiece with secondPiece
function changePieces(firstPiece, secondPiece) {
    // Store the style of firstPiece
    let firstStyle = $(firstPiece).attr("style");
    // Set the style of firstPiece to the style of secondPiece
    $(firstPiece).attr("style", $(secondPiece).attr("style"));
    // Set the style of secondPiece to firstStyle
    $(secondPiece).attr("style", firstStyle);
}


// function to select all elements with class "puzzle" and iterate over them using each()
$(".puzzle").each((i, puzzle) => {
    // get the URL of the image from the "src" attribute of the puzzle element
    let imageUrl = $(puzzle).attr('src');
    // get the width and height of the puzzle
    let puzzleWidth = $(puzzle).width();
    let puzzleHeight = $(puzzle).height();
    // create a new puzzle container (<div> element with class "container") and set its width and height to the puzzle's dimensions
    let puzzleContainer = $("<div class='container' style='width: " + puzzleWidth + "px; height: " + puzzleHeight + "px;'></div>");
    // Iterate 4 times to create 4 rows of puzzle pieces
    for (let i = 0; i < 4; i++) {
        // Calculate the vertical position of the row based on the index and the width of the puzzle
        let yPercent = (i * puzzleWidth / 4).toString() + "px";
        // Iterate 4 times to create 4 columns of puzzle pieces
        for (let j = 0; j < 4; j++) {
            // Calculate the horizontal position of the column based on the index and the height of the puzzle
            let xPercent = (j * puzzleHeight / 4).toString() + "px";
            // creating a tile(<div> element with class "puzzle-image"), setting it as draggable, and setting its background image
            $("<div draggable='true' class='puzzle-image' style='background: url(" + imageUrl + ") " + xPercent + " " + yPercent + ";'>").appendTo(puzzleContainer);
        }
    }
    // put the puzzle after the original image
    $(puzzle).after(puzzleContainer)
});

// here we store the currently dragged puzzle piece
let draggedElement = null;

// attach event handlers for drag and drop events to all elements of class "puzzle-image", using method "on"
$(".puzzle-image")
    .on("dragstart", () => draggedElement = event.target) // set the currently dragged piece when drag starts
    .on("drop", () => {
        changePieces(event.target, draggedElement); // swap the positions of the dropped piece and the dragged piece
        draggedElement = null; // reset the currently dragged piece variable, so another piece can be moved
    })
    .on("dragenter", () => event.preventDefault()) // prevent default behavior for dragenter event
    .on("dragover", () => event.preventDefault()) // prevent default behavior for dragover event
    .each((i, piece) => {
        let targetPiece = $('.puzzle-image').get()[Math.floor(Math.random() * 16)]; // Select a random puzzle piece to swap with
        changePieces(piece, targetPiece); // Swap the positions of the current piece and the randomly selected piece
    });
