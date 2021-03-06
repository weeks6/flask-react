from pymodm import MongoModel, fields


class Todo(MongoModel):
    user_id = fields.CharField()
    project_id = fields.CharField()
    project_title = fields.CharField()
    date = fields.CharField()
    completed = fields.BooleanField()
    title = fields.CharField()
    description = fields.CharField()
    priority = fields.CharField()
    # experience = fields.IntegerField()

