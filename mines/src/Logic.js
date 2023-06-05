//criando um array dentro de outro array para criar a linha e a coluna do 'tabuleiro de minas'
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_,column)=>{
            return {
                //aqui ele passa as propriedades do indice do array
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    //executa o while ate a quantidade de minas plantadas ser igual de minas exigidas para ser plantada
    while (minesPlanted < minesAmount ) {
        //gerando aleatoriamente as bombas nas linhas
        const rowSel = parseInt(Math.random() * rows, 10)
        //gerando aleatoriamente as bombas nas colunas
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

//cria o tabuleiro ja com as minas plantadas
const createMinedBoard = (rows,columns,minesAmount) => {
    const board = createBoard(rows,columns)

    spreadMines(board,minesAmount)

    return board
}

export{createMinedBoard}