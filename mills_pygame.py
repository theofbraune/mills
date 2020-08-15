import pygame 
import math as m 
import muehlespiel_pygame as ms
import copy

pygame.init()
WIDTH, HEIGHT = 1000, 1000

#initialize the window
win = pygame.display.set_mode((WIDTH,HEIGHT))
pygame.display.set_caption("nine men's morris")
pygame.display.set_icon(pygame.image.load("9_m_m.png"))


#color variables
GREEN = (0,255,0)
BLACK = (0,0,0)
WHITE = (255,255,255)
RED = (255,0,0)
BLUE = (0,0,255)


#font settings
TITLE_FONT = pygame.font.SysFont('TeX Gyre Bonum Math',60)
INIT_FONT = pygame.font.SysFont('Mathjax_Typewriter', 35)
GAMEOVER_FONT = pygame.font.SysFont('LATO BLACK', 180)
NEWGAME_FONT = pygame.font.SysFont('LATO BLACK',90)



#button variables
height_small = 30
radius_small = 15
height_big = 45
radius_big = height_big/2


#game loop variables
FPS = 60
clock = pygame.time.Clock()
run = True
win.fill((100,100,35))
pygame.display.update()


#game board
text = TITLE_FONT.render("Nine Men's Morris",1,BLACK)
win.blit(text, (WIDTH/2 - text.get_width()/2, 20))
pygame.display.update()


#buttons
centers= [(222, 246), (498, 246), (770, 246), (774, 520), (775, 795), (499, 794), (224, 792), (224, 521), (299, 323), (498, 320), (696, 320), (699, 520), (700, 718), (499, 719), (301, 716), (299, 520), (374, 394), (498, 391), (623, 396), (622, 520), (624, 642), (500, 646), (374, 644), (373, 520)]
positions = [(centers[j][0]-height_small/2,centers[j][1]-height_small/2) for j in range(24)]

small_black = pygame.image.load('small_blackstone.png')
big_black = pygame.image.load('big_blackstone.png')
big_white = pygame.image.load('whitestone.png')

def distance(x,y):
    return(m.sqrt((x[0]-y[0])**2 + (x[1]-y[1])**2))
#game variables

#initialize the game data!

def determine_my_color():
    """
    Open the front page to give the choice between black and white.
    """
    big_black_init = pygame.image.load('big_blackstone_init.png')
    big_white_init = pygame.image.load('big_whitestone_init.png')

    init_text = INIT_FONT.render('Would you like to play with black or white ??',1,BLACK)
    win.blit(init_text, (WIDTH/2 - init_text.get_width()/2, 200))
    info_text = INIT_FONT.render('Click to select!!',1,BLACK)
    win.blit(info_text, (WIDTH/2 - info_text.get_width()/2, 300))
    win.blit(big_black_init,(400-150/2,600-150/2))
    win.blit(big_white_init,(600-150/2,600-150/2))
    pygame.display.update()

    starting_color = '$' #Note $ means white, pound means black
    chosing= True
    #execute a while loop until one hits one of the buttons to determine the starting color
    while chosing:
        clock.tick(FPS)
        for event in pygame.event.get():
            #note this is NOT a function over here
            if event.type ==pygame.QUIT:
                pygame.quit()
                chosing = False
            if event.type== pygame.MOUSEBUTTONDOWN:
                pos = pygame.mouse.get_pos()
                m_x, m_y = pygame.mouse.get_pos()
                #print(m_x,m_y)
                #loop over the buttons and determine whether we hit one of the buttons
                if m.sqrt((m_x-400)**2+(m_y-600)**2)<=75:# check distance to the center of the black stone
                    chosing =  False
                    starting_color = '£'
                if m.sqrt((m_x-600)**2+(m_y-600)**2)<=75:# check distance to the center of the white stone
                    chosing =  False
                    starting_color = '$'
    
    win.fill((100,100,35))
    text = TITLE_FONT.render("Nine Men's Morris",1,BLACK)
    win.blit(text, (WIDTH/2 - text.get_width()/2, 20))
    pygame.display.update()
    return(starting_color)

