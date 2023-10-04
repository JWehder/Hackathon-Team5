from flask import Flask, request, jsonify, redirect, url_for
from authlib.integrations.flask_client import OAuth
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

oauth = OAuth(app)

from routes import root_bp
from routes import lesson_bp
from routes import course_bp
# from models import User, Lesson, Course

app.register_blueprint(root_bp)
app.register_blueprint(lesson_bp)
app.register_blueprint(course_bp)
