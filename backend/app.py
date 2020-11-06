from flask import Flask, Response, request, make_response
from pymodm.connection import connect
from pymodm.errors import DoesNotExist
from Models.User import User
from passlib.hash import sha256_crypt
from Auth.tokens import create_access_token, create_refresh_token
from Middlewares.protected import protected
from flask_cors import CORS, cross_origin
import json
import os

MONGO_CONNECT = str(os.environ.get('MONGO_CONNECT'))
connect(MONGO_CONNECT)

app = Flask(__name__)
CORS(app, supports_credentials=True, expose_headers=['Set-Cookie'])
# app.run(debug=True, port=5000)


@app.route('/api/auth/signup', methods=['POST'])
@cross_origin()
def auth_signup():
    req_data = json.loads(request.json['data'])
    name, email, password = req_data.values()
    hashed_password = sha256_crypt.hash(password)
    try:
        User.objects.get({'email': email})
        return Response('User already exists', status=403)
    except DoesNotExist:
        User(email, name, hashed_password).save()
        return Response('Success', status=200)


@app.route('/api/auth/signin', methods=['POST'])
@cross_origin()
def auth_signin():

    req = dict(json.loads(request.data))
    email, password = req.values()
    print(email, password)
    try:
        user = User.objects.get({'email': email})
        if sha256_crypt.verify(password, user.password):
            # credentials are correct
            # creating tokens
            refresh_token = create_refresh_token(user)
            access_token = create_access_token(user)
            response_obj = {'access_token': access_token}

            response = make_response(json.dumps(response_obj))
            response.status_code = 200
            response.headers['Access-Control-Expose-Headers'] = 'Set-Cookie'
            response.headers['Access-Control-Allow-Credentials'] = 'true'

            # response.set_cookie('jid', refresh_token, httponly=True, domain='localhost')
            return response
        else:
            return Response('Not allowed', status=403)
    except DoesNotExist:
        return Response('User does not exist', status=404)


@app.route('/api/auth/refresh_token', methods=['POST'])
def refresh():
    return Response('k', status=200)


@app.route('/api/auth/user', methods=['GET'])
@protected
def user():
    print(request.headers['authorization'])

    return Response('k', status=200)

