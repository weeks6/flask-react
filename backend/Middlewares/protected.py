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
                return Response('Unauthenticated', status=401)

            return f(*args, **kwargs)
        except IndexError:
            return Response('Broken Auth Header', status=401)
        except ExpiredSignatureError:

            return Response('Token has expired', status=401)

    return decorated_function
