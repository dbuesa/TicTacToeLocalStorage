# TIC TAC TOE

## Funcionament

- Onload:

Quan la pàgina principal es carrega (index.html), s'elegeix un número randomitzat entre 1 i 2 per elegir el jugador que començarà la partida. S'executen dues noves finestres per als jugadors. El paràmetre currentPlayer indica qui comença la partida. També ens serveix per informar els jugadors. En aquest procés també s'activen els listeners, com el de reiniciar el joc, clicar les caselles per jugar, així com es crea un h3 a l'html dels jugadors per indicar a quin jugador li toca fer la jugada (és dinàmic).

- Moviments:

L'aplicació comprova a quin jugador li toca jugar. No deixarà posicionar-se en una casella ja marcada. Guardarà en localStorage els moviments per a refrescar el taulell de joc a ambdós jugadors. Així mateix, es guardarà en un array de tots els moviments realitzats pels jugadors perquè després l'administrador pugui veure la llista d'aquests. Es comprova si hi ha hagut un guanyador o s'ha empatat en cada moviment.

* Reiniciar el joc buidarà tots els taulells i la llista de moviments.

* S'ha contemplat l'opció de posar un botó a la finestra principal que obri dues noves pestanyes per si un cas algun dels jugadors tanca la seva sense voler, però s'ha descartat perquè reiniciant la pàgina ja s'obre de nou.

* Fins que els dos jugadors no hagin tancat l'alerta inicial, no es pot començar la partida (és una mena de semàfor).

* Quan un jugador guanya s'indica el guanyador i es reinicia la partida, així com si hi ha un empat.


**David Buesa Lorente.**