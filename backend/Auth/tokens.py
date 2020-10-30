import jwt
import os
import datetime


def create_access_token(user):
    TOKEN_SECRET = str(os.environ.get('TOKEN_SECRET'))

    payload = {
        'user_id': str(user._id),
        # 15 minutes
        'exp': datetime.datetime.now() + datetime.timedelta(minutes=15)
    }

    access_token = jwt.encode(payload, TOKEN_SECRET, algorithm='HS256')
    return access_token


def create_refresh_token(user):
    REFRESH_TOKEN_SECRET = str(os.environ.get('REFRESH_TOKEN_SECRET'))

    payload = {
        'user_id': str(user._id),
        # 30 days
        'exp': datetime.datetime.now() + datetime.timedelta(days=30)
    }
    refresh_token = jwt.encode(payload, REFRESH_TOKEN_SECRET, algorithm='HS256')
    return refresh_token
