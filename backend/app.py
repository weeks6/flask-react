from flask import Flask
import os

from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

db = MongoEngine()
db.init_app(app)

@app.route("/")
def main():
    return "bruh haawdawdelp"

@app.route("/api")
def api():
    return 'eblo da'

if __name__ == "__main__":
    print("bruh moment")
    app.run(debug=True, port=5000)