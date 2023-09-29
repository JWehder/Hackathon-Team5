from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.exc import IntegrityError
import re

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable=False, unique=True, index=True)
    _password = db.Column(db.String)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    disability_type = db.Column(db.String, nullable=False)
    courses = db.relationship('Course', backref='user', cascade="all, delete-orphan")
    lessons = db.relationship('Lesson', backref='user')

    @validates('email')
    def validate_email(self, key, address):
        pattern = "([\w\.]+@[A-Za-z]+\.[A-Za-z]+)"
        if not re.match(pattern, address):
            raise AttributeError('email addresses must be in standard format: john.doe@example.com')

    @validates('_password')
    def validate_password(self, key, password):
        errors = []

        if len(password) < 8:
            errors.append('Password must be at least 8 characters.')

        if not re.search(r"[0-9]", password): 
            errors.append('Password must contain at least one number.')

        if not re.search(r"[!@#$%^&*()?]", password):  
            errors.append('Password must contain at least one special character.')

        if errors:
            raise AttributeError(' '.join(errors))

        return password

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password, password.encode('utf-8'))

    def __repr__(self):
        return f'User {self.first_name} {self.last_name}, ID: {self.id}'

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    users = db.Column(db.Integer)
    description = db.Column(db.String, nullable=False)
    lessons = db.relationship('Lesson', backref='course', cascade="all, delete-orphan")
    students = db.relationship('Student', backref='course')

    # ensure there are no 
    @validates('description')
    def validate_length_description(self, key, description):
        if len(description) < 50:
            raise AttributeError('Please provide a more detailed description.')
        return description

class Lesson(db.Model, SerializerMixin):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    text_content = db.Column(db.Text)
    name = db.Column(db.String)


