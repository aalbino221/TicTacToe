let gameboard = {
    squares: 
        [0,0,0,
         0,0,0,
         0,0,0],
    players: {
       player1: {name:"Player",choice:"Cross", wins:0, turn: 1}, 
       player2: {name:"AI",choice:"Circle", wins:0, turn: 2}
    },
    AI: true,
    diff: '',
    }

 let move = {
        lastTurn: "",
        turn: 1,
        squares: document.querySelectorAll('.square'),
        makeMove: function(i) { 
            if (this.checkSquare(i)) {return false}
            else { 
                if (this.lastTurn == "Circle" || this.lastTurn == "") {this.addCross(i)}
                else {this.addCircle(i)}
                };
            gameRules.checkWin();
            if (gameRules.check() == false && gameboard.AI == true && gameboard.diff == "Easy") {
               setTimeout(AI.easy , 500)
            }
            else if (gameRules.check() == false && gameboard.AI == true && gameboard.diff == "Hard") {
                setTimeout(AI.hard , 500)
             }
        },
        block: function () {
            let block = document.querySelector(".block")
            block.style.display = "flex"
            setTimeout(()=> {
                block.style.display = "none"
            }, 350)
        },
        
        addCircle: function (i) {
            let newMove = document.createElement('div')
            newMove.classList.add('circle')
            move.squares[i].append(newMove)
            move.squares[i].dataset.move = 'Circle'
            gameboard.squares[i] = "Circle"
            move.lastTurn = "Circle"
            move.block()
            move.turn++
        },

        addCross: function (i) {
            let newMove = document.createElement('div')
            newMove.classList.add('cross')
            move.squares[i].append(newMove)
            let leftCross = document.createElement('div')
            leftCross.classList.add('leftCross')
            let rightCross = document.createElement('div')
            rightCross.classList.add('rightCross')
            newMove.append(leftCross)
            newMove.append(rightCross)
            move.squares[i].dataset.move = 'Cross'
            gameboard.squares[i] = "Cross"
            move.lastTurn = "Cross"
            move.block()
            move.turn++
        },

        checkSquare: function (i) { 
            let squares = document.querySelectorAll('.square')
            if (typeof squares[i].dataset.move == 'string') {return true}
            return false
        },
    }

let gameRules = (function () {
    let rowHorizontal = function() {
        if ((gameboard.squares[6] == gameboard.squares[7]) && (gameboard.squares[8] == gameboard.squares[7]) && (gameboard.squares[7] != 0) || 
            gameboard.squares[3] == gameboard.squares[4] && gameboard.squares[5] == gameboard.squares[4] && gameboard.squares[4] != 0 ||
            gameboard.squares[0] == gameboard.squares[1] && gameboard.squares[2] == gameboard.squares[1] && gameboard.squares[1] != 0)
            {return true}
        return false
    }

    let rowVertical = ()=> {
        if (gameboard.squares[6] == gameboard.squares[3] && gameboard.squares[0] == gameboard.squares[3] && gameboard.squares[0] != 0|| 
            gameboard.squares[7] == gameboard.squares[4] && gameboard.squares[1] == gameboard.squares[4] && gameboard.squares[1] != 0 ||
            gameboard.squares[8] == gameboard.squares[5] && gameboard.squares[2] == gameboard.squares[5] && gameboard.squares[2] != 0)
            {return true}
        return false}

    let rowDiagonal = ()=> {
        if (gameboard.squares[6] == gameboard.squares[4] && gameboard.squares[2] == gameboard.squares[4] && gameboard.squares[2] != 0|| 
            gameboard.squares[0] == gameboard.squares[4] && gameboard.squares[8] == gameboard.squares[4] && gameboard.squares[8] != 0 )
            {return true}
        return false}

    function check() {
       if( rowHorizontal() || rowDiagonal() || rowVertical()) {return true}
       return false
    }

    function winner() {
        let scoreP1= document.querySelector(".scorep1")
        let scoreP2= document.querySelector(".scorep2")
        if ((move.turn)%2 != 0) { scoreP2.textContent = ++gameboard.players.player2.wins + ` 🏴`} 
        else { scoreP1.textContent = ++gameboard.players.player1.wins + ` 🏴`}
        setTimeout(gameFlow.resetBoard, 1000)
        block()
        setTimeout(scores, 2000)
    }

    function scores() { 
        let scoreP1= document.querySelector(".scorep1")
        let scoreP2= document.querySelector(".scorep2")
        scoreP2.textContent = gameboard.players.player2.wins;
        scoreP1.textContent = gameboard.players.player1.wins}

    function draw() {
    let scoreP1= document.querySelector(".scorep1")
    let scoreP2= document.querySelector(".scorep2")
    scoreP2.textContent = gameboard.players.player2.wins +  '🏳️';
    scoreP1.textContent = gameboard.players.player1.wins +  '🏳️';
    setTimeout(gameFlow.resetBoard, 1000)
    block()
    setTimeout(scores, 2000)
    }

    let checkWin = () => {
        if (check()) { winner() }
        else if ((move.turn == 10 && gameboard.players.player1.choice == "Cross") || move.turn == 11) {draw();
        }
        else {return false}
    }
    return {checkWin, check}
    })()

