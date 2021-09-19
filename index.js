var area = document.getElementById('area');
var cell = document.getElementsByClassName('cell');
var currentPlayer = document.getElementById('curPlyr');

var player = "x";
var stat = {
    'x': 0,
    'o': 0,
    'd': 0
}
var winIndex = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

for (var i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false);
}
function cellClick() {

    var data = [];

    if (!this.innerHTML) {
        this.innerHTML = player;
    } else {
        alert("Cell is busy (Ячейка занята)")
        return;
    }

    for (var i in cell) {
        if (cell[i].innerHTML == player) {
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if (checkWin(data)) {
        stat[player] += 1;
        restart("Win (Победил): " + player);
    } else {
        var draw = true;
        for (var i in cell) {
            if (cell[i].innerHTML == '') draw = false;
        }
        if (draw) {
            stat.d += 1;
            restart("Draw (Ничь)");
        }
    }

    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin(data) {
    for (var i in winIndex) {
        var win = true;
        for (var j in winIndex[i]) {
            var id = winIndex[i][j];
            var ind = data.indexOf(id);

            if (ind == -1) {
                win = false
            }
        }

        if (win) return true;
    }
    return false;
}

function restart(text) {

    alert(text);
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    updateStat();
}

function updateStat() {
    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    document.getElementById('sD').innerHTML = stat.d;
}







const langArr = {
    "title": {
        "en": "Tik tak toe",
        "ru": "Крестики нолики",
    },
    "walks": {
        "en": "Walks now:",
        "ru": "Сейчас ходит:",
    },
    "statistics": {
        "en": "Statistics",
        "ru": "Статистика",
    },
    "draws": {
        "en": "Draws",
        "ru": "Ничьи",
    },
}



const select = document.querySelector('select');
const allLang = ['en', 'ru'];

select.addEventListener('change', changeURLLanguage);

// перенаправить на url с указанием языка
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    console.log(hash);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    document.querySelector('title').innerHTML = langArr['title'][hash];
    document.querySelector('.walksLanguage').innerHTML = langArr['walks'][hash];
    document.querySelector('.statisticsLanguage').innerHTML = langArr['statistics'][hash];
    document.querySelector('.drawsLanguage').innerHTML = langArr['draws'][hash];
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }

    }
}

changeLanguage();