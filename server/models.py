from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
import re
import secrets

from config import db, bcrypt, MetaData

# Base = declarative_base()

# user_courses = db.Table(
#     'user_courses', Base.metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('course_id', db.Integer, db.ForeignKey('courses.id'))
# )

class Base(db.Model, SerializerMixin):
    __abstract__ = True
    # include_timestamps = False

    def to_dict(self, visited=None, exclude=None):
        if visited is None:
            visited = set()
        if exclude is None:
            exclude = set()

        if self in visited:
            return {}

        visited.add(self)

        serialized = {}
        for column in self.__table__.columns:
            serialized[column.name] = getattr(self, column.name)

        for relationship in self.__mapper__.relationships:
            if relationship.key not in exclude:
                related_obj = getattr(self, relationship.key)
                if related_obj is None:
                    serialized[relationship.key] = None
                elif isinstance(related_obj, list):
                    serialized[relationship.key] = [obj.to_dict(visited) for obj in related_obj]
                else:
                    serialized[relationship.key] = related_obj.to_dict(visited)

        visited.remove(self)
        return serialized

class User(Base):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable=False, unique=True, index=True)
    _password = db.Column(db.String)
    first_name = db.Column(db.String, nullable=False)
    linked_in = db.Column(db.String)
    last_name = db.Column(db.String, nullable=False)
    disability = db.Column(db.String, nullable=False)
    country = db.Column(db.String)
    courses = db.relationship('Enrollee', back_populates='user', cascade="all, delete-orphan")

    @validates('email')
    def validate_email(self, key, address):
        pattern = "([\w\.]+@[A-Za-z]+\.[A-Za-z]+)"
        if not re.match(pattern, address):
            print("made it here")
            raise AttributeError('email addresses must be in standard format: john.doe@example.com')

        return address

    # ensure it is a disability we support
    # @validates('disability')
    # def validate_approved_disability(self, key, disability):
    #     # disability_list = [determine list of disabilities]
    #     # conditonal to check if disability is in list
    #     # throw error if not
    #     # return disability if it is in list
    #     disability_list = []

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

    def generate_code(self):
        return secrets.token_hex(8)
        
    def to_dict(self, visited=None):
        serialized = super().to_dict(visited, exclude={'courses', 'lessons'})
        serialized.pop('password_hash', None)
        serialized['courses'] = [
            {
                'id': course.id,
                'name': course.name,
                'caption': course.caption,
                'description': course.description,
                'lessons': [
                    {
                        'id': lesson.id,
                        'name': lesson.name,
                        'description': lesson.description,
                        'text_content': lesson.text_content,

                    }
                    for lesson in course.lessons
                ]
            }
            for course in self.courses
        ]
        return serialized

    def __repr__(self):
        return f'User {self.id}, Name: {self.first_name} {self.last_name}, ID: {self.id}'

class Course(Base):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String, nullable=False)
    caption = db.Column(db.String, nullable=False)
    lessons = db.relationship('Lesson', backref='course', cascade="all, delete-orphan")
    users = db.relationship('Enrollee', back_populates='course')

    @validates('description')
    def validate_length_description(self, key, description):
        if len(description) < 50:
            raise AttributeError('Please provide a more detailed description.')
        return description

    def to_dict(self, visited=None):
        serialized = super().to_dict(visited, exclude={'lessons'})
        serialized['lessons'] = [
            {
            'id': lesson.id, 
            'description': lesson.description, 
            'text_content': lesson.text_content
            } for lesson in self.lessons]
        return serialized
        

    def __repr__(self):
        return f'Course {self.id}, caption: {self.caption}, Description: {self.description}'

class Enrollee(Base):
    __tablename__ = 'enrollees'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
    course_id = db.Column('course_id', db.Integer, db.ForeignKey('courses.id'))
    date_enrolled = db.Column(db.DateTime)

    user = db.relationship("User", back_populates="courses")
    course = db.relationship("Course", back_populates="users")

class Lesson(Base):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    text_content = db.Column(db.Text, nullable=False)
    name = db.Column(db.String, nullable=False, unique=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

    def to_dict(self, visited=None):
        serialized = super().to_dict(visited)
        serialized.pop('user', None)
        return serialized

    def __repr__(self):
        return f'Lesson {self.id}, description: {self.description}, course: {self.course_id}'


