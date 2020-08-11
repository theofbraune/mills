#import muehlespiel as ms
#erzeuge eine Liste von den moeglichen Feldern, auf die man ziehen kann
import random
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

class spielfeld:
    """
    Wird ein Spiel gestartet, wird ein Spielfeld erzeugt. Solange bis Sieg; 
    - gameover: False oder True
    - felder auf dem Brett, abgeleitet von der Klasse Feld
    - Reihen: bestehend aus den jew. Feldern, die eine Reihe bilden
    """
    def __init__(self):
        self.gameover = False
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
            #print('a.pos',a.pos)
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
#global spielfarbe
#spielfarbe = '£'
global brett
brett = spielfeld()
#ms.play() 
"""a = open("datasave.txt","r").readlines()[0]
#action  = a[0]
positions = a[1:len(a)]
for s in range(len(brett.felder)):
    brett.felder[s].color = positions[s]"""

#print([positions,action])
def freie_pos(L):
    """Eingabe ein String, der aus ¤,£ und $ besteht. Dieser repräsentiert das Spielfeld. Es werden die Positionsnummern der
    freien Felder in einer Liste zurückgegeben
    """
    freie_pos = []
    for s in range(len(L)):
        if L[s]=='¤':
            freie_pos.append(s)
    return(freie_pos)

def meine_steine(color):
    """Eingabe: Sei eine Farbe gegeben, 
    Ausgabe ist eine Liste mit Positionsnummern der jew. belegten Feldern.
    """
    A = []
    for j in range(len(brett.felder)):
        if brett.felder[j].color==color:
            A.append(j)
    return(A)

def moeglzuege(color):
    A = meine_steine(color)
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

def moeglsprung(color):
    kandidaten=[]
    positions = a[2:len(a)]
    A = meine_steine(color)
    for s in range(len(A)):#gehe durch die moegl felder durch
        kandidaten.append(A[s])
    #nun gehe durch alle Felder, auf die gesprungen werden kann
    L = []
    for j in kandidaten:
        for s in freie_pos(positions): 
            L.append((j,s))
    return(L)

def check_in_muehle(steinpos):
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
        return(True)
    else:
        return(False)

def wegn_gegner(color):
    """Eine Farbe wird eingegeben. 
    Ausgabe ist eine Liste mit Feldnummern, welche Steine entfernt werden können. 
    """
    L = []
    for j in range(len(brett.felder)):
        if brett.felder[j].color == color:
            if check_in_muehle(j)==False:
                L.append(j)
    return(L)

    


def ziehen():
    """ Funktion, die Zug ausführt und dabei schaut, welcher Zug auszuführen ist.
    """
    global a
    a = open("datasave.txt","r").readlines()[0]
    global spielfarbe
    spielfarbe = a[0]
    action  = a[1]
    positions = a[2:len(a)]
    for s in range(len(brett.felder)):
        brett.felder[s].color = positions[s]
    if action=='l':
        L = freie_pos(positions)
        return(random.choice(L))
    elif action=='z':
        """A = meine_steine('£')
        kandidaten = []
        for s in range(len(A)):#gehe durch die moegl felder durch
            if brett.felder[A[s]].conn!=[]:
                kandidaten.append(A[s])
        #pruefe nun welche felder der kandidaten erreichbar sind.
        moeglzuege = []
        for j in kandidaten:
            for stein in brett.felder[j].conn:
                if stein.color=='¤':
                    moeglzuege.append((j,stein.pos))"""
        #zug = random.choice(moeglzuege('£'))
        zug = random.choice(moeglzuege(spielfarbe))
        startstein = zug[0]    
        endstein = zug[1]
        #print('start',startstein,'ende',endstein)
        return(startstein,endstein)
    elif action=='s':
        """kandidaten=[]
        A = meine_steine('£')
        for s in range(len(A)):#gehe durch die moegl felder durch
            kandidaten.append(A[s])
        #nun gehe durch alle Felder, auf die gesprungen werden kann
        moeglzuege = []
        for j in kandidaten:
            for s in freie_pos(positions): 
                moeglzuege.append((j,s))"""
        #sprung = random.choice(moeglsprung('£'))
        sprung = random.choice(moeglsprung(spielfarbe))
        #print('start',sprung[0],'ende',sprung[1])
        return(sprung)
        #print('jetzt musst du ziehen')


def wegnehmen():
    if spielfarbe=='£':
        L = wegn_gegner('$')
    else:
        L = wegn_gegner('£')
    return(random.choice(L))
