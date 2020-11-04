from functools import wraps
from flask import request, Response
from Auth.verify_token import verify_token


def protected(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            auth_token = str(request.headers.get('authorization')).split()[1]
            if not verify_token(auth_token):
                return Response('Unauthenticated', status=401)
            return f(*args, **kwargs)

        except IndexError:
            return Response('Unauthenticated', status=401)

    return decorated_function
