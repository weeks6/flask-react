import os
import json

import jwt
from flask import request, make_response, jsonify
from pymodm.errors import DoesNotExist

from Models.Project import Project
from Middlewares.protected import protected
from app import app


@app.route('/api/projects/new', methods=['POST'])
@protected
def new_project():
    project = json.loads(request.data)
    Project(project['user_id'], project['date'], project['title'], project['description']).save()
    res = make_response('Ok')
    res.status_code = 200
    return res


@app.route('/api/projects/all', methods=['GET'])
@protected
def all_projects():
    TOKEN_SECRET = os.environ.get('TOKEN_SECRET')
    access_token = str(request.headers.get('Authorization')).split()[1]
    payload = jwt.decode(access_token, TOKEN_SECRET, algorithms=['HS256'])
    try:
        projects = Project.objects.raw({'user_id': payload['user_id']})
        pr_list = []
        for project in projects:
            pr_dict = dict(project.to_son().to_dict())
            pr_dict['_id'] = str(pr_dict['_id'])
            pr_dict.pop('_cls')
            pr_list.append(pr_dict)
        response = make_response(jsonify(pr_list))
        response.status_code = 200
        return response
    except DoesNotExist:
        res = make_response('Not ok')
        res.status_code = 404
        return res
