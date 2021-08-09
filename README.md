This is my implementation of the game 9 men's morris/ mills/ or Mühle in German.


Currently there are two versions and the browser version is in development. One text based version in the terminal with guidance in german and a pygame version in english.
You can start the terminal version by opening the program "muehlespiel.py" in the interactive mode, i.e in the terminal you will need to type

$ python3 -i muehlespiel.py

then start the main game loop with play().

The pygame version can be started by 
$python3 mills_pygame.py

Note that we do not need to open the interactive mode.

The structure of both versions is similar. There is a Visualization, a programm for the data structure of the board and the players and a main game loop. The AI program is identical for both. Currently it is only possible to play against a random AI.

It is now possible to play in the browser, but the AI is not working yet. So far the browser version is 100% in Javascript.
