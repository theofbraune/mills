import muehlespiel_brett
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


"""weiss = player('£')
schwarz = player('$')
brett = spielfeld()"""

#brett.felder[0].color = '$'
#brett.felder[7].color = '$'
#brett.felder[6].color = '$'
#brett.felder[1].color = '$'
#muehlespiel_brett.zeichnen(brett,weiss,schwarz)
"""def reset():
    weiss = player('£')
    schwarz = player('$')
    brett = spielfeld()"""
print('Du kannst das Spiel starten, inden du play() eingibst')
#def truetest():
#    return(muehleki.test())
def zug(weiss, schwarz,brett):
    
    #schaue zunaechst wer ziehen muss, drucke notification 
    
    if weiss.state==1:
        print(weiss.color,'ist dran und muss',weiss.action)
    else:
        print(schwarz.color,'ist dran und muss',schwarz.action)
    
    gesetzt= 'f' #wichtig um mühlen zu checken
    global spieler
    if weiss.state == 1:
        spieler = weiss
        gegner = schwarz
    else:
        spieler = schwarz
        gegner = weiss
    # pruefe, welche aktion der spieler in diesen Zug ausfurhren muss, ziehen, legen oder springen
    if spieler.shand!=0:
        spieler.action = 'legen'
    elif spieler.shand==0 and spieler.satall>3:
        spieler.action = 'ziehen'
    elif spieler.satall==3:
        spieler.action = 'springen'
    # unterscheide jetzt ob man eine KI oder einen human hat
    # bringe der KI bei nur auf erlaubte Felder zu ziehen
    if spieler.human ==False:
        #print('müsste zug machen')
        dataexchange(brett,weiss,schwarz)
        if spieler.action=='legen':
            eingabe = muehleki.ziehen()
            brett.felder[eingabe].color = spieler.color
            muehlespiel_brett.zeichnen(brett,weiss,schwarz)
            spieler.shand-=1
            gesetzt=eingabe
            if spieler.shand==0:
                spieler.action = 'ziehen'
        elif spieler.action=='ziehen':
            dataexchange(brett,weiss,schwarz)
            if zug_möglich(weiss,schwarz,brett)==False:
                brett.gameover=True
                print('Kein Zug mehr möglich')
                return(spieler)
            else:
                a = muehleki.ziehen()
                start = a[0]
                ende = a[1]
                brett.felder[ende].color = spieler.color
                brett.felder[start].color = '¤'
                muehlespiel_brett.zeichnen(brett,weiss,schwarz)
                gesetzt=ende
        elif spieler.action=='springen':
            a = muehleki.ziehen()
            start = a[0]
            ende = a[1]
            brett.felder[ende].color = spieler.color
            brett.felder[start].color = '¤'
            muehlespiel_brett.zeichnen(brett,weiss,schwarz)
            gesetzt=ende
            #print(x)
    else:
        if spieler.action =='legen':
            korrekt = False
            """Decke den Fall Legen ab. Lasse ein Feld eingeben. Schaue, ob das Feld belegt ist oder ausser reichweite
            """
            eingabe = int(input('Auf welches Feld (0-23) willst du setzen? '))
            while korrekt==False:
                if eingabe > 23 or eingabe<0:
                    eingabe = int(input('Unzul. Bereich. Auf welches Feld (0-23) willst du setzen? '))
                elif eingabe<=23 and eingabe>0 and brett.felder[eingabe].color !='¤':
                    eingabe = int(input('Feld ist belegt. Auf welches Feld (0-23) willst du setzen? '))
                else:
                    korrekt=True  
            brett.felder[eingabe].color = spieler.color
            spieler.shand-=1
            muehlespiel_brett.zeichnen(brett,weiss,schwarz)
            gesetzt = eingabe
            ende = gesetzt
            if spieler.shand==0:
                spieler.action = 'ziehen'
                #spieler.action = 'springen' 
        
        elif spieler.action == 'ziehen':
            if zug_möglich(weiss,schwarz,brett)==False:
                brett.gameover=True
                print('Kein Zug mehr möglich')
                return(spieler)
            else:
                start = int(input('Welchen Stein möchtest du verschieben? '))
                bkorrekt = False
                #checke gueltigkeit
                while bkorrekt==False:
                    #print([s.col for s in brett.felder[start].conn])
                    if start > 23 or start<0:
                        #print('b')
                        start = int(input('Unzul. Bereich. Welchen Stein willst du verschieben? '))
                    elif brett.felder[start].color!=spieler.color:
                        #print('a')
                        start=int(input('Unzul. Stein/Feld. Welchen Stein möchtest du verschieben? '))
                    
                    elif '¤' not in [s.color for s in brett.felder[start].conn]:# moeglich Stein ueberhaupt zu versch. ?
                        #print('c')
                        start = int(input('Stein ist nicht bewegbar. Welchen Stein willst du verschieben? '))
                    else:
                        #print('d')
                        bkorrekt=True
                bhelp = False
                ende = int(input('Auf welches Feld willst du ziehen? '))
                while bhelp==False:
                    if brett.felder[ende] not in brett.felder[start].conn:
                        ende=int(input('Feld ist nicht erreichbar. Auf welches Feld willst du ziehen? '))
                    elif brett.felder[ende].color!='¤':
                        ende = int(input('Feld ist blockiert. Auf welches Feld willst du ziehen? '))
                    else: 
                        bhelp=True
                gesetzt=ende
                brett.felder[ende].color = spieler.color
                brett.felder[start].color = '¤'
                muehlespiel_brett.zeichnen(brett,weiss,schwarz)
        
        elif spieler.action == 'springen':
            start = int(input('Welchen Stein möchtest du wegspringen lassen? '))
            bhelp = False
            while bhelp == False:
                #print(':)')
                if start > 23 or start<0:
                    #print('b')
                    start = int(input('Unzul. Bereich. Welchen Stein willst du wegspringen lassen? '))
                elif brett.felder[start].color!=spieler.color:
                    #print('a')
                    start=int(input('Unzul. Stein/Feld. Welchen Stein möchtest du wegspringen lassen? '))
                
                else:
                    bhelp = True
            bhelp = False
            ende = int(input('Auf welches Feld willst du springen? '))
            while bhelp==False:
                if ende > 23 or ende<0:
                    ende = int(input('Unzul. Bereich. Auf welches Feld willst du springen? '))
                elif brett.felder[ende].color!='¤':
                    ende = int(input('Feld ist blockiert. Auf welches Feld willst du springen? '))
                
                else:
                    bhelp = True
            gesetzt=ende

            brett.felder[ende].color = spieler.color
            brett.felder[start].color = '¤'

        muehlespiel_brett.zeichnen(brett,weiss,schwarz)

    #print(gesetzt)
    #pruefe muehle 
    for r in brett.reihen:
        #print(':-)')
        if (gesetzt in [s.pos for s in r]) and check_muehle(r):
            #checke alle steine in muehle
            # ja, blöd gelaufen
            # nein...
            print('!!!M!!!')
            if spieler.human==False:
                if wegnehmen_möglich(weiss,schwarz,brett)==False:
                    print('Du hast eine Mühle, kannst aber keinen Stein entfernen')
                else:
                    #print('Fall 1')
                    stein = muehleki.wegnehmen()
                    print('Die KI hat den Stein',stein,'weggenommen.')
                    brett.felder[stein].color = '¤'
                    muehlespiel_brett.zeichnen(brett,weiss,schwarz)
                    gegner.satall-=1
                    if gegner.satall==3:
                        gegner.action = 'springen'
                    if gegner.satall<3:
                        brett.gameover = True
                        return(spieler)
            else:
                if wegnehmen_möglich(weiss,schwarz,brett)==False:
                    print('Du hast eine Mühle, kannst aber keinen Stein entfernen')
                else:  
                    stein = int(input('Du hast eine Mühle. Welchen Stein willst du entfernen? '))
                    bhelp = False
                    while bhelp==False:
                        if brett.felder[stein].color!=gegner.color:
                            stein = int((input('Das ist kein gegnerischer Stein. Welchen Stein willst du entfernen? ')))
                        elif stein>23 or stein<0:
                            stein = int((input('Falscher Bereich. Welchen Stein willst du entfernen? ')))
                        elif check_in_muehle(stein):
                            stein = int((input('Du darfst aus keiner Mühle entfernen. Welchen Stein willst du entfernen? ')))
                        else:
                            bhelp=True
                    brett.felder[stein].color = '¤'
                    muehlespiel_brett.zeichnen(brett,weiss,schwarz)
                    gegner.satall-=1
                    if gegner.satall==3:
                        gegner.action = 'springen'
                    if gegner.satall<3:
                        brett.gameover = True
                        return(spieler)
    weiss.state,schwarz.state = schwarz.state,weiss.state
            



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
    print(gegner.color,gegner.state)
    for y in brett.felder:
        if y.color==gegner.color:
            #print(y.pos)
            #print('in muehle',check_in_muehle(y.pos))
            if check_in_muehle(y.pos)==False:
                #print(check_in_muehle(y.pos))
                #print(y.color)
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
   
