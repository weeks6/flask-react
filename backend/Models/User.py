from pymodm import MongoModel, fields


class User(MongoModel):
    email = fields.EmailField()
    name = fields.CharField()
    password = fields.CharField()

    def to_dict(self):
        return {
            'email': self.email,
            'name': self.name
        }
