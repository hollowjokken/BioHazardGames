let tableMines;
let tableValues;
let tableData;

function generateMines() {
    let randomMines = []
    while (randomMines.length < 8) {
        let randomnumber = Math.floor(Math.random() * 63);
        if (randomMines.indexOf(randomnumber) > -1) continue;
        randomMines[randomMines.length] = randomnumber;
    }
    return randomMines;
}

function generateTableValues(mines) {
    let allData = [];
    let id = 0;
    for (let j = 0; j <= 9; j++) {
        allData.push([]);
        for (let i = 0; i <= 9; i++) {

            if (i !== 0 && j !== 0 && i !== 9 && j !== 9) {

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

    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
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
    for (let j = 1; j <= 8; j++) {
        mainTabel += `<tr id=tr${j}>`;
        for (let i = 1; i <= 8; i++) {
            // mainTabel += `<td id=${id}>${tableData[j][i].value}</td>`;
            // mainTabel += `<td id=${id}>${tableData[id].value}</td>`;
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
                    $(`#${location.id}`).text(location.value).css("background-color", "white");
                    if (i !== 0 || j !== 0) {
                        showZone(findElem(tableData[location.i + i][location.j + j].id));
                    }
                }
            }
        }
    }
    return;
}

function winner(stage) {
    let cell;
    for (let i = 0; i < stage; i++) {
        cell = findElem(i);
        console.log('TCL: winner -> cell', cell);
        if (cell.value !== 'B' && cell.hidden === true) {
            return false;
        }
    }
    return true;
}

function restartGame() {
    $('#main-board-table').remove();
    tableMines = generateMines();
    tableValues = generateTableValues(tableMines);
    tableData = generateFullTabelData(tableValues);

    $('#minesweeper-table').append(createMinesweeperTable());
}
$('#resetBtn').click(() => { location.reload() });

restartGame();

$('#main-board-table').click((e) => {
    let target = e.target;
    let chosen = findElem(parseInt(target.id));

    if ($(target).is('td')) {
        if (chosen.value === 'B') {
            $(target).css("background-color", "red");
            alert('LOSE!!!')
                // restartGame();
            location.reload();
        } else {
            showZone(chosen);
        }
    }

    if (winner(8 * 8)) {
        alert('Winner!!!');
        location.reload();
    }

})