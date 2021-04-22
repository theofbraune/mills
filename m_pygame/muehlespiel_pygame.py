#import muehlespiel_brett
import muehleki

class feld:
    """ Beschreibung der einzelnen Felder auf dem Brett mit den Eigenschaften:
    -Position (spaeter dann 0-23)
    -color = der Farbe von dem Stein, die gerade auf dem Feld liegt
    - conn ist die Liste der angrenzenden Felder
    """
    def __init__(self,color,position):
        self.color = color
        self.pos = position
        self.conn = []
class player:
    """ Der jeweilige spieler mit den wichtigen Informationen:
    - aktion: Legen, Ziehen oder Springen
    - shand: Anzahl der steine auf der Hand
    - satall: Gesamtanzahl der Steine vom jew. spieler
    - color: Steinfarbe
    - state: Ist man gerade dran oder nicht 1 heisst man ist dran, 0 nicht
    - human: Spielt man gegen einen Mensch oder KI. mittels True and False
    """
    def __init__(self,color,human): 
        self.action = 'legen'
        self.shand = 9
        self.satall = 9
        self.color = color
        self.human = human
        if self.color =='£':
            self.state = 1 #1 dran, 0 nicht dran
        else:
            self.state = 0
class spielfeld:
    """
    Wird ein Spiel gestartet, wird ein Spielfeld erzeugt. Solange bis Sieg; 
    - gameover: False oder True
    - felder auf dem Brett, abgeleitet von der Klasse Feld
    - Reihen: bestehend aus den jew. Feldern, die eine Reihe bilden
    """
    def __init__(self):
        self.gameover = False
        self.reason = ''
        self.felder = [feld('¤',i) for i in range(24)]
        self.reihen = [(self.felder[0],self.felder[1],self.felder[2]), #aeusserer Ring
        (self.felder[0],self.felder[7],self.felder[6]),
        (self.felder[2],self.felder[3],self.felder[4]),
        (self.felder[6],self.felder[5],self.felder[4]),

        (self.felder[8],self.felder[15],self.felder[14]), #mittlerer Ring
        (self.felder[8],self.felder[9],self.felder[10]),
        (self.felder[10],self.felder[11],self.felder[12]),
        (self.felder[14],self.felder[13],self.felder[12]),

        (self.felder[16],self.felder[23],self.felder[22]), #innerer Ring
        (self.felder[16],self.felder[17],self.felder[18]),
        (self.felder[18],self.felder[19],self.felder[20]),
        (self.felder[22],self.felder[21],self.felder[20]),

        (self.felder[7],self.felder[15],self.felder[23]), #verbindende Reihen
        (self.felder[1],self.felder[9],self.felder[17]),
        (self.felder[19],self.felder[11],self.felder[3]),
        (self.felder[21],self.felder[13],self.felder[5])
        ]
        for a in self.felder[:23]:
            if a.pos%2==0:
                a.conn = [self.felder[a.pos-1],self.felder[a.pos+1]]
            if a.pos%2==1:
                if int(a.pos/8)==0:
                    a.conn = [self.felder[a.pos-1],self.felder[a.pos+1],self.felder[a.pos+8]]
                if int(a.pos/8)==1:
                    a.conn = [self.felder[a.pos-1],self.felder[a.pos+1],self.felder[a.pos+8],self.felder[a.pos-8]]
                if int(a.pos/8)==2:
                    a.conn = [self.felder[a.pos-1],self.felder[a.pos+1],self.felder[a.pos-8]]
            if (a.pos)%8==0:
                a.conn = [self.felder[(a.pos-1)+8],self.felder[a.pos+1]]
            
            self.felder[7].conn = [self.felder[0],self.felder[6],self.felder[15]]
            self.felder[15].conn= [self.felder[7],self.felder[8],self.felder[14],self.felder[15],self.felder[23]]
            self.felder[23].conn= [self.felder[15],self.felder[16],self.felder[22]]




