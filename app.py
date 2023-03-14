# how to use css in python_ flask
# flask render_template example
 
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

# WSGI Application
# Provide template folder name
# The default folder name should be "templates" else need to mention custom folder name
#app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')
app = Flask(__name__, static_folder='staticFiles', template_folder='templates')

client = MongoClient("mongodb://mongodb:27017/")
db = client.pendu_db
collection = db.words
if len(list(collection.find())) == 0:
    db = client["pendu_db"]
    collection = db["words"]
    mylist= [
        { "mot": "docker" },
        { "mot": "koala" },
        { "mot": "gaufre" },
        { "mot": "container" },
        { "mot": "pandemonium" },
        { "mot": "daemon" },
        { "mot": "localhost" },
        { "mot": "image" },
        { "mot": "electrique" },
        { "mot": "pancake" },
        { "mot": "proteine" },
        { "mot": "machine" },
        { "mot": "medicament" },
        { "mot": "tapis" },
        { "mot": "frites" },
        { "mot": "crepe" },
        { "mot": "harmonie" }
    ]
    collection.insert_many(mylist)

@app.route('/')
def index():
    f = open("data/history.txt", "r")
    score = f.read().split(':')
    f.close()
    return render_template('index.html', win=score[0], lose=score[1])

@app.route('/wordList')
def wordList():
   data = list(collection.find())
   words = [d["mot"] for d in data]
   return words

@app.route('/changeScore')
def addScore():
    f = open("data/history.txt", "r")
    score = f.read().split(':')
    f.close()
    win = request.args.get('win', type = str)
    print(win)
    f = open("data/history.txt", "w")
    f.write(str(int(score[0]) + 1) + ":" + score[1]) if (win == "true") else f.write(score[0] + ":" + str(int(score[1]) + 1))
    f.close()
    return jsonify(success=True)
 
if __name__=='__main__':
    # Start the Flask application, listening on all available interfaces
    app.run(host="0.0.0.0")