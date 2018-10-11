let tableMines;
let tableValues;
let tableData;

// console.log('TCL: tableData', tableData);

// console.log('TCL: tableValues', tableValues);

// console.log('TCL: tableMines', tableMines);

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
        mainTabel += `<tr id=${j}>`;
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
    tableData.forEach(row => {
        row.forEach(cell => {
            if (cell.id === id) {
                val = cell;
            }
        })
    });
    return val;
}

function restartGame() {
    $('#main-board-table').remove();
    tableMines = generateMines();
    tableValues = generateTableValues(tableMines);
    tableData = generateFullTabelData(tableValues);

    $('#minesweeper-table').append(createMinesweeperTable());
}
$('#resetBtn').click(() => restartGame());

restartGame();

$('#main-board-table').click((e) => {
    let target = e.target;
    let chosen = findElem(parseInt(target.id));

    if ($(target).is('td')) {
        $(target).text(chosen.value);
        if (chosen.value === 'B') {
            alert('LOSE!!!')
            restartGame();
            location.reload();
        } else {

        }
    }

    // if ($(target).is('td') && jQuery.inArray(parseInt(target.id), tableMines) != -1) {
    //     console.log('BOOOOOM!!!TCL: target', target.id);
    //     alert('LOSE!!!')
    // } else {
    //     console.log('OKKKKKK!!!TCL: target', target.id);

    // }

})