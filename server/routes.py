from datetime import datetime
from flask import Blueprint
from flask import request
from flask import jsonify
from flask import Response
from flask import make_response
from sqlalchemy.types import DateTime
from sqlalchemy.sql.functions import now
import requests
import os

from models import User, Lesson, Course
from config import db, bcrypt

root_bp = Blueprint("root_bp", __name__)
lesson_bp = Blueprint("lesson_bp", __name__)
course_bp = Blueprint("course_bp", __name__)

@root_bp.route("/", methods=["GET"])
def root():
    return {
        "message": "Flatiron Hackathon Team 5 Project",
    }