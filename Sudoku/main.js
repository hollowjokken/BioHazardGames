class Player {}
class Game {
    constructor() {
        this.sudokuTable = []
    }
    createTable(width) {
        let table = this.createElement('table', 'main-table');
        let id = 0;

        for (let i = 0; i < width; i++) {
            this.sudokuTable.push([])
            let tr = this.createElement('tr', `${i}`);
            for (let j = 0; j < width; j++) {
                let input = this.createElement('input', `${i}${j}`);
                let td = this.createElement('td', `${id}`);
                td.appendChild(input);
                tr.appendChild(td);
                id++;
                this.sudokuTable[i][j] = 0;
            }
            table.appendChild(tr);
        }
        return table;
    }

    createElement(tag, id) {
        const element = document.createElement(tag);
        if (id) {
            element.setAttribute('id', id);
            element.setAttribute('value', id);
        }
        return element;
    }

    nullSudokuTable() {
        for (let i = 0; i < this.sudokuTable.length; i++) {
            for (let j = 0; j < this.sudokuTable.length; j++) {
                this.sudokuTable[i][j] = 0;
            }
        }
    }

    addSomeRandomValues() {
        this.nullSudokuTable();
        for (let i = 0; i < this.sudokuTable.length; i++) {
            for (let j = 0; j < this.sudokuTable.length; j++) {
                let selectFromValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                let found = false;

                while (selectFromValues.length !== 0) {
                    let selectedValue = Math.floor((Math.random() * selectFromValues.length) + 1)
                    this.sudokuTable[i][j] = selectedValue;

                    if (this.isOneInLine(i, j) && this.isOneInTheHood(i, j)) {
                        found = true;
                        break;
                    }
                    let index = selectFromValues.indexOf(selectedValue);
                    selectFromValues.splice(index, 1);
                }
                if (!found) {
                    console.log('TCL: Game -> addSomeRandomValues -> this.sudokuTable', this.sudokuTable);
                    // this.nullSudokuTable();
                    this.sudokuTable[i].forEach(elem => {
                        elem = 0;
                    });
                    j = 0;
                }
            }
            if (i === 3) debugger;
        }
    }

    isOneInLine(i, j) {
        let permision = 0
        for (let x = 0; x < this.sudokuTable.length; x++) {
            if (this.sudokuTable[i][j] === this.sudokuTable[i][x] || this.sudokuTable[i][j] === this.sudokuTable[x][j]) permision++;
        }
        if (permision > 2)
            return false;
        return true;
    }

    findTheHood(value) {
        const neighborhood = value % 10;
        if (neighborhood <= 2)
            return 1;
        if (neighborhood <= 5)
            return 4;
        if (neighborhood <= 8)
            return 7;
    }

    isOneInTheHood(i, j) {
        const neighborhood = {
            x: this.findTheHood(i),
            y: this.findTheHood(j)
        }

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (!(neighborhood.x + x === i && neighborhood.y + y === j)) {
                    if (this.sudokuTable[i][j] === this.sudokuTable[neighborhood.x + x][neighborhood.y + y]) return false;
                }
            }
        }
        return true
    }

    isWinnable() {
        for (let i = 0; i < this.sudokuTable.length; i++) {
            for (let j = 0; j < this.sudokuTable[i].length; j++) {
                if (!this.isOneInLine(i, j)) return false;
                if (!this.isOneInTheHood(i, j)) return false;
            }
        }
        return true;
    }


}

function startGame() {
    const tableParent = document.getElementById('sudoku-table');
    const game = new Game();
    const gameTabel = game.createTable(9);

    // game.addSomeRandomValues();

    gameTabel.setAttribute('id', 'main-table');
    tableParent.appendChild(gameTabel)

}

startGame();


function testMA_TA() {
    let selectFromValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    console.log('TCL: functiontestMA_TA -> selectFromValues.length', selectFromValues.length);

    while (selectFromValues.length !== 0) {
        let selectedValue = Math.floor((Math.random() * selectFromValues.length) + 1)
        console.log('TCL: functiontestMA_TA -> selectFromValues', selectFromValues);

        console.log('TCL: functiontestMA_TA -> selectedValue', selectedValue);


        let index = selectFromValues.indexOf(selectedValue);
        selectFromValues.splice(index, 1);

    }
}

// testMA_TA();