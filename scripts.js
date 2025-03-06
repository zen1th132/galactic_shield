function generateAliens(rows, columns) {
    const imageNames = ["ufo1.png", "ufo2.png", "ufo3.png"];
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = "";

    let rowDirections = []; 

    for (let row = 0; row < rows; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.className = "alienRow";
        rowDiv.style.display = "flex";
        rowDiv.style.justifyContent = "center";
        rowDiv.style.position = "absolute";
        rowDiv.style.top = `${row * 80}px`; 

        let numAliens = Math.floor(Math.random() * 6) + 5; 
        rowDiv.dataset.direction = row % 2 === 0 ? 1 : -1; 
        rowDirections.push(rowDiv.dataset.direction);

        for (let col = 0; col < numAliens; col++) {
            const image = document.createElement("img");
            image.src = imageNames[col % imageNames.length];
            image.className = "ufo";
            rowDiv.appendChild(image);
        }
        imageContainer.appendChild(rowDiv);
    }

    let step = 20;
    let moveDown = 10;

    moving = setInterval(function () {
        let rows = document.querySelectorAll(".alienRow");
        rows.forEach((rowDiv, index) => {
            let direction = rowDirections[index]; 
            let currentLeft = parseInt(rowDiv.style.left || "0");
            let currentTop = parseInt(rowDiv.style.top);

            rowDiv.style.left = `${currentLeft + step * direction}px`;
            rowDiv.style.top = `${currentTop + moveDown}px`;

            if (currentLeft > window.innerWidth - 200 || currentLeft < 0) {
                rowDirections[index] *= -1;
            }
        });

        const divRect = imageContainer.getBoundingClientRect();
        const shipRect = ship.getBoundingClientRect();

        if (divRect.bottom > shipRect.top) {
            resetGame("The game is over!");
        }
    }, 500);
}
