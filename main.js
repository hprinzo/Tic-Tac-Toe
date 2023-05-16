const cells = document.querySelectorAll(".cell");
const Statustext = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = 
[
    [0, 1, 2],
    [3, 4, 5],
    [5, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]  
];

let options = ["", "", "", "", "", "", "", "", "" ];
let CurrentPlayer = "X";
let running = true;

initializeGame();

function initializeGame()
{
    cells.forEach(cell => cell.addEventListener("click", cellClicked ));
    restartBtn.addEventListener("click", restartGame);
    Statustext.textContent = `${CurrentPlayer}'s Turn`;
}

function cellClicked()
{
    const cellIndex = this.getAttribute("cellIndex");

    if( options[cellIndex] != "" || !running )
    {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, i)
{
    options[i] = CurrentPlayer;
    cell.textContent = CurrentPlayer;
}

function changePlayer()
{
    CurrentPlayer = (CurrentPlayer == "X") ? "O" : "X";
    Statustext.textContent = `${CurrentPlayer}'s Turn`;
}

function checkWinner()
{
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++)
    {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "")
        {
            continue;
        }

        if(cellA == cellB && cellB == cellC)
        {
            roundWon = true;
            break;
        }
    }

    if(roundWon)
    {
        Statustext.textContent = `${CurrentPlayer} is a GIGA CHAD!`;
        running = false;
    }
    else if(!(options.includes("")))
    {
        Statustext.textContent = `You but suck LOL!`;
        running = false;
    }
    else
    {
        changePlayer();
    }

}

function restartGame()
{
    CurrentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "" ];
    Statustext.textContent = `${CurrentPlayer}'s turn`;

    cells.forEach(cell => cell.textContent = "");
    running = true;
    
}