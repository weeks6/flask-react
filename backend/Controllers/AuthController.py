from flask import Flask, Response, request, make_response, jsonify
from pymodm.connection import connect
from pymodm import fields
from pymodm.errors import DoesNotExist
from Models.User import User
from passlib.hash import sha256_crypt
from Auth.tokens import create_access_token, create_refresh_token
from Auth.verify_token import verify_refresh_token
from Middlewares.protected import protected
from flask_cors import CORS, cross_origin
import json
import jwt
import os

from app import app


@app.route('/api/auth/signup', methods=['POST'])
@cross_origin()
def auth_signup():
    req_data = dict(json.loads(request.data))
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
    try:
        user = User.objects.get({'email': email})
        if sha256_crypt.verify(password, user.password):
            # credentials are correct
            # creating tokens
            refresh_token = create_refresh_token(user)
            access_token = create_access_token(user)

            response_obj = {
                'access_token': access_token,
                'refresh_token': refresh_token
            }

            response = make_response(json.dumps(response_obj))
            response.status_code = 200
            response.headers['Access-Control-Allow-Credentials'] = 'true'

            return response
        else:
            return Response('Not allowed', status=403)
    except DoesNotExist:
        return Response('User does not exist', status=404)


@app.route('/api/auth/user', methods=['GET'])
@protected
def user():
    TOKEN_SECRET = os.environ.get('TOKEN_SECRET')
    access_token = str(request.headers.get('Authorization')).split()[1]
    payload = jwt.decode(access_token, TOKEN_SECRET, algorithms=['HS256'])
    user = User.objects.get({'_id': fields.ObjectId(payload['user_id'])})
    response = make_response(user.to_dict())
    response.status_code = 200
    return response


@app.route('/api/auth/refresh_token', methods=['GET'])
def refresh_token():
    REFRESH_TOKEN_SECRET = os.environ.get('REFRESH_TOKEN_SECRET')
    refresh_token = str(request.headers.get('Authorization')).split()[1]
    print(refresh_token)
    if verify_refresh_token(refresh_token)['message'] != 'OK':
        return Response('Unauthenticated', 401)

    payload = jwt.decode(refresh_token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    user = User.objects.get({'_id': fields.ObjectId(payload['user_id'])})
    response = make_response({
        'access_token': create_access_token(user)
    })
    response.status_code = 200
    return response