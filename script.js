const grid = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset');
const flipSound = document.getElementById('flip-sound');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');

let score = 0;
let attempts = 0;
const maxAttempts = 12;
const totalCells = 16;
const correctCells = 8;

const generateGrid = () => {
    grid.innerHTML = '';
    attempts = 0;

    const cellIndexes = Array.from(Array(totalCells).keys());
    const shuffledIndexes = cellIndexes.sort(() => 0.5 - Math.random());
    const correctIndexes = new Set(shuffledIndexes.slice(0, correctCells));

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        const img = document.createElement('img');
        img.src = correctIndexes.has(i) ? 'green_diamond.png' : 'red_diamond.png';
        cell.appendChild(img);

        cell.addEventListener('click', () => {
            if (cell.classList.contains('correct') || cell.classList.contains('incorrect') || attempts >= maxAttempts) return;

            attempts++;
            cell.classList.add(correctIndexes.has(i) ? 'correct' : 'incorrect');
            flipSound.play();

            if (correctIndexes.has(i)) {
                score += 20;
            } else {
                score -= 10;
            }

            scoreElement.textContent = score;

            if (attempts >= maxAttempts) {
                alert('Game Over! Final Score: ' + score);
            }
        });

        grid.appendChild(cell);
    }
};

resetButton.addEventListener('click', generateGrid);

closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('load', () => {
    generateGrid();
    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
});
