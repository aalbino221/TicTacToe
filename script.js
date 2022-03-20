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
            if (gameRules.check() == false && gameboard.AI == true) {
               AI.easy()
            }
        },

        addCircle: function (i) {
            let newMove = document.createElement('div')
            newMove.classList.add('circle')
            move.squares[i].append(newMove)
            move.squares[i].dataset.move = 'Circle'
            gameboard.squares[i] = "Circle"
            move.lastTurn = "Circle"
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
       if( rowHorizontal()) {return true}
       if( rowVertical()) {return true}
       if( rowDiagonal()) {return true}
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
        else {move.turn = 2; AI.easy()}

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
        if (gameboard.players.player1.choice == "Circle") {setTimeout(AI.easy, 300)}
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
    hard: '',
}

let choices = {
    easy: function (){
        let easy = document.querySelector(".easy");
        let hard = document.querySelector(".hard");
        easy.addEventListener("click", ()=>{
            easy.style.backgroundColor =  "rgba(17, 17, 17, 0.397)";
            hard.style.backgroundColor= "rgba(17, 17, 17, 0.0)";
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
