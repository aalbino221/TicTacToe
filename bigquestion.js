let Gameboard = {
    squares: {a3:0,b3:0,c3:0,
              a2:0,b2:0,c2:0,
              a1:0,b1:0,c1:0},
}

let move = {
    addCircle: function (i) {
    let squares = document.querySelectorAll('.square')
    let newMove = document.createElement('div')
    newMove.classList.add('circle')
    squares[i].append(newMove)
    squares[i].dataset.move = 'Circle'
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
},
    checkSquare: function (i) {    
        let squares = document.querySelectorAll('.square')
        if (squares[i].dataset.move) {return}
        this.addCross(i)}
}

let listener = function () {
    let squares = document.querySelectorAll('.square')
     for (let i=0; i<9 ; i++) {squares[i].addEventListener('click', ()=> move.checkSquare(i))}
}



let gameRules = {
    rowHorizontal: ()=> {
        if (Gameboard.squares.a1 == Gameboard.squares.b1 && Gameboard.squares.c1 == Gameboard.squares.b1 || 
            Gameboard.squares.a2 == Gameboard.squares.b2 && Gameboard.squares.c2 == Gameboard.squares.b2 ||
            Gameboard.squares.a3 == Gameboard.squares.b3 && Gameboard.squares.c3 == Gameboard.squares.b3 )
            {return "Winner"}
        return false
    },

    rowVertical: ()=> {
        if (Gameboard.squares.a1 == Gameboard.squares.a2 && Gameboard.squares.a3 == Gameboard.squares.a2 || 
            Gameboard.squares.b1 == Gameboard.squares.b2 && Gameboard.squares.b3 == Gameboard.squares.b2 ||
            Gameboard.squares.c1 == Gameboard.squares.c2 && Gameboard.squares.c3 == Gameboard.squares.c2 )
            {return "Winner"}
        return false},

    rowDiagonal: ()=> {
        if (Gameboard.squares.a1 == Gameboard.squares.b2 && Gameboard.squares.c3 == Gameboard.squares.b2 || 
            Gameboard.squares.a3 == Gameboard.squares.b2 && Gameboard.squares.c1 == Gameboard.squares.b2  )
            {return "Winner"}
        return false},

    check: () => {
       let self = this
       console.log
       if(self.rowHorizontal()) {return true}
       if(self.rowVertical()) {return true}
       if(self.rowDiagonal()) {return true}
    },
    
    checkWin: () => { if (check())
        {alert('YOU WON')}
    }}

 /*/   let gameRules = {
        rowHorizontal: function() {
            if (Gameboard.squares.a1 == Gameboard.squares.b1 && Gameboard.squares.c1 == Gameboard.squares.b1 || 
                Gameboard.squares.a2 == Gameboard.squares.b2 && Gameboard.squares.c2 == Gameboard.squares.b2 ||
                Gameboard.squares.a3 == Gameboard.squares.b3 && Gameboard.squares.c3 == Gameboard.squares.b3 )
                {return "Winner"}
            return false
        },
    
        rowVertical: function () {
            if (Gameboard.squares.a1 == Gameboard.squares.a2 && Gameboard.squares.a3 == Gameboard.squares.a2 || 
                Gameboard.squares.b1 == Gameboard.squares.b2 && Gameboard.squares.b3 == Gameboard.squares.b2 ||
                Gameboard.squares.c1 == Gameboard.squares.c2 && Gameboard.squares.c3 == Gameboard.squares.c2 )
                {return "Winner"}
            return false},
    
        rowDiagonal: function () {
            if (Gameboard.squares.a1 == Gameboard.squares.b2 && Gameboard.squares.c3 == Gameboard.squares.b2 || 
                Gameboard.squares.a3 == Gameboard.squares.b2 && Gameboard.squares.c1 == Gameboard.squares.b2  )
                {return "Winner"}
            return false},
    
        check: function () {
           let self = this
           console.log(self)
           if(self.rowHorizontal()) {return true}
           if(self.rowVertical()) {return true}
           if(self.rowDiagonal()) {return true}
        },
        
        checkWin: function (){ if (check())
            {alert('YOU WON')}
        }} \\