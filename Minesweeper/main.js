minesNumber = {
    '9': 10,
    '16': 40,
    '32': 99
}
let tableCells = 9;
let tableRows = 9;

let tableMines;
let tableValues;
let tableData;


function generateMines(difficulty) {
    let randomMines = [];
    const mines = minesNumber[`${difficulty}`];
    while (randomMines.length < mines) {
        let randomnumber = Math.floor(Math.random() * (tableCells * tableRows));
        if (randomMines.indexOf(randomnumber) > -1) continue;
        randomMines[randomMines.length] = randomnumber;
    }
    return randomMines;
}

function generateTableValues(mines) {
    let allData = [];
    let id = 0;

    for (let j = 0; j <= (tableRows + 1); j++) {
        allData.push([]);
        for (let i = 0; i <= (tableCells + 1); i++) {
            if (i !== 0 && j !== 0 && i !== (tableCells + 1) && j !== (tableRows + 1)) {
                if (jQuery.inArray(id, mines) != -1) {
                    allData[j][i] = {
                        id,
                        value: 'B',
                        hidden: true
                    }
                } else {
                    allData[j][i] = {
                        id,
                        value: '',
                        hidden: true
                    }
                }
                id++;
            } else {
                allData[j][i] = {
                    value: 'M'
                }
            }
        }
    }
    return allData;
}

function generateFullTabelData(table) {
    let finalData = table;
    let bombNr;

    for (let i = 1; i <= tableRows; i++) {
        for (let j = 1; j <= tableCells; j++) {
            bombNr = 0;
            if (table[i][j].value !== 'B') {
                if (table[i][j - 1].value === 'B') bombNr++;
                if (table[i][j + 1].value === 'B') bombNr++;
                if (table[i - 1][j].value === 'B') bombNr++;
                if (table[i - 1][j - 1].value === 'B') bombNr++;
                if (table[i - 1][j + 1].value === 'B') bombNr++;
                if (table[i + 1][j].value === 'B') bombNr++;
                if (table[i + 1][j - 1].value === 'B') bombNr++;
                if (table[i + 1][j + 1].value === 'B') bombNr++;
                finalData[i][j].value = bombNr;
            }
        }
    }
    return finalData
}

function createMinesweeperTable() {
    let id = 0;
    let mainTabel = `<table id="main-board-table">`;
    for (let j = 1; j <= tableRows; j++) {
        mainTabel += `<tr id=tr${j}>`;
        for (let i = 1; i <= tableCells; i++) {
            mainTabel += `<td id=${id}></td>`;
            id++;
        }
        mainTabel += `</tr>`;
    }
    mainTabel += `</table>`;
    return mainTabel;
}

function findElem(id) {
    let val;
    tableData.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell.id === id) {
                val = cell;
                val.i = i;
                val.j = j;
            }
        })
    });
    return val;
}

function showZone(location) {

    if (location.hidden) {
        location.hidden = false;

        if (location.value !== 0) {
            $(`#${location.id}`).text(location.value).css("background-color", "white");
            return;
        }

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (tableData[location.i + i][location.j + j].value !== 'R') {
                    $(`#${location.id}`).css("background-color", "white").text('');
                    if (i !== 0 || j !== 0) {
                        showZone(findElem(tableData[location.i + i][location.j + j].id));
                    }
                }
            }
        }
    }
    return;
}

function winner() {
    let cell;
    for (let i = 0; i < (tableRows * tableCells); i++) {
        cell = findElem(i);
        if (cell.value !== 'B' && cell.hidden === true) {
            return false;
        } else if ((cell.value === 'B') && $(`#${cell.id}`).text() !== '!') {
            return false;
        }
    }
    return true;
}

function revealAllMines(mines) {
    mines.forEach(mineId => {
        const mine = findElem(mineId)
        $(`#${mine.id}`).text(mine.value).css("background-color", "red");
    })
}

function restartGame(difficulty) {
    tableCells = difficulty;
    tableRows = difficulty === 32 ? 16 : difficulty;

    $('#main-board-table').remove();
    $('#minesweeper-table').append(createMinesweeperTable());

    tableMines = generateMines(difficulty);
    tableValues = generateTableValues(tableMines);
    tableData = generateFullTabelData(tableValues);

    $('#main-board-table').contextmenu((e) => {
        let target = e.target;
        let chosen = findElem(parseInt(target.id));

        if (chosen) {
            if (chosen.hidden === true) {
                $(`#${target.id}`).text() === '!' ? $(`#${target.id}`).text('') : $(`#${target.id}`).text('!');
            }
        }

        if (winner()) {
            $('#main-board-table').css({ "pointer-events": "none" });
            setTimeout(() => { alert('Winner!!!') });
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    $('#main-board-table').click((e) => {
        let target = e.target;
        let chosen = findElem(parseInt(target.id));

        if ($(target).is('td')) {
            if (chosen.value === 'B') {
                $(target).css("background-color", "red");
                revealAllMines(tableMines);
                $('#main-board-table').css({ "pointer-events": "none" });
                setTimeout(() => { alert('LOSE!!!') });
            } else {
                showZone(chosen);
            }
        }

        if (winner()) {
            $('#main-board-table').css({ "pointer-events": "none" });
            setTimeout(() => { alert('Winner!!!') });
        }
    })
}

$('#resetBtn').click(() => {
    const difficulty = parseInt($("#game-level").val());
    restartGame(difficulty);
});

$('#game-level').change((e) => {
    restartGame(parseInt($('#game-level').val()));
});

restartGame(parseInt($('#game-level').val()));