def play():
    #reset()
    print('Du spielst mit $ gegen £.')

    x = input('Möchtest du gegen eine KI spielen? (Y/N)')
    global weiss
    global schwarz
    if x=='Y':
        weiss = player('£',False)
    else:
        weiss = player('£',True)
    schwarz = player('$',True)
    if x=='N':
        z = input('Sollen 2 KIs gegeneinander spielen? (Y/N)')
        if z=='Y':
            weiss= player('£',False)
            schwarz= player('$',False)
    y = input('Möchtest du beginnen? (Y/N)')
    if y=='Y':
        schwarz.state = 1
        weiss.state = 0
    else:
        schwarz.state = 0
        weiss.state = 1
    #testumgebung
    """
    weiss= player('£',False)
    schwarz= player('$',False)
    schwarz.state = 1
    weiss.state = 0
    """
    global brett
    brett = spielfeld()
    muehlespiel_brett.zeichnen(brett,weiss,schwarz)
    counter  = 0
    brett.gameover = False
    dataexchange(brett,weiss,schwarz)
    while brett.gameover==False:
        counter+=1
        a=zug(weiss,schwarz,brett)
    #reset()
    return(a.color,counter)
    #print('Gratulation!!',a.color,'hat gewonnen')
    again = input('Möchtest du nochmal? (Y/N)')
    if again == 'Y':
        play()
    else:
        exit()

