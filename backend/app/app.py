from flask import Flask
from flask_cors import CORS
import threading
from psutil import process_iter
from time import sleep

app = Flask(__name__)
CORS(app)

database = {"state": False}

########### K i l l e r ###########


def killer():
    '''Thread that close the programs from the black list'''
    print("Killer initialized")
    while database["state"] == True:
        sleep(1.0)
        for programName in ["sublime_text.exe"]:      # Iterate list
            for process in process_iter():            # Iterate process
                if programName == process.name():     # Compare
                    process.kill()                    # Kill it
                    print(programName, " closed.")    # Notify


class MyThread(threading.Thread):
    def __init__(self):
        super(MyThread, self).__init__()
        self.stop_request = False

    def run(self):
        killer()

    def stop(self):
        self.stop_request = True


thread = MyThread()

########### Events ###########


@app.route("/state")
def state():
    '''Consult the state of the system'''
    if database["state"] == False:
        print("System is off")
    else:
        print("System is on")
    return database


@app.route("/on")
def encender():
    '''Put on the killer'''
    # Solo se puede prender si está apagado
    if database["state"] == False:
        database["state"] = True
        print("A killer have born :-)")
        thread = MyThread()
        thread.start()

    return database


@app.route("/off")
def apagar():
    '''Put of the killer'''
    database["state"] = False
    thread.stop()
    print("Killer killing itself :O")
    return database


########### M a i n ###########
if __name__ == '__main__':
    app.run(debug=True, port=5000)