def check_correctness(weiss,schwarz,brett,pos):
    """ Input: both of the players, the board and the desired position/tuple. We check whether this is possible and Output True of False
    """
    if weiss.state==1:
        player=weiss
    else:
        player=schwarz
    
    if player.action =='legen':
        if brett.felder[pos].color=='¤':
            return(True)
    if player.action=='ziehen':
        start = pos[0]
        end = pos[1]
        if brett.felder[start].color==player.color and brett.felder[end].color == '¤':
            if brett.felder[end] in brett.felder[start].conn:
                return(True)
    if player.action=='springen':
        start = pos[0]
        end = pos[1]
        if brett.felder[start].color==player.color and brett.felder[end].color == '¤':
            return(True)
    return(False)

    
def turn_lay(weiss,schwarz,brett,pos):
    """Input the two players and the board. Furthermore the move, i.e the position as integer. We check this before, so the position will be correct.
    """
    if weiss.state==1:
        player=weiss
        opponent = schwarz
    else:
        player=schwarz
        opponent =weiss
    brett.felder[pos].color = player.color
    player.shand -=1
    if player.shand==0:
        player.action = 'ziehen'
    
    
        
def turn_move(weiss,schwarz,brett,pos):
    """Input the two players and the board. Furthermore the move, i.e the positions as integer tuple. We check this before, so the position will be correct.
    """
    if weiss.state==1:
        player=weiss
        opponent = schwarz
    else:
        player=schwarz
        opponent =weiss
    start = pos[0]
    end = pos[1]
    brett.felder[start].color = '¤' 
    brett.felder[end].color = player.color 

def check_new_mill(brett_alt,brett_neu):
    """ Input: the old board, the new board. Check whether there are any new mills.
        Output: False, if not. If yes return (true)
    """
    for j in range(len(brett_neu.reihen)):
        if check_muehle(brett_neu.reihen[j])==True and check_muehle(brett_alt.reihen[j])==False:
            return(True)
    return(False)

def check_in_muehle(steinpos,brett):
    """ Eingabe der SteinPOSITION,und des brettes. Ausgabe, ob Stein in Mühle
    """
    for r in brett.reihen:
        if steinpos in [x.pos for x in r]:
            if check_muehle(r):
                return(True)
    return(False) 

def check_muehle(row):
    """Prueft fuer eine vorgegebene Reihe, ob die Reihe eine muehle ist
    """
    #if not row[0].color=='¤':
    if row[0].color==row[1].color==row[2].color:
        if row[0].color=='$' or row[0].color=='£':
            return(True)
    return(False)

def zug_möglich(weiss,schwarz,brett):
    """
    bekommt die gesamtsituation uebergeben, schaut, ob Zug moeglich ist
    """
    if weiss.state==1:
        spieler=weiss
    else: 
        spieler=schwarz
    for y in brett.felder:
        if y.color==spieler.color:
            if '¤' in [s.color for s in y.conn]:
                return(True)
    return(False)

def wegnehmen_möglich(weiss,schwarz,brett):
    """prueft, ob alle Steine des Gegners in muehlen sind
    """
    if weiss.state==0:
        gegner=weiss
    else: 
        gegner=schwarz
    
    for y in brett.felder:
        if y.color==gegner.color:
            
            if check_in_muehle(y.pos,brett)==False:
                return(True)
    return(False)

def dataexchange(brett,weiss,schwarz):
    """Überschreiben der Informationen in eine Datei. Diese wird 'datasave.txt' genannt, farbe, wer gerade dran ist, aktion, brettfarbe
    """
    L = brett.felder
    l = ''
    if weiss.state==1:
        l+=weiss.color
        if weiss.action=='legen':
            l+='l'
        elif weiss.action=='springen':
            l+='s'
        elif weiss.action=='ziehen':
            l+='z'
    else:#schwarz ist also dran
        l+=schwarz.color
        if schwarz.action=='legen':
            l+='l'
        elif schwarz.action=='springen':
            l+='s'
        elif schwarz.action=='ziehen':
            l+='z'

    for b in L:
        l+=b.color
    f = open("datasave.txt","w")
    f.write(l)
    