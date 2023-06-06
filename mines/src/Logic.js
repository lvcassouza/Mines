//criando um array dentro de outro array para criar a linha e a coluna do 'tabuleiro de minas'
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_,column)=>{
            return {
                //aqui ele passa as propriedades do indice do array do tabuleiro
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

//clona o tabuleiro para nao interferir no estado inicial do proprio tabuleiro (board)
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}
//verifica se o vizinho é seguro, se o territorio proximo nao tem mina
const getNeighbors = (board, row, column) =>{
    const neighbor =[]
    const rows = [row-1, row, row+1]
    const columns = [column-1, column, column+1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length 

            if (diferent && validColumn && validRow) {
                neighbor.push(board[r][c])
            }
        })
    })
    return neighbor
}
//verifica se a vizinhanca é seguro, se os territorios proximos nao tem mina
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined

    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
    const field = board[row][column]
    //recursiva para abrir os territorios nao vizinhos de minas e nao minados
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        }else if (safeNeighborhood(board, row, column)){
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column))
        //caso a vizinhanca nao seja segura, ele calcula a quantidade de minas ao redor
        }else {
            const neighbor = getNeighbors(board , row, column)
            field.nearMines = neighbor.filter(n => n.mined).length
        }
    }
}

//percorre em todos os boards como se fosse apenas um array,junta todos os arrays em um array nao precisando percorrer linhas e colunas
const fields = board => [].concat(...board)
//verifica se houve explosao no campo
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0
//verifica se existe alguma mina 'pendente'de marcacao ou se existe algum campo a ser aberto
const pedding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)
//funcao de vitoria
const wonGame = board => fields(board).filter(pedding).length === 0
//monstra as minas no campo apos a derrota do jogador
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

export{
        createMinedBoard,
        cloneBoard,
        openField,
        hadExplosion,
        wonGame,
        showMines
    }