import os
import json

import jwt
from flask import request, make_response, jsonify
from pymodm.errors import DoesNotExist

from Models.Todo import Todo
from Middlewares.protected import protected
from app import app


@app.route('/api/todos/new', methods=['POST'])
@protected
def new_todo():
    TOKEN_SECRET = os.environ.get('TOKEN_SECRET')
    todo = json.loads(request.data)
    access_token = str(request.headers.get('Authorization')).split()[1]
    user_id = jwt.decode(access_token, TOKEN_SECRET, algorithms=['HS256'])['user_id']
    Todo(user_id,
         todo['project_title'],
         todo['date'],
         todo['completed'],
         todo['title'],
         todo['description'],
         todo['priority'],
         todo['experience']).save()
    res = make_response('Ok')
    res.status_code = 200
    return res


@app.route('/api/todos/all', methods=['GET'])
@protected
def all_todos():
    TOKEN_SECRET = os.environ.get('TOKEN_SECRET')
    access_token = str(request.headers.get('Authorization')).split()[1]
    payload = jwt.decode(access_token, TOKEN_SECRET, algorithms=['HS256'])
    try:
        todos = Todo.objects.raw({'user_id': payload['user_id']})
        todos_list = []
        for todo in todos:
            todo_dict = dict(todo.to_son().to_dict())
            todo_dict['_id'] = str(todo_dict['_id'])
            todo_dict.pop('_cls')
            todos_list.append(todo_dict)
        response = make_response(jsonify(todos_list))
        response.status_code = 200
        return response
    except DoesNotExist:
        res = make_response('Not ok')
        res.status_code = 404
        return res

