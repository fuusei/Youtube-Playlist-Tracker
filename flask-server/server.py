from flask import Flask, request
from flask_cors import CORS
from scrape import *

app = Flask(__name__)
CORS(app)

@app.route("/getSongs", methods=["POST"])
def getSongs():
    try:
        return scrapePlaylist(request.json["URL"])
    except Exception as e:
        return str(e)

@app.route("/compare", methods=["POST"])
def comparePlaylists():
    try:
        return compare(request.json["existingPlaylist"], request.json["URL"])
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run(debug=True)