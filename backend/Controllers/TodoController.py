import os
import json

import jwt
from flask import request, make_response, jsonify
from pymodm.errors import DoesNotExist
from pymodm import fields
from Models.Todo import Todo
from Middlewares.protected import protected
from app import app

from pprint import pprint


@app.route('/api/todos/new', methods=['POST'])
@protected
def new_todo():
    TOKEN_SECRET = os.environ.get('TOKEN_SECRET')
    todo = json.loads(request.data)
    access_token = str(request.headers.get('Authorization')).split()[1]
    user_id = jwt.decode(access_token, TOKEN_SECRET, algorithms=['HS256'])['user_id']
    created_todo = Todo(user_id,
         todo['project_title'],
         todo['project_title'],
         todo['date'],
         todo['completed'],
         todo['title'],
         todo['description'],
         todo['priority']).save()
    created_todo = created_todo.to_son().to_dict()
    created_todo.pop('_cls')
    created_todo['_id'] = str(created_todo['_id'])
    res = make_response(jsonify(created_todo))
    res.status_code = 200
    return res


@app.route('/api/todos/edit', methods=['POST'])
@protected
def edit_todo():
    todo = json.loads(request.data)
    # pprint(todo)
    todo_to_edit = Todo.objects.get({'_id': fields.ObjectId(todo['_id'])})
    # pprint(todo_to_edit.to_son().to_dict())
    todo_to_edit.title = todo['title']
    todo_to_edit.project_title = todo['project_title']
    todo_to_edit.priority = todo['priority']
    todo_to_edit.description = todo['description']
    todo_to_edit.date = todo['date']
    todo_to_edit.completed = todo['completed']
    todo_to_edit.save()
    todo_to_edit = todo_to_edit.to_son().to_dict()
    todo_to_edit.pop('_cls')
    todo_to_edit['_id'] = str(todo_to_edit['_id'])
    res = make_response(jsonify(todo_to_edit))
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


@app.route('/api/todos/delete/all', methods=['DELETE'])
@protected
def delete_all():
    TOKEN_SECRET = os.environ.get('TOKEN_SECRET')
    access_token = str(request.headers.get('Authorization')).split()[1]
    payload = jwt.decode(access_token, TOKEN_SECRET, algorithms=['HS256'])
    print(payload)
    try:
        todos = Todo.objects.raw({'user_id': payload['user_id']})
        for todo in todos:
            todo.delete()

        res = make_response('deleted')
        res.status_code = 200
        return res
    except DoesNotExist:
        res = make_response('Not ok')
        res.status_code = 404
        return res


@app.route('/api/todos/delete/one', methods=['POST'])
@protected
def delete_one():
    id = json.loads(request.data)['id']
    # print(id)
    try:
        todo = Todo.objects.get({'_id': fields.ObjectId(id)})
        todo.delete()
        res = make_response('deleted')
        res.status_code = 200
        return res
    except DoesNotExist:
        res = make_response('Not ok')
        res.status_code = 404
        return res