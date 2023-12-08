var userMove = '';
var result = '';
var computerMove = '';

const final = JSON.parse(localStorage.getItem('final'))||{
    'win': 0,
    'loose': 0,
    'tie': 0,
    'total': 0
}
const gameHistory = JSON.parse(localStorage.getItem('gameHistory'))||{
    'user': [],
    'computer': [],
    'result': []

}
viewResult()

function resetResult() {
    final.win = 0;
    final.loose = 0;
    final.tie = 0;
    final.total = 0;
    gameHistory.user = [];
    gameHistory.computer = [];
    gameHistory.result = [];
    localStorage.removeItem('final');
    localStorage.removeItem('gameHistory');
    viewResult();
}

function generateComputerMove() {
    let ranDom = Math.random()
    if (ranDom < 0.34) {
        computerMove = 'Rock';
    }
    else if (ranDom <= 0.67) {
        computerMove = 'Paper';
    }
    else {
        computerMove = 'Scissors';
    }
    gameHistory.computer.push(computerMove);
    evaluateGame()
}


function evaluateGame() {
    gameHistory.user.push(userMove);
    if (userMove === computerMove) {
        result = "It's a tie!";
    } else if (
        (userMove === "Rock" && computerMove === "Scissors") ||
        (userMove === "Paper" && computerMove === "Rck") ||
        (userMove === "Scissors" && computerMove === "Paper")
    ) {
        result = "You win!";
    } else {
        result = "You lose!";
    }
    gameHistory.result.push(result);

    updateResult();
}


function updateResult() {
    final.total++;
    if (result == "You win!") {
        final.win++;
    }
    else if (result == "You lose!") {
        final.loose++;
    }
    else {
        final.tie++;
    }

    viewResult();
    localStorage.setItem('final',JSON.stringify(final))
    localStorage.setItem('gameHistory',JSON.stringify(gameHistory))
}



function viewResult() {
    var fGameHistoryHTML = `<tr>
        <th>
            No.
        </th>
        <th>
            User
        </th>
        <th>
            Computer
        </th>
        <th>
            Result
        </th>
    </tr>`;
    for (let i = 0; i < gameHistory.user.length; i++) {
        fGameHistoryHTML += `<tr>
            <td>
                ${i+1}
            </td>
            <td>
                ${gameHistory.user[i]}
            </td>
            <td>
                ${gameHistory.computer[i]}
            </td>
            <td>
                ${gameHistory.result[i]}
            </td>
        </tr>`
        
    }
    document.querySelector("#win").innerHTML = final.win;
    document.querySelector("#lose").innerHTML = final.loose;
    document.querySelector("#tie").innerHTML = final.tie;
    document.querySelector("#to").innerHTML = final.total;
    document.getElementById('gamehistory').innerHTML=fGameHistoryHTML
}