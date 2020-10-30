import os
import jwt


def verify_token(token):
    REFRESH_TOKEN_SECRET = str(os.environ.get('REFRESH_TOKEN_SECRET'))
    payload = jwt.decode(token, REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    return payload
