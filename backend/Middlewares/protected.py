import json
from functools import wraps
from flask import request, Response, make_response, redirect, url_for, jsonify
from pymodm import fields
import jwt
from jwt import ExpiredSignatureError
from Auth.verify_token import verify_token, verify_refresh_token
from Auth.tokens import create_access_token
import os
from Models.User import User


def protected(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            auth_token = str(request.headers.get('authorization')).split()[1]
            if verify_token(auth_token)['message'] != 'OK':
                # token has expired
                # # try to refresh access
                # refresh_token = dict(json.loads(request.data))['refresh_token']
                # if verify_refresh_token(refresh_token)['message'] != 'OK':
                #     # refresh token has expired too
                #     response = make_response('Unauthenticated')
                #     response.status_code = 401
                #     return response
                # else:
                #     REFRESH_TOKEN_SECRET = os.environ.get('REFRESH_TOKEN_SECRET')
                #     payload = jwt.decode(refresh_token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
                #     user = User.objects.get({'_id': fields.ObjectId(payload['user_id'])})
                #     response = make_response(jsonify({'original_path': request.full_path[:-1]}))
                #     response.status_code
                #     return response
                return Response('Unauthenticated', status=401)

            return f(*args, **kwargs)
        except IndexError:
            return Response('Unauthenticated', status=401)
        except ExpiredSignatureError:

            return Response('Unauthenticated', status=401)

    return decorated_function
