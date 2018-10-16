class Game {
    constructor() {}

    createTable(width) {
        let table = this.createElement('table', 'main-table');
        let id = 0;

        for (let i = 0; i < width; i++) {
            let tr = this.createElement('tr', `${i}`);
            for (let j = 0; j < width; j++) {
                let input = this.createElement('input', `${id}`);
                let td = this.createElement('td', `${id}`);

                td.appendChild(input);
                tr.appendChild(td);
                id++;
            }
            table.appendChild(tr);
        }
        return table;
    }

    createElement(tag, id) {
        const element = document.createElement(tag);
        if (id) element.setAttribute('id', id);
        return element;
    }

}

function startGame() {
    const tableParent = document.getElementById('sudoku-table');
    const game = new Game();
    const gameTabel = game.createTable(9);

    gameTabel.setAttribute('id', 'main-table');
    tableParent.appendChild(gameTabel)

}

startGame();