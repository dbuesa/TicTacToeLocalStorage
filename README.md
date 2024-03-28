# TIC TAC TOE

## Funcionament

- Onload:

Quan la pàgina principal es carrega (index.html), s'elegeix un número randomitzat entre 1 i 2 per elegir el jugador que començarà la partida. S'executen dues noves finestres per als jugadors. El paràmetre currentPlayer indica qui comença la partida. També ens serveix per informar als jugadors. En aquest procés també s'activen els listeners, com el de reiniciar el joc, clicar les caselles per jugar, etc.

- Moviments:

L'aplicació comprova a quin jugador li toca jugar. No deixarà posicionar-se en una casella ja marcada. Guardarà en localStorage els moviments per a refrescar el taulell de joc a ambdós jugadors. Així mateix, es guardarà en un array de moviments tots els moviments realitzats per els jugadors per a que després l'administrador pugui veure la llista d'aquests. Es comprova si hi ha hagut un guanyador o s'ha empatat en cada moviment.

Reiniciar el joc buidarà tots els taulells i la llista de moviments.


David Buesa Lorente.