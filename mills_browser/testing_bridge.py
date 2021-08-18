import eel
import time

@eel.expose
def deepSleep(s):
    time.sleep(s)

eel.init('web')
eel.start('index.html',mode = 'chrome-app')

