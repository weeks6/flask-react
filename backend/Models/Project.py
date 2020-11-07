from pymodm import MongoModel, fields


class Project(MongoModel):
    user_id = fields.CharField()
    date = fields.CharField()
    title = fields.CharField()
    description = fields.CharField()

