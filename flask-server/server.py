from flask import Flask

app = Flask(__name__)

@app.route("/getSongs")
def getSongs():
    return {"songs": ["Plastic Love", "Sparkle", "Dress Down"]}

if __name__ == "__main__":
    app.run(debug=True)