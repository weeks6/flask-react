import os

from flask import Flask
from flask_cors import CORS
from pymodm.connection import connect

MONGO_CONNECT = str(os.environ.get('MONGO_CONNECT'))
connect(MONGO_CONNECT)

app = Flask(__name__)
CORS(app, supports_credentials=True, expose_headers=['Set-Cookie'])

from Controllers import TodoController, ProjectController, AuthController



