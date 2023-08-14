from flask import Flask, request
from flask_cors import CORS
from scrape import *

app = Flask(__name__)
CORS(app)

@app.route("/getSongs", methods=["POST"])
def getSongs():
    try:
        playlist = scrapePlaylist(request.json["URL"])
        return playlist
    except Exception as e:
        return str(e)

@app.route("/compare", methods=["POST"])
def comparePlaylists():
    return {"deleted": ["Airport Lady"], "added": []}

if __name__ == "__main__":
    app.run(debug=True)