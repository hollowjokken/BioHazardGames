const winningCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
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

class AIPlayer extends Player {
    constructor(playerType, table) {
        super();
        this.table = table;
        this.playerType = playerType;
        this.positins = [];
    }

    dumbMove() {
        const gameTable = this.getGameStatus();
        let finished = false;
        let i = 0;
        while (i < gameTable.length && !finished) {
            if (gameTable[i].innerHTML === '') {
                gameTable[i].innerHTML = this.playerType;
                finished = !finished;
            }
            i++;

        }

        // gameTable.forEach(cell => {
        //     console.log('TCL: AIPlayer -> move -> cell', cell.innerHTML);
        // })
    }

    getGameStatus() {
        return this.table.querySelectorAll("td");
    }

    isWinning(player) {
        const cells = this.getGameStatus();
        let tableData = [];
        let place = [];
        let found;
        let isWinning = false;
        let wrongSolution;
        cells.forEach(cell => {
            tableData.push({
                id: cell.id,
                value: cell.innerHTML
            })
        })
        winningCondition.forEach((condition) => {
            found = 0;
            wrongSolution = false;
            condition.forEach((cell) => {
                for (let i = 0; i < tableData.length; i++) {
                    if (parseInt(tableData[i].id) === parseInt(cell)) {
                        if (tableData[i].value !== player && tableData[i].value !== '') {
                            wrongSolution = true;
                        } else if (tableData[i].value === player) {
                            found++;
                        }
                    }
                }
            })
            if (found >= 2 && !wrongSolution) {
                isWinning = true;
                place.push(condition);
            }
        })

        if (isWinning) {
            return place;
        } else
            return false;
    }


    finalStand(lastMove) {
        lastMove.forEach((place) => {
            let positin = document.getElementById(`${place}`);
            if (positin.innerHTML === '') {
                this.move(positin);
            }
        })
    }

    moveAI() {
        // location = winningCondition;
        const isAIWinning = this.isWinning(this.playerType);
        const humanPlayer = this.playerType === 'O' ? 'X' : 'O';
        const isHuWinning = this.isWinning(humanPlayer);

        if (isAIWinning) {
            this.finalStand(isAIWinning[0]);
        } else if (isHuWinning) {
            this.finalStand(isHuWinning[0]);
        } else {
            this.dumbMove();
            // winningCondition.forEach((condition) => {
            //     found = 0;
            //     condition.forEach((value) => {
            //         player.forEach((play) => {
            //             if (value === play) {
            //                 locations.pop(condition);
            //             }
            //         });
            //     });
            // });

            // let modeMap = {};
            // let maxEl = array[0],
            //     maxCount = 1;

            // for (let i = 0; i < array.length; i++) {
            //     let el = array[i];
            //     if (modeMap[el] == null)
            //         modeMap[el] = 1;
            //     else
            //         modeMap[el]++;
            //     if (modeMap[el] > maxCount) {
            //         maxEl = el;
            //         maxCount = modeMap[el];
            //     }
            // }
            // return maxEl;


        }
    }
    getTheBestSpot() {
        const gameTable = this.getGameStatus();
        let allSpots = [];
        let avaylableSpots = [];

        winningCondition.forEach(condition => {
            condition.forEach(value => {
                allSpots.push(value);
            });
        });

        // console.log('TCL: AIPlayer -> getTheBestSpot -> gameTable', gameTable);
        gameTable.forEach((cell) => {
            if (cell.innerHTML != '') {
                allSpots.forEach(spot => {
                    if (spot === cell.id) {

                    }
                });
            }
        });
        // console.log('TCL: AIPlayer -> getTheBestSpot -> avaylableSpots', avaylableSpots);

    }
}
class Game {
    constructor(table, playerTurn) {
        this.table = table;
        this.playerTurn = playerTurn;
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

    restartGame() {
        const cells = this.getGameStatus();
        cells.forEach(cell => {
            cell.innerHTML = '';
        })
    }

    getGameStatus() {
        return this.table.querySelectorAll("td");
    }

    gameNotStarted() {
        const cells = this.getGameStatus();
        let started = false
        cells.forEach(cell => {
            if (cell.innerHTML !== '') {
                started = true;
            }
        })
        return started
    }


}

const table = document.querySelector('table');
const resetBtn = document.getElementById('resetBtn');

let game = new Game(table);
let playerX;
let playerO;

function resetGame() {
    game.restartGame(table);
    playerStart = Math.random() < 0.5 ? true : false;
    if (playerStart) {
        playerX = new Player('X');
        playerO = new AIPlayer('O', table);

    } else {
        playerX = new AIPlayer('X', table);
        playerO = new Player('O');
        playerX.moveAI();
    }

}

resetGame();

console.log('TCL: playerX', playerX);
console.log('TCL: playerO', playerO);

let playerXTurn = false;

table.addEventListener('click', (ev) => {

    if (ev.target.innerHTML === '') {

        if (!game.gameNotStarted()) {
            playerXTurn = true;
        }
        if (playerX instanceof AIPlayer) {
            console.log('TCL: if');
            playerO.move(ev.target);
            playerX.moveAI();

        } else {
            console.log('TCL: else');
            playerX.move(ev.target);
            playerO.moveAI();
        }

        // playerTurn = playerXTurn ? playerX : playerO;
        // playerTurn.move(ev.target);
        // playerO.isWinning(playerO.getMoves(table));
        // console.log('TCL: playerO.getMoves(table)', playerO.getMoves(table));
        // console.log('TCL: playerO.isWinning(O);', playerO.isWinning(playerO.getMoves(table)));
        // playerO.isWinning('X');
        // console.log('TCL: playerO.isWinning(X)', playerO.isWinning('X'));
        // playerO.getTheBestSpot(table);
        // huWinner = game.getWinner(playerX.getMoves(table));
        // aiWinner = game.getWinner(playerO.getMoves(table));

        if (game.getWinner(playerX.getMoves(table))) {
            setTimeout(() => {
                alert(`WINNER!!! ${playerX.getPlayer()}`);
                resetGame()
            });
        }
        if (game.getWinner(playerO.getMoves(table))) {
            setTimeout(() => {
                alert(`WINNER!!! ${playerO.getPlayer()}`);
                resetGame()
            });

        }

        // playerXTurn = !playerXTurn;
    }
})

resetBtn.addEventListener('click', () => resetGame());