from flask import Flask, Response, request, jsonify
from pymodm.connection import connect
from pymodm.errors import DoesNotExist
from Models.User import User
from passlib.hash import sha256_crypt
from Auth.tokens import create_access_token, create_refresh_token
from Middlewares.protected import protected

app = Flask(__name__)

connect("mongodb+srv://bruh:BridNeedle2001@maincluster.cbxwg.mongodb.net/webapp?retryWrites=true&w=majority")

@app.route('/index')
def index():
    return Response("some", status=200)


@app.route('/api/auth/signup', methods=['POST'])
def auth_signup():
    email, name, password = request.json.values()
    hashed_password = sha256_crypt.hash(password)
    try:
        User.objects.get({'email': email})
        return Response('User already exists', status=403)
    except DoesNotExist:
        User(email, name, hashed_password).save()
        return Response('Success', status=200)


@app.route('/api/auth/signin', methods=['GET'])
def auth_signin():
    email, password = request.json.values()
    try:
        user = User.objects.get({'email': email})
        if sha256_crypt.verify(password, user.password):
            # credentials are correct
            # creating tokens
            refresh_token = create_refresh_token(user)
            access_token = create_access_token(user)

            response = Response(access_token, status=200)
            response.set_cookie('jid', refresh_token, httponly=True)
            return response
        else:
            return Response('Not allowed', status=403)
    except DoesNotExist:
        return Response('User does not exist', status=404)


@app.route('/api/protected')
@protected
def protected():
    return Response('k', status=200)

if __name__ == "__main__":
    print("bruh moment")
    app.run(debug=True, port=5000)
