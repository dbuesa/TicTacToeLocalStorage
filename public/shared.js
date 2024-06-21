"use strict";
const currentPlayer = Math.floor(Math.random() * 2) + 1; // Genera un nombre aleatori entre 1 i 2 per determinar quin jugador comença la partida.
// @ts-ignore
let gameBoard;
let movements = [];
/**
 * Funció que s'executa quan la pàgina s'ha carregat completament.
 * Obre dues finestres amb el joc dels jugadors, que ocupen la meitat de l'amplada de la pantalla cadascuna.
 * Si no es pot obrir alguna de les finestres, es mostra un missatge d'error per consola.
 * Si ja hi ha una finestra oberta amb el joc, no s'obre cap altra finestra.
 */
alert(`Player ${currentPlayer} starts playing... Good luck!`);
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPlayerWindow = urlParams.has('player');
    // Reinicia el taulell de joc
    const restartButton = document.querySelector('#restart');
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
    // Comprova els moviments realitzats pels jugadors
    const checkMovesButton = document.querySelector('#moves');
    if (checkMovesButton) {
        checkMovesButton.addEventListener('click', checkMoves);
    }
    if (!isPlayerWindow) {
        try {
            const halfScreenWidth = window.screen.width / 2;
            const fullScreenHeight = window.screen.height;
            const player1Window = window.open(`player.html?player=1&currentPlayer=${currentPlayer}`, 'Player1', `width=${halfScreenWidth},height=${fullScreenHeight},left=0,top=0`);
            const player2Window = window.open(`player.html?player=2&currentPlayer=${currentPlayer}`, 'Player2', `width=${halfScreenWidth},height=${fullScreenHeight},left=${halfScreenWidth},top=0`);
            if (!player1Window || !player2Window) {
                console.error('No s\'han pogut obrir les finestres dels jugadors. IMPORTANT: Comprova que no tens cap bloquejador de finestres emergents activat.');
            }
        }
        catch (error) {
            console.error('Error a l\'obrir les finestres dels jugadors: ', error);
        }
    }
};
/**
 * Funció que emmagatzema el taulell de joc a localStorage.
 * Emmagatzema el taulell de joc a localStorage amb la clau 'gameBoard'.
 * Cada vegada que es fa un moviment, s'executa aquesta funció per emmagatzemar el nou estat del taulell de joc.
 */
function loadGameBoardFromLocalStorage() {
    const storedGameBoard = localStorage.getItem('gameBoard');
    if (storedGameBoard) {
        gameBoard = JSON.parse(storedGameBoard);
        refreshIndexBoard(gameBoard);
    }
}
/**
 * EventListener que comprova si el taulell de joc o els moviments dels jugadors han canviat.
 */
window.addEventListener('storage', (event) => {
    if (event.key === 'gameBoard') {
        loadGameBoardFromLocalStorage();
    }
    if (event.key === 'moves') {
        saveMoves();
    }
});
/**
 * Funció que actualitza el taulell de joc a la pàgina.
 * Recorre totes les cel·les del taulell i actualitza el seu contingut amb el valor corresponent del taulell de joc.
 * @param gameBoard Taulell de joc.
 */
function refreshIndexBoard(gameBoard) {
    const indexElements = document.querySelectorAll('.cell');
    indexElements.forEach((cell, index) => {
        cell.textContent = gameBoard[Math.floor(index / 3)][index % 3];
    });
}
/**
 * Funció que reinicia el taulell de joc.
 * Crea un nou taulell de joc buit i l'emmagatzema a localStorage.
 * Actualitza el taulell de joc a la pàgina i la llista de moviments.
 * Pregunta al jugador si està segur de reiniciar el joc per evitar reinicis accidentals.
 */
function restartGame() {
    const confirmation = confirm('Are you sure you want to restart the game?');
    if (confirmation) {
        gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        movements = [];
        localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
        localStorage.setItem('moves', JSON.stringify(movements));
        refreshIndexBoard(gameBoard);
    }
}
/**
 * Funció que emmagatzema els moviments realitzats pels jugadors.
 * Emmagatzema els moviments realitzats pels jugadors a localStorage amb la clau 'moves'.
 * Cada vegada que es fa un moviment, s'executa aquesta funció per emmagatzemar el nou moviment realitzat.
 */
function saveMoves() {
    const storedMoves = localStorage.getItem('moves');
    if (storedMoves) {
        movements = JSON.parse(storedMoves);
    }
}
/**
 * Funció que mostra els moviments realitzats pels jugadors.
 */
function checkMoves() {
    if (movements.length === 0) {
        alert('No movements yet!');
        return;
    }
    alert('Movements:\n' + movements.join(',\n'));
}
