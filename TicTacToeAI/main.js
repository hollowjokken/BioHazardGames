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
    constructor(playerType) {
        super();
        this.playerType = playerType;
        this.positins = [];
    }

    isWinning(player) {
        if (player.length === 0) {
            let isWinning = false;
            let locations = []
            let found;

            winningCondition.forEach((condition) => {
                found = 0;
                condition.forEach((value) => {
                    player.forEach((play) => {
                        if (value === play) {
                            found++;
                            if (found === 2) {
                                isWinning = true;
                                locations.push(condition);
                            }
                            if (found === 3) {
                                locations.pop(condition);
                            }
                        }
                    });
                });
            });
            if (isWinning)
                return { location };
        } else
            return false;

    }

    getTheBestSpot(table) {
        const gameTable = table.querySelectorAll("td");
        let allSpots = [];
        let avaylableSpots = [];

        winningCondition.forEach(condition => {
            condition.forEach(value => {
                allSpots.push(value);
            });
        });

        console.log('TCL: AIPlayer -> getTheBestSpot -> gameTable', gameTable);
        gameTable.forEach((cell) => {
            if (cell.innerHTML != '') {
                allSpots.forEach(spot => {
                    if (spot === cell.id) {

                    }
                });
            }
        });
        console.log('TCL: AIPlayer -> getTheBestSpot -> avaylableSpots', avaylableSpots);

    }

    moveIA(isWinning, player) {
        location = winningCondition;
        if (isWinning) {
            isWinning.locations.forEach((location) => {
                let positin = document.getElementById(`${location}`);
                if (positin.innerHTML === '') {
                    this.move(positin);
                }
            })
        } else {
            winningCondition.forEach((condition) => {
                found = 0;
                condition.forEach((value) => {
                    player.forEach((play) => {
                        if (value === play) {
                            locations.pop(condition);
                        }
                    });
                });
            });


            let modeMap = {};
            let maxEl = array[0],
                maxCount = 1;

            for (let i = 0; i < array.length; i++) {
                let el = array[i];
                if (modeMap[el] == null)
                    modeMap[el] = 1;
                else
                    modeMap[el]++;
                if (modeMap[el] > maxCount) {
                    maxEl = el;
                    maxCount = modeMap[el];
                }
            }
            return maxEl;


        }
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

// const playerStart = Math.random() < 0.5 ? true : false;

// if (playerStart) {
playerX = new Player('X');
playerO = new AIPlayer('O');
// } else {
//     playerX = new AIPlayer('X');
//     playerO = new Player('O');
//     playerX.moveIA();
// }


console.log('TCL: playerX', playerX);
console.log('TCL: playerO', playerO);



// const playerX = new Player('X');
// const playerO = new Player('0');
let playerXTurn = false;

let winner = false;


table.addEventListener('click', (ev) => {

    if (ev.target.innerHTML === '') {

        if (!game.gameNotStarted()) {
            playerXTurn = true;
        }

        // playerTurn = playerXTurn ? playerX : playerO;
        // playerTurn.move(ev.target);
        playerX.move(ev.target);
        playerO.isWinning(playerO.getMoves(table));
        console.log('TCL: playerO.getMoves(table)', playerO.getMoves(table));
        console.log('TCL: playerO.isWinning(O);', playerO.isWinning('O'));
        // playerO.isWinning('X');
        console.log('TCL: playerO.isWinning(X)', playerO.isWinning('X'));
        playerO.getTheBestSpot(table);
        winner = game.getWinner(playerX.getMoves(table));

        if (winner) {
            setTimeout(() => {
                alert(`WINNER!!! ${playerX.getPlayer()}`);

                if (window.confirm('Game will reset!')) {
                    // playerStart = Math.random() < 0.5 ? true : false;
                    // if (playerStart) {
                    // playerX = new Player('X');
                    // playerO = new AIPlayer('O');
                    // } else {
                    //     playerX = new AIPlayer('X');
                    //     playerO = new Player('O');
                    //     playerX.moveIA();
                    // }
                    game.restartGame(table);
                } else {
                    // playerStart = Math.random() < 0.5 ? true : false;
                    // if (playerStart) {
                    // playerX = new Player('X');
                    // playerO = new AIPlayer('O');
                    // } else {
                    //     playerX = new AIPlayer('X');
                    //     playerO = new Player('O');
                    //     playerX.movmoveIAe();
                    // }
                    game.restartGame(table);
                }
            });
        }

        // playerXTurn = !playerXTurn;
    }
})

resetBtn.addEventListener('click', () => {
    game.restartGame(table);

    // playerStart = Math.random() < 0.5 ? true : false;
    // if (playerStart) {
    playerX = new Player('X');
    playerO = new AIPlayer('O');

    // } else {
    //     playerX.moveIA();
    //     playerX = new AIPlayer('X');
    //     playerO = new Player('O');
    // }

});