def determine_ai():
    """ Open a surface in order to determine whether we want to play against an ai or another human. 
    """
    robot = pygame.image.load('robot.png')
    human = pygame.image.load('elon.png')

    init_text = INIT_FONT.render('Would you like to play against an A"I" or a "human" ??',1,BLACK)
    win.blit(init_text, (WIDTH/2 - init_text.get_width()/2, 200))
    info_text = INIT_FONT.render('Click to select!!',1,BLACK)
    win.blit(info_text, (WIDTH/2 - info_text.get_width()/2, 300))
    win.blit(human,(654,600))
    win.blit(robot,(150,600))
    pygame.display.update()

    chosing = True
    while chosing:
        clock.tick(FPS)
        for event in pygame.event.get():
            if event.type ==pygame.QUIT:
                pygame.quit()
                chosing = False
            #note this is NOT a function over here
            if event.type== pygame.MOUSEBUTTONDOWN:
                pos = pygame.mouse.get_pos()
                m_x, m_y = pygame.mouse.get_pos()
                if 150 < m_x < 150+172 and 600 < m_y < 600+294:
                    opponent = 'ai'
                    chosing = False
                if 654 < m_x < 654+196 and 600 < m_y < 600+294:
                    opponent = 'human'
                    chosing = False
    win.fill((100,100,35))
    text = TITLE_FONT.render("Nine Men's Morris",1,BLACK)
    win.blit(text, (WIDTH/2 - text.get_width()/2, 20))
    pygame.display.update()
    return(opponent)

def draw(L,weiss,schwarz):
    """
    Input: an array L consisting of the stone configuration
    Output: Draw the buttons on the board.
    """
    win.fill((100,100,35))
    text = TITLE_FONT.render("Nine Men's Morris",1,BLACK)
    win.blit(text, (WIDTH/2 - text.get_width()/2, 20))
    board_image = pygame.image.load('mills_board.png')
    win.blit(board_image,(200,200))
    pygame.display.update()
    for j in range(24):
        x,y = centers[j]
        if L[j] == '¤':
            win.blit(small_black,(x-height_small/2,y-height_small/2))
        if L[j] == '£':
            win.blit(big_black,(x-height_big/2,y-height_big/2))
        if L[j] == '$':
            win.blit(big_white,(x-height_big/2,y-height_big/2))
    pygame.display.update()

def get_information(board,weiss,schwarz):
    """ Input: the player information, the board, returns the button we clicked on
    """
    #loop until we chose a button
    chosing = True
    while chosing:
        clock.tick(FPS)
        for event in pygame.event.get():
            if event.type ==pygame.QUIT:
                pygame.quit()
                chosing = False
            if event.type== pygame.MOUSEBUTTONDOWN:
                pos = pygame.mouse.get_pos()
                #print(pos)
                #print(pos[0],pos[1])
                for j in range(len(centers)):
                    #print('distance to center',j,'  ', distance(centers[j],pos))
                    if distance(centers[j],pos)<radius_small:
                        chosing = False
                        return(j)

            #check whether we pressed on any circle


def mills_on_board(weiss, schwarz,brett):
    #print('excecuted')
    if weiss.state==1:
        player=weiss
        opponent = schwarz
    else:
        player=schwarz 
        opponent = weiss

    if ms.wegnehmen_möglich(weiss,schwarz,brett)== False:
        text = INIT_FONT.render('You have a mill but cannot remove a stone',1,BLUE)
        win.blit(text, (WIDTH/2 - text.get_width()/2, 850))
        pygame.display.update()
    else:
        if player.color =='$':
            text = INIT_FONT.render('White has a mill and can remove a stone',1,BLUE)
            win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
            pygame.display.update()
            #select a
        if player.color == '£':
            text = INIT_FONT.render('Black has a mill and can remove a stone',1,BLUE)
            win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
            pygame.display.update()

        chosen=False
        while not chosen:
            index = get_information(brett,weiss,schwarz)
            if brett.felder[index].color == opponent.color and ms.check_in_muehle(index,brett)==False:
                brett.felder[index].color = '¤'
                opponent.satall -=1
                if opponent.satall<3:
                    brett.gameover = True
                    brett.reason = 'not_enough_stones'+opponent.color
                chosen = True
        if opponent.shand==0 and opponent.satall==3:
            opponent.action = 'springen'
        draw([brett.felder[j].color for j in range(24)], weiss, schwarz)
    

