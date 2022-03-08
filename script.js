let Gameboard = {
    squares: 
        [0,0,0,
         0,0,0,
         0,0,0],
    players: {
       player1: {name:"Player",choice:"Cross", wins:0}, 
       player2: {name:"AI",choice:"Circle", wins:0},
    }}


 let move = {
        turn: 0,
        addCircle: function (i) {
            let squares = document.querySelectorAll('.square')
            let newMove = document.createElement('div')
            newMove.classList.add('circle')
            squares[i].append(newMove)
            squares[i].dataset.move = 'Circle'
            Gameboard.squares[i] = "Circle"
        },

        addCross: function (i) {
            let squares = document.querySelectorAll('.square')
            let newMove = document.createElement('div')
            newMove.classList.add('cross')
            squares[i].append(newMove)
            let leftCross = document.createElement('div')
            leftCross.classList.add('leftCross')
            let rightCross = document.createElement('div')
            rightCross.classList.add('rightCross')
            newMove.append(leftCross)
            newMove.append(rightCross)
            squares[i].dataset.move = 'Cross'
            Gameboard.squares[i] = "Cross"

        },
        checkSquare: function (i) {    
            let squares = document.querySelectorAll('.square')
            if (squares[i].dataset.move) {return}
            if (!((this.turn)%2)) {this.addCross(i)}
            else {this.addCircle(i)}
            this.turn++ ;
            gameRules.checkWin() 
            if (((this.turn)%2) && gameRules.checkWin() == false) {AI.easy()}
        },
    }


let gameRules = (function () {
    let rowHorizontal = function() {
        if ((Gameboard.squares[6] == Gameboard.squares[7]) && (Gameboard.squares[8] == Gameboard.squares[7]) && (Gameboard.squares[7] != 0) || 
            Gameboard.squares[3] == Gameboard.squares[4] && Gameboard.squares[5] == Gameboard.squares[4] && Gameboard.squares[4] != 0 ||
            Gameboard.squares[0] == Gameboard.squares[1] && Gameboard.squares[2] == Gameboard.squares[1] && Gameboard.squares[1] != 0)
            {return "Winner"}
        return false
    }

    let rowVertical = ()=> {
        if (Gameboard.squares[6] == Gameboard.squares[3] && Gameboard.squares[0] == Gameboard.squares[3] && Gameboard.squares[0] != 0|| 
            Gameboard.squares[7] == Gameboard.squares[4] && Gameboard.squares[1] == Gameboard.squares[4] && Gameboard.squares[1] != 0 ||
            Gameboard.squares[8] == Gameboard.squares[5] && Gameboard.squares[2] == Gameboard.squares[5] && Gameboard.squares[2] != 0)
            {return "Winner"}
        return false}

    let rowDiagonal = ()=> {
        if (Gameboard.squares[6] == Gameboard.squares[4] && Gameboard.squares[2] == Gameboard.squares[4] && Gameboard.squares[2] != 0|| 
            Gameboard.squares[0] == Gameboard.squares[4] && Gameboard.squares[8] == Gameboard.squares[4] && Gameboard.squares[8] != 0 )
            {return "Winner"}
        return false}

    function check() {
       if( rowHorizontal()) {return true}
       if( rowVertical()) {return true}
       if( rowDiagonal()) {return true}
    }
    
    let checkWin = () => { if (check())
        {alert('YOU WON')}
        else {return false}
    }

    return {checkWin}})()


let gameFlow = (function(){
    let listener = function () {
        let squares = document.querySelectorAll('.square')
        for (let i=0; i<9 ; i++) {squares[i].addEventListener('click', () => move.checkSquare(i) )}
    }
    return {listener}
})()

let AI = {
    easy: function () {
        let squares = document.querySelectorAll('.square') ;
            let i = 0 
            function number () {i = Math.floor(Math.random()*9);
                if (squares[i].dataset.move) {number()}};
            number() ;
        move.checkSquare(i); console.log ('AI BROKEN?')
    },
    hard: function () {}
}