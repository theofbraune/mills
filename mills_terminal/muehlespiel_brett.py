
def zeichnen(brett,weiss,schwarz):
    x =x ="    {0}-----------{1}-----------{2}                 00-----------01-----------02\n\
    |   {8}-------{9}-------{10}   |                 |   08-------09-------10   |\n\
    |   |   {16}---{17}---{18}   |   |                 |   |   16---17---18   |   |\n\
    {7}---{15}---{23}       {19}---{11}---{3}                 07--15--23        19--11--03\n\
    |   |   {22}---{21}---{20}   |   |                 |   |   22---21---20   |   |\n\
    |   {14}-------{13}-------{12}   |                 |   14-------13-------12   |\n\
    {6}-----------{5}-----------{4}                 06-----------05-----------04".format(brett.felder[0].color,
    brett.felder[1].color,brett.felder[2].color,brett.felder[3].color,
    brett.felder[4].color,brett.felder[5].color,brett.felder[6].color,
    brett.felder[7].color,brett.felder[8].color,brett.felder[9].color,
    brett.felder[10].color,brett.felder[11].color,brett.felder[12].color,
    brett.felder[13].color,brett.felder[14].color,brett.felder[15].color,
    brett.felder[16].color,brett.felder[17].color,brett.felder[18].color,
    brett.felder[19].color,brett.felder[20].color,brett.felder[21].color,
    brett.felder[22].color,brett.felder[23].color)
    
    print('Steine Weiss/$ Hand',weiss.shand)
    print('  ------------------------------')
    print(x)
    print('  ------------------------------')
    print('Steine Schwarz/£ Hand',schwarz.shand)
    print('#################################')
