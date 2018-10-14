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
    constructor() {
        this.positins = [];
    }

    IsWinning(player) {

        let isWinning = false;
        let locations = []

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
        else
            return false;

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
        }
        console.log('am mutat');
        //     else {
        //         winningCondition.forEach((condition) => {
        //             found = 0;
        //             condition.forEach((value) => {
        //                 player.forEach((play) => {
        //                     if (value === play) {
        //                         locations.pop(condition);
        //                     }
        //                 });
        //             });
        //         });


        //         let modeMap = {};
        //         let maxEl = array[0], maxCount = 1;

        //         for(let i = 0; i < array.length; i++) {
        //             let el = array[i];
        //             if(modeMap[el] == null)
        //                 modeMap[el] = 1;
        //             else
        //                 modeMap[el]++;  
        //             if(modeMap[el] > maxCount) {
        //                 maxEl = el;
        //                 maxCount = modeMap[el];
        //             }
        //         }
        //         return maxEl;


        //     }
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


// const playerX = Math.random() < 0.5 ? new Player('X') : new AIPlayer('X');
// const playerO = playerX instanceof Player() ? new AIPlayer('0') : new Player('0');

const playerX = new Player('X');
const playerO = new Player('0');
let playerXTurn;

let winner = false;


table.addEventListener('click', (ev) => {
    if (ev.target.innerHTML === '') {

        if (!game.gameNotStarted())
            playerXTurn = true;

        playerTurn = playerXTurn ? playerX : playerO;
        playerTurn.move(ev.target);
        winner = game.getWinner(playerTurn.getMoves(table));

        if (winner) {
            setTimeout(() => {
                alert(`WINNER!!! ${playerTurn.getPlayer()}`);
                window.confirm('Game will reset!') ?
                    game.restartGame(table) :
                    game.restartGame(table);
            });
        }

        playerXTurn = !playerXTurn;
    }
})

resetBtn.addEventListener('click', () => game.restartGame(table));