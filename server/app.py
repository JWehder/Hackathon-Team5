from flask import request, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Recipe

class Signup(Resource):
    def post(self):
        json = request.get_json()

        try: 
            user = User(
                username=json.get('username'),
                image_url=json.get('image_url'),
                bio=json.get('bio')
            )
            user.password_hash = json.get('password')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            user_dict = {
                'id': user.id,
                'username': user.username,
                'image_url': user.image_url,
                'bio': user.bio
            }
            return user_dict, 201
        except IntegrityError:
            return {'error': 'Not Authorized'}, 422