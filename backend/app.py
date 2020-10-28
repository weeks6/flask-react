from flask import Flask

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

@app.route('/', defaults={'path': ''})
def catch_all(path):
    return app.send_static_file('index.html')