let gameFlow = {
    listener : function () {
        let squares = document.querySelectorAll('.square');
        for (let i=0; i<9 ; i++) {
            squares[i].addEventListener('click', ()=> move.makeMove(i))
        }
    },
    reset: function () {
        let scoreP1= document.querySelector(".scorep1");
        let scoreP2= document.querySelector(".scorep2");
        gameboard.players.player2.wins = 0 ;
        gameboard.players.player1.wins = 0 ;
        scoreP2.textContent = gameboard.players.player2.wins;
        scoreP1.textContent = gameboard.players.player1.wins;
        gameFlow.resetBoard();
    },
    resetBoard: function () {
        for (let i = 0; i < 9 ; i++) {
            if (move.squares[i].firstElementChild == null) {continue}
            move.squares[i].firstElementChild.remove();
            gameboard.squares[i] = 0 ;
            delete move.squares[i].dataset.move}
        move.lastTurn= "";
        if (gameboard.players.player1.choice == "Cross") { move.turn = 1 } 
        else {move.turn = 2; 
            if(gameboard.diff == "Easy") {setTimeout(AI.easy,500)}
            else {setTimeout(AI.hard,500)}
        }

    },
}
    
let menu = {
    selectors: {
        header : document.querySelector(".header"),
        center : document.querySelector(".center"),
        board : document.querySelector(".board"),
        menu : document.querySelector(".menu"),
        onePlayer: document.querySelector(".play1-description"),
        twoPlayer: document.querySelector(".play2-description"),
    },
    menu: function () {
        let menuBtn = document.querySelector(".menu-btn")
        menuBtn.addEventListener("click", this.goMenu)
    },

    goMenu: function () {
        menu.selectors.menu.style.display = 'flex';
        menu.selectors.header.style.display = 'none';
        menu.selectors.center.style.display = 'none';
        menu.selectors.board.style.display = 'none';
        document.querySelector(".player1").value = ''
        document.querySelector(".player2").value = ''
        gameboard.players.player1.name = 'Player'
        gameboard.players.player2.name = 'AI';
        document.querySelector(".textp1").textContent = "Player 1"
        document.querySelector(".textp2").textContent = "Player 2"
        gameFlow.reset();
    },

    start: function () {
        menu.selectors.menu.style.display = 'none';
        menu.selectors.header.style.display = 'flex';
        menu.selectors.center.style.display = 'flex';
        menu.selectors.board.style.display = 'flex';
    },

    onePlayer: function() {
        menu.selectors.onePlayer.addEventListener("click",this.startOne)
    },

    twoPlayer: function() {
        menu.selectors.twoPlayer.addEventListener("click",this.startTwo)
    },

    startOne: function () {
        document.querySelector(".textp2").textContent = "BOT"
        gameboard.AI = true
        menu.start();
        gameFlow.listener();
        gameFlow.resetBoard();
        if (gameboard.players.player1.choice == "Circle") {
            if(gameboard.diff == "Easy") {setTimeout(AI.easy, 300)}
            else {setTimeout(AI.hard, 300)}
        }
    },
    
    startTwo: function () {
        let player1= document.querySelector(".player1").value
        let player2= document.querySelector(".player2").value
        let textp1 = document.querySelector(".textp1")
        let textp2 = document.querySelector(".textp2")
        if (player1 != '') {
            textp1.textContent = player1;
            gameboard.players.player1.name = player1;
        }
        if (player2 != '') {
            textp2.textContent = player2;
            gameboard.players.player2.name = player2;
        }
        move.turn = 1;
        gameboard.players.player1.choice = "Cross";
        gameboard.players.player2.choice = "Circle";
        gameboard.AI = false
        menu.start();
        gameFlow.listener();
        gameFlow.resetBoard();

    },

    resetBtn: function () {
        let reset = document.querySelector(".reset");
        reset.addEventListener("click", gameFlow.reset)
    },
}

