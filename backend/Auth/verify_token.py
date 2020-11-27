import os
import jwt
from jwt import ExpiredSignatureError


def verify_token(token):
    TOKEN_SECRET = str(os.environ.get('TOKEN_SECRET'))
    try:
        payload = jwt.decode(token, TOKEN_SECRET, algorithms=['HS256'])
        # print(payload)
        payload['message'] = 'OK'
        return payload
    except ExpiredSignatureError:
        return {'message': 'Token has expired'}


def verify_refresh_token(rf_token):
    REFRESH_TOKEN_SECRET = str(os.environ.get('REFRESH_TOKEN_SECRET'))
    try:
        payload = jwt.decode(rf_token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
        payload['message'] = 'OK'
        return payload
    except ExpiredSignatureError:
        return {'message': 'Token has expired'}
