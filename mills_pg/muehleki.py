
import random

def freie_pos(brett):
    """Eingabe unser brett. Es werden die Positionsnummern der
    freien Felder in einer Liste zurückgegeben
    """
    L = [brett.felder[j].color for j in range(len(brett.felder))]
    freie_pos = []
    for s in range(len(L)):
        if L[s]=='¤':
            freie_pos.append(s)
    return(freie_pos)

def meine_steine(color,brett):
    """Eingabe: Sei eine Farbe gegeben, 
    Ausgabe ist eine Liste mit Positionsnummern der jew. belegten Feldern.
    """
    A = []
    for j in range(len(brett.felder)):
        if brett.felder[j].color==color:
            A.append(j)
    return(A)

def moeglzuege(color,brett):
    """ 
    Input: a color (it will be the color of our player) and our board 
    Output: a list of possibe moves, i.e tuples (start, end) in a list
    """
    A = meine_steine(color,brett)
    kandidaten = []
    for s in range(len(A)):#gehe durch die moegl felder durch
        if brett.felder[A[s]].conn!=[]:
            kandidaten.append(A[s])
    #pruefe nun welche felder der kandidaten erreichbar sind.
    L = []
    for j in kandidaten:
        for stein in brett.felder[j].conn:
            if stein.color=='¤':
                L.append((j,stein.pos))
    return(L)

def moeglsprung(color,brett):
    """ 
    Input: a color and our board 
    Output: a list of possibe jumps, i.e tuples (start, end) in a list
    """
    kandidaten=[]
    #positions = a[2:len(a)]
    #positions = [brett.felder[j].pos for ]
    A = meine_steine(color,brett)
    for s in range(len(A)):#gehe durch die moegl felder durch
        kandidaten.append(A[s])
    #nun gehe durch alle Felder, auf die gesprungen werden kann
    L = []
    for j in kandidaten:
        for s in freie_pos(brett): 
            L.append((j,s))
    return(L)

def check_in_muehle(steinpos,brett):
    """ Eingabe der SteinPOSITION, Ausgabe, ob Stein in Mühle
    """
    for r in brett.reihen:
        if steinpos in [x.pos for x in r]:
            if check_muehle(r):
                return(True)
    return(False) 
def check_muehle(row):
    """Prueft fuer eine vorgegebene Reihe, ob die Reihe eine muehle ist
    """
    if row[0].color==row[1].color==row[2].color:
        if row[0].color=='$' or row[0].color=='£':
            return(True)
    return(False)

def wegn_gegner(color,brett):
    """
    Input: the color of the opponent and our board
    Output: a list of numbers of fields from where we can remove stones 
    """
    L = []
    for j in range(len(brett.felder)):
        if brett.felder[j].color == color:
            if check_in_muehle(j,brett)==False:
                L.append(j)
    return(L)


def ziehen( weiss, schwarz,brett):
    """ Funktion, die Zug ausführt und dabei schaut, welcher Zug auszuführen ist.
    """
    if weiss.state==1:
        player = weiss
        opponent = schwarz
    else:
        player = schwarz
        opponent = weiss
    spielfarbe = player.color#a[0]
    action  = player.action #a[1]
    if action=='legen':
        L = freie_pos(brett)
        #choose some allowed index
        index = random.choice(L)
        brett.felder[index].color = player.color
        player.shand -=1
        if player.shand==0:
            player.action = 'ziehen'
        return(index)
    elif action=='ziehen':
        if len(moeglzuege(spielfarbe,brett))==0:
            brett.gameover = True
            brett.reason = 'got_stuck'+player.color
            return('over')
        zug = random.choice(moeglzuege(spielfarbe,brett))
        start = zug[0]    
        end = zug[1]
        brett.felder[start].color= '¤'
        brett.felder[end].color = player.color

        return(start,end)
    elif action=='springen':

        sprung = random.choice(moeglsprung(spielfarbe,brett))
        start = sprung[0]    
        end = sprung[1]
        brett.felder[start].color= '¤'
        brett.felder[end].color = player.color
        return(start,end)


def wegnehmen(weiss, schwarz, brett):
    """ Input: the two players and the board
        Output, the function removes an opponent stone and returns the position 
    """
    if weiss.state==1:
        player = weiss
        opponent = schwarz
    else:
        player = schwarz
        opponent = weiss
    opponent.satall -=1

    L = wegn_gegner(opponent.color,brett)
    index = random.choice(L)
    brett.felder[index].color = '¤'
    return(index)
