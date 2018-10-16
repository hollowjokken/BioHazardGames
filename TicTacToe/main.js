const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

class Player {
    constructor(playerType) {
        this.playerType = playerType;
    }

    getPlayer() {
        return this.playerType;
    }

    move(position) {
        position.innerHTML = this.playerType;
    }

    getMoves(table) {

        let positins = [];
        const rows = table.rows

        for (let row of rows) {
            for (let cell of row.cells) {
                if (cell.innerHTML === this.playerType)
                    positins.push(parseInt(cell.id));
            }
        }
        return positins;
    }
}

class Game {
    constructor(playerTurn) {
        this.playerTurn = playerTurn;
    }

    createElement(tag, id) {
        const element = document.createElement(tag);
        element.setAttribute('id', id);
        return element;
    }

    createTable(width) {
        let table = this.createElement('table', 'main-table');
        let id = 0;

        for (let i = 0; i < width; i++) {
            let tr = this.createElement('tr', `${i}`);
            for (let j = 0; j < width; j++) {
                tr.appendChild(this.createElement('td', `${id}`));
                id++;
            }
            table.appendChild(tr);
        }
        return table;
    }

    getWinner(player) {
        let found;
        let winner = false;

        winningCondition.forEach((condition) => {
            found = 0;
            condition.forEach((value) => {
                player.forEach((play) => {
                    if (value === play) {
                        found++;
                        if (found === 3) {
                            winner = true;
                        }
                    }
                });
            })
        })
        return winner;
    }

    getGameStatus(table) {
        return table.querySelectorAll("td");
    }

    gameFinished(table) {
        const cells = this.getGameStatus(table);
        let finished = true
        cells.forEach(cell => {
            if (cell.innerHTML === '') {
                finished = false;
            }
        })
        return finished
    }
}

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => restartGame());

function restartGame() {
    const game = new Game();
    const playerX = new Player('X');
    const playerO = new Player('0');
    const emptyTable = document.querySelector('table');
    const tableParent = document.getElementById('table-parent');
    let playerXTurn = true;
    let winner = false;
    let gameTabel = game.createTable(3);

    if (emptyTable) {
        tableParent.removeChild(emptyTable);
    }
    gameTabel.setAttribute('id', 'main-table');
    tableParent.appendChild(gameTabel);

    let table = document.getElementById('main-table');

    table.addEventListener('click', (ev) => {
        if (ev.target.innerHTML === '') {

            playerTurn = playerXTurn ? playerX : playerO;
            playerTurn.move(ev.target);
            winner = game.getWinner(playerTurn.getMoves(table));

            if (winner) {
                setTimeout(() => {
                    setTimeout(() => {
                        alert(`WINNER!!! ${playerTurn.getPlayer()}`);
                        window.confirm('Game will reset!') ?
                            restartGame() :
                            restartGame();
                    });
                })
            } else if (game.gameFinished(table)) {
                setTimeout(() => {
                    alert(`TIED!!!`);
                    restartGame();
                });
            }
            playerXTurn = !playerXTurn;
        }
    })
}
restartGame();