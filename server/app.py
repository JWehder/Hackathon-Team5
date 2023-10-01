from flask import request, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User

class Signup(Resource):
    def post(self):
        json = request.get_json()

        try: 
            user = User(
                email=json.get('email'),
                linked_in=json.get('linked_in'),
                first_name=json.get('first_name'),
                last_name=json.get('last_name'),
                disability=json.get('disability'),
                country=json.get('country')
            )
            user.password_hash = json.get('password')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            user_dict = {
                'id': user.id,
                'email': user.email,
                'linked_in': user.linked_in,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'disability': user.disability,
                'country': user.country
            }
            return user_dict, 201
        except IntegrityError:
            return {'error': 'Not Authorized'}, 422