let AI = {
    easy: function () {
            if ((move.turn%2) != 0 || gameboard.AI == false || (move.turn == 10 && gameboard.players.player1.choice == "Cross")) {return false} 
            let z = 0
            let i = 0; 
            function number () {i = Math.floor(Math.random()*9) ; z++ ;
                if (move.checkSquare(i) && z < 20) {number(); z++}
            }
            number();
            console.log(move.turn) 
            move.makeMove(i)
    },
    hard: function () {
        if ((move.turn%2) != 0 || gameboard.AI == false || (move.turn == 10 && gameboard.players.player1.choice == "Cross")) {return false} 
        function simulation () {   
        let board =  []
        function toBoard() {
        if (gameboard.players.player1.choice == 'Cross') {
            for (let i=0; i < 9; i++) {
                if (board[i] == 'Cross') {board[i] = 1 ;}
                else if (board[i] == 'Circle') {board[i] = 2 }
            }
        }
        else if (gameboard.players.player1.choice == 'Circle') {
            for (let i=0; i < 9; i++) {
                if (board[i] == 'Circle') {board[i] = 1 }
                else if (board[i] == 'Cross') {board[i] = 2}
            }
        }
        }
    
        let move = []
    
        function bestMove() {
        board = [...gameboard.squares]
        toBoard();
        move = []
        for(let i = 0; i < 9 ; i++) {
            if (board[i] != 0) {move.push(null) ;continue}  
            board[i] = 2;
            let score = minMax(10,false);
            board[i] = 0;
            move.push(score)
            }
        let max = Math.max(...move)
        let index = move.indexOf(max)
        return index
    }
    
    function minMax(depth, isMaximizing) {
        if (checkDraw() || check() || depth == 0) {
            if (check() && isMaximizing == false) { return 10}
            else if (check() && isMaximizing) {return -10}
            else if (checkDraw()) {return 0}
        }
        else if (isMaximizing) {
            let eval = -Infinity;
            for(let i = 0; i < 9 ; i++) {
                if (board[i] != 0) {continue}  
                board[i] = 2;
                let score = minMax(depth-1,false);
                board[i] = 0;
                if (score > eval || checkDraw()) {
                    eval = score;
                }
            }
            return eval
        }
        else if (isMaximizing == false) {
            let eval = Infinity;
            for(let i = 0; i < 9 ; i++) {
                if (board[i] != 0) {continue}  
                board[i] = 1;
                let score = minMax(depth-1,true);
                board[i] = 0;
                if (score < eval  || checkDraw()) {
                    eval = score;
                }
            }
        return eval
        }
    }
    
    function check () {
        if ( checkRow() ||  checkColumn() || checkDiagonal()) {
            return true}
    }
    
    function checkRow () {
        let row1 = board[0] == board[1] && board[1] == board[2] && board [2] != 0
        let row2 = board[3] == board[4] && board[4] == board[5] && board [5] != 0
        let row3 = board[6] == board[7] && board[7] == board[8] && board [6] != 0
        if (row1 || row2 || row3) {return true} 
        else {return false}
    }
    
    function checkColumn () {
        let column1 = board[0] == board[3] && board[3] == board[6] && board [6] != 0
        let column2 = board[1] == board[4] && board[4] == board[7] && board [7] != 0
        let column3 = board[2] == board[5] && board[5] == board[8] && board [8] != 0
        if (column1 || column2 || column3) {return true} 
        else {return false}
    }
    
    function checkDiagonal () {
        let diagonal1 = board[0] == board[4] && board[4] == board[8] && board [8] != 0
        let diagonal2 = board[2] == board[4] && board[4] == board[6] && board [6] != 0
        if (diagonal1 || diagonal2) {return true} 
        else {return false}
    }
    
    function checkDraw() {
        let z = 0;
        for(j = 0 ; j < +9 ; j++){
            if (board[j] != 0) {z++}
        }
        if (z == 9) {return true}
    }
    let k = bestMove()
    return k
}
        let i = simulation()
        move.makeMove(i)
    },
}


let choices = {
    easy: function (){
        let easy = document.querySelector(".easy");
        let hard = document.querySelector(".hard");
        easy.addEventListener("click", ()=>{
            easy.style.backgroundColor =  "rgba(17, 17, 17, 0.397)";
            hard.style.backgroundColor= "rgba(17, 17, 17, 0.0)";
            gameboard.diff = "Easy"
        })
    },

    hard: function (){
        let easy = document.querySelector(".easy");
        let hard = document.querySelector(".hard");
        hard.addEventListener("click", ()=>{
            hard.style.backgroundColor =  "rgba(17, 17, 17, 0.397)";
            easy.style.backgroundColor= "rgba(17, 17, 17, 0.0)";
            hard.style.borderRadius = "5px";
            hard.style.padding = "0 4px 0 0";
            gameboard.diff = "Hard"

        })
    },

    cross: function(){
        let circle = document.querySelector(".choice-circle")
        let cross = document.querySelector(".choice-cross")
        cross.addEventListener("click", ()=> {
            cross.style.backgroundColor =  "rgba(17, 17, 17, 0.397)";
            circle.style.backgroundColor= "rgba(17, 17, 17, 0.0)";
            gameboard.players.player1.choice = "Cross";
            gameboard.players.player2.choice=  "Circle";
            move.turn = 1;
        })

    },
    circle: function(){
        let circle = document.querySelector(".choice-circle")
        let cross = document.querySelector(".choice-cross")
        circle.addEventListener("click", ()=> {
            circle.style.backgroundColor =  "rgba(17, 17, 17, 0.397)";
            cross.style.backgroundColor = "rgba(17, 17, 17, 0.0)";
            circle.style.borderRadius = "5px";
            circle.style.padding = "0 4px 0 0";
            gameboard.players.player1.choice = "Circle";
            gameboard.players.player2.choice = "Cross";
            move.turn = 2
        })
    },
}

/*setInterval(AI.easy, 1000)*/

function block() {
    let block = document.querySelector(".block")
    block.style.display = "flex"
    setTimeout(()=> {
        block.style.display = "none"
    }, 1000)

}

function init() {
    menu.menu(); menu.resetBtn()
    menu.onePlayer(); menu.twoPlayer();
    choices.cross(); choices.circle();
    choices.easy(); choices.hard();
}

init()