def game_on(brett, weiss, schwarz):
    drawcounter = 0
    while brett.gameover== False:
        drawcounter+=1 #if there are 60 moves without a mill, it is a draw
        #check the counter for the draw

        if weiss.state==1:
            player=weiss
        else:
            player=schwarz
        if player.human==False:
            #later
            pass
        else:
            entered = False
            if player.action=='legen':
                #write some info text
                if player.color =='$':
                    text = INIT_FONT.render('White needs to lay a stone',1,BLUE)
                    win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
                    pygame.display.update()
                if player.color == '£':
                    text = INIT_FONT.render('Black needs to lay a stone',1,BLUE)
                    win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
                    pygame.display.update()
                entered=True
                correctpos = False
                while not correctpos:
                    index = get_information(brett,weiss,schwarz)
                    if ms.check_correctness(weiss, schwarz, brett, index):
                        correctpos = True
                #We insert a correct position due to the previous check
                brett_old = copy.deepcopy(brett)
                ms.turn_lay(weiss,schwarz,brett,index)
                brett_new = brett
                
                nm = ms.check_new_mill(brett_old,brett_new)
                draw([brett.felder[j].color for j in range(24)], weiss, schwarz)
                if nm==True:
                    #reset drawcounter
                    drawcounter = 0
                    mills_on_board(weiss, schwarz,brett)

            if player.action=='ziehen' and entered==False: ## in order to avoid that we lay down a stone, change the field to move and then enter this if statement again.
                entered = True
                #write some info text
                if player.color =='$':
                    text = INIT_FONT.render('White needs to move a stone',1,BLUE)
                    win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
                    pygame.display.update()
                if player.color == '£':
                    text = INIT_FONT.render('Black needs to move a stone',1,BLUE)
                    win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
                    pygame.display.update()

                #check whether it is even possible to move, else terminate the game
                print('zug_möglich',ms.zug_möglich(weiss, schwarz,brett))
                if ms.zug_möglich(weiss, schwarz,brett)==False:
                    brett.gameover = True
                    brett.reason = 'got_stuck'+player.color
                    break
                corrmov = False
                while not corrmov:
                    #click twice on the surface and obtain two indices
                    #print('we need to get information now')
                    ind1 = get_information(brett,weiss,schwarz)
                    ind2 = get_information(brett,weiss,schwarz)
                    print('################')
                    print('ind1',ind1)
                    print('ind2',ind2)
                    pos = (ind1, ind2)
                    if ms.check_correctness(weiss,schwarz,brett,pos):
                        print('pos',pos,'success')
                        corrmov=True

                #deepcopy the old board to compare the changes after the turn
                brett_old = copy.deepcopy(brett)
                ms.turn_move(weiss,schwarz,brett,pos)
                brett_new = brett
                nm = ms.check_new_mill(brett_old,brett_new)

                draw([brett.felder[j].color for j in range(24)], weiss, schwarz)
                if nm==True:
                    #reset drawcounter
                    drawcounter = 0
                    mills_on_board(weiss, schwarz,brett)
            
            if player.action=='springen' and entered == False:
                if player.color =='$':
                    text = INIT_FONT.render('White needs to jump',1,BLUE)
                    win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
                    pygame.display.update()
                if player.color == '£':
                    text = INIT_FONT.render('Black needs to jump',1,BLUE)
                    win.blit(text, (WIDTH/2 - text.get_width()/2, 920))
                    pygame.display.update()
                corrmov = False
                while not corrmov:
                    ind1 = get_information(brett,weiss,schwarz)
                    ind2 = get_information(brett,weiss,schwarz)
                    pos = (ind1, ind2)
                    if ms.check_correctness(weiss,schwarz,brett,pos):
                        print('pos',pos,'success')
                        corrmov=True
                brett_old = copy.deepcopy(brett)
                ms.turn_move(weiss,schwarz,brett,pos)
                brett_new = brett
                nm = ms.check_new_mill(brett_old,brett_new)

                draw([brett.felder[j].color for j in range(24)], weiss, schwarz)
                if nm==True:
                    #reset drawcounter
                    drawcounter = 0
                    mills_on_board(weiss, schwarz,brett)
        print('drawcounter',drawcounter)
        if drawcounter==60:
            brett.gameover = True
            brett.reason = 'draw_by_moves'
            
        weiss.state, schwarz.state = schwarz.state, weiss.state

    win.fill((100,100,35))
    text = GAMEOVER_FONT.render("Gameover !!!",1,BLACK)
    win.blit(text, (WIDTH/2 - text.get_width()/2, 300))
    loser = brett.reason[-1]
    reason = brett.reason[:len(brett.reason)-1]
    if loser=='$':#this means white
        if reason=='not_enough_stones':
            new_text = INIT_FONT.render("Black has won!!!",1,BLACK)
        if reason=='got_stuck':
            new_text = INIT_FONT.render("Black has won, since white is unable to move!!",1,BLACK)
    if loser=='£':
        if reason=='not_enough_stones':
            new_text = INIT_FONT.render("White has won!!!",1,BLACK)
        if reason=='got_stuck':
            new_text = INIT_FONT.render("White has won, since black is unable to move!!",1,BLACK)

    if loser=='s':
        new_text = INIT_FONT.render("Draw!! Because of 60 moves without a mill",1,BLACK)

    win.blit(new_text, (WIDTH/2 - new_text.get_width()/2, 600))
    new_game = NEWGAME_FONT.render("Restart ??",1,BLACK)
    win.blit(new_game,(WIDTH/2 - new_game.get_width()/2, 850))
    width_rect = new_game.get_width()
    height_rect = new_game.get_height()
    pygame.display.update()
    run = True
    while run:
        clock.tick(FPS)    
        for event in pygame.event.get():
            if event.type ==pygame.QUIT:
                pygame.quit()
                run = False
            if event.type==pygame.MOUSEBUTTONDOWN:
                m_x,m_y = pygame.mouse.get_pos()
                #check whether the position is in the rectangle
                if ((WIDTH/2 - new_game.get_width()/2)<m_x<(WIDTH/2 - new_game.get_width()/2)+width_rect):
                    if 850<m_y<850+height_rect:
                        win.fill((100,100,35))
                        main()


    
    

            
def main():
    my_color = determine_my_color()
    print('my color', my_color)

    opponent_type = determine_ai()
    print('opponent_type', opponent_type)

    if my_color =='$':#this means white
        if opponent_type == 'ai':
            weiss = ms.player('$',True)
            schwarz = ms.player('£',False)
        if opponent_type == 'human':
            weiss = ms.player('$',True)
            schwarz = ms.player('£',True)

    if my_color == '£':# this means black
        if opponent_type == 'ai':
            weiss = ms.player('$',False)
            schwarz = ms.player('£',True)
        if opponent_type == 'human':
            weiss = ms.player('$',True)
            schwarz = ms.player('£',True)

    #This means that white will start
    weiss.state = 1
    schwarz.state = 0

    #initialize the board
    L = ['¤' for j in range(24)]

    draw(L,weiss,schwarz)
    brett = ms.spielfeld()
    brett.gameover = False
    game_on(brett, weiss, schwarz)

#index = get_information(brett,weiss,schwarz)
#game_on(brett, weiss, schwarz)
main()
while run:
    clock.tick(FPS)    
    for event in pygame.event.get():
        if event.type ==pygame.QUIT:
            pygame.quit()
            run = False
pygame.quit()


    #pygame.display.update()