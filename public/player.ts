// @ts-ignore
let gameBoard: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let moves: string[] = [];

/**
 * Función que s'executa quan la pàgina s'ha carregat completament.
 * Actualitza el títol de la página amb el número del jugador.
 * Mostra un missatge d'inici de partida depenent del jugador que comença.
 * Afegeix un event listener a cada cel·la del taulell per detectar els clics dels jugadors.
 * Cada vegada que es fa un clic en una cel·la, s'executa la funció makeMove amb la posició de la cel·la.
 */
window.onload = (): void => {
    localStorage.clear();
    const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    const player: string | null = urlParams.get('player');
    const currentPlayer: string | null = urlParams.get('currentPlayer');
    console.log(player, currentPlayer);

    localStorage.setItem('currentPlayer', currentPlayer!);

    if (player) {
        const titleElement: HTMLElement | null = document.querySelector('h1');
        if (titleElement) {
            titleElement.textContent = `TIC TAC TOE - Player ${player}`;
        }
    }
    if (currentPlayer === '1') {
        alert('Player 1 starts playing... Good luck!')
    } else if (currentPlayer === '2') {
        alert('Player 2 starts playing... Good luck!')
    }
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const position: string | null = cell.getAttribute('data-position');
            if (position) {
                makeMove(position);
            }
        });
    });

    const h3Element: HTMLElement = document.createElement('h3');
    document.querySelector('#player-board')?.appendChild(h3Element);

    // Agregar un evento de escucha para el evento 'storage'
    window.addEventListener('storage', (event) => {
        if (event.key === 'currentPlayer') {
            h3Element.textContent = `Player ${event.newValue}'s turn`;
        }
    });
    setInterval(checkGameState, 1000);
};

/**
 * Funció que comprova si el taulell de joc ha canviat.
 * Comprova si el taulell de joc emmagatzemat a localStorage és diferent del taulell de joc actual.
 * Si el taulell de joc ha canviat, actualitza el taulell de joc amb el nou taulell emmagatzemat.
 */
function checkGameState(): void {
    const storedGameBoard: string | null = localStorage.getItem('gameBoard');
    if (storedGameBoard) {
        const newGameBoard = JSON.parse(storedGameBoard);
        if (JSON.stringify(gameBoard) !== JSON.stringify(newGameBoard)) {
            gameBoard = newGameBoard;
            refreshBoard();
        }
    }
}

/**
 * Funció que actualitza el taulell de joc a la pàgina web.
 * Recorre totes les cel·les del taulell i actualitza el seu contingut amb el valor corresponent del taulell de joc.
 * Si una cel·la té un valor buit, s'actualitza amb una cadena buida.
 * Si una cel·la té un valor diferent de buit, s'actualitza amb el valor corresponent ('X' o 'O').
 * Aquesta funció s'executa cada vegada que es realitza un moviment vàlid.
 */
function refreshBoard(): void {
    gameBoard.forEach((row: string[], rowIndex: number): void => {
        row.forEach((cell: string, cellIndex: number): void => {
            const cellElement: Element | null = document.querySelector(`.cell[data-position="${String.fromCharCode(65 + rowIndex)}${cellIndex + 1}"]`);
            if (cellElement) {
                cellElement.textContent = cell;
            }
        });
    });
}

/**
 * Funció que s'executa quan un jugador fa un moviment.
 * Aquesta funció actualitza el taulell de joc amb el moviment del jugador.
 * Comprova si el moviment és vàlid i si el jugador guanya la partida.
 * Si el moviment és vàlid i no hi ha guanyador, canvia el jugador actual i actualitza el taulell de joc.
 * Si el moviment és vàlid i hi ha guanyador, mostra un missatge amb el jugador guanyador i reinicia el taulell de joc.
 * @param position Posició de la cel·la on es vol fer el moviment.
 */
function makeMove(position: string): void {
    const currentPlayer: string | null = localStorage.getItem('currentPlayer');
    const player: string | null = new URLSearchParams(window.location.search).get('player');

    // Verificar si el jugador que intenta fer el moviment és el jugador actual
    if (player !== currentPlayer) {
        alert(`It's not your turn, player ${player}!`);
        return;
    }

    const row: number = position.charCodeAt(0) - 65; // 'A' -> 0, 'B' -> 1, 'C' -> 2
    const column: number = parseInt(position[1]) - 1; // '1' -> 0, '2' -> 1, '3' -> 2

    if (gameBoard[row][column] !== '') {
        alert('Invalid move! Cell already taken.');
        return;
    }

    // Assignar 'X' o 'O' basat en el jugador actual
    gameBoard[row][column] = player === '1' ? 'X' : 'O';

    localStorage.setItem('gameBoard', JSON.stringify(gameBoard));

    const moveDescription:string = `Player ${currentPlayer} moved to position ${position}`;
    const movements: string[] = JSON.parse(localStorage.getItem('moves') || '[]');
    movements.push(moveDescription);
    localStorage.setItem('moves', JSON.stringify(movements));

    // Comprovar si hi ha un guanyador
    const winner: string | null = checkWinner();
    if (winner) {
        alert(`Player ${winner === 'X' ? '1' : '2'} has won the game!\nPlay again! Player ${player} starts playing... Good luck!`);
        gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
        refreshBoard();
        return;
    }
    // Comprovar si hi ha un empat
    const draw: boolean = checkDraw();
    if (draw) {
        alert('The game is a draw!');
        gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        localStorage.setItem('gameBoard', JSON.stringify(gameBoard));

        refreshBoard();
        return;
    }

    // Canviar el jugador actual en localStorage
    const nextPlayer: "1" | "2" = player === '1' ? '2' : '1';
    localStorage.setItem('currentPlayer', nextPlayer);

    const h3Element: HTMLElement | null = document.querySelector('h3');
    if (h3Element) {
        h3Element.textContent = `Player ${nextPlayer}'s turn`;
    }
    refreshBoard();
}

/**
 * Funció que comprova si hi ha un guanyador en el taulell de joc.
 * @returns Jugador guanyador ('X' o 'O') o null si no hi ha guanyador.
 */
function checkWinner(): string | null {
    const winningCombinations: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // files
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnes
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i: number = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        const rowA: number = Math.floor(a / 3);
        const colA: number = a % 3;
        const rowB: number = Math.floor(b / 3);
        const colB: number = b % 3;
        const rowC: number = Math.floor(c / 3);
        const colC: number = c % 3;

        if (gameBoard[rowA][colA] && gameBoard[rowA][colA] === gameBoard[rowB][colB] && gameBoard[rowA][colA] === gameBoard[rowC][colC]) {
            return gameBoard[rowA][colA];
        }
    }
    return null;
}

/**
 * Funció que comprova si totes les cel·les del taulell estan plenes.
 * @returns true si hi ha un empat, false si no hi ha un empat.
 */
function checkDraw(): boolean {
    for (let row of gameBoard) {
        for (let cell of row) {
            if (cell === '') {
                return false; // Si hi ha alguna cel·la buida, no és un empat
            }
        }
    }
    return true; // Si totes les cel·les estan plenes, és un empat
}
