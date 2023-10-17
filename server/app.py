from flask import request, session, jsonify, send_file, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import traceback
from functools import wraps
from config import app, db, api
from models import User
from config import Flask, SQLAlchemy, db
from logic import convert_text_to_voice, send_email
import os
import google.generativeai as palm

palm.configure(api_key=os.getenv('PALM_API_KEY'))

# HTTP Constants
HTTP_SUCCESS = 200
HTTP_CREATED = 201
HTTP_NO_CONTENT = 204
HTTP_UNAUTHORIZED = 401
HTTP_NOT_FOUND = 404
HTTP_BAD_REQUEST = 400
HTTP_CONFLICT = 409
HTTP_SERVER_ERROR = 500
HTTP_UNPROCESSABLE_ENTITY = 422

def authorized(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            return make_response(jsonify({'error': 'Not authorized'}), HTTP_UNAUTHORIZED)
        return func(*args, **kwargs)
    return wrapper

class ForgotPassword(Resource):
    def post(self):
        json = request.get_json()

        user = User.query.filter_by(email=json['email']).first()

        if not user:
            return jsonify({'error': 'the email you entered was not recognized'}), HTTP_UNAUTHORIZED

        user.code = user.generate_code
        db.session.add(user)
        db.session.commit()

        subject, body, to_address = user.generate_forgot_password_email
        send_email(to_address, subject, body)

        session['user_id'] = user.id
        return jsonify({'success_message': 'Sent an email'}), HTTP_SUCCESS

class ResetPassword(Resource):
    def post(self):
        json = request.get_json()

        user = User.query.filter_by(id=session['user_id']).first()

        if not user.code == json['code']:
            return jsonify({'error': 'code is incorrect'}), HTTP_UNAUTHORIZED

        return jsonify({'success_message': 'code is correct!'}), HTTP_SUCCESS


class Signup(Resource):
    def post(self):
        json = request.get_json()

        if not json['email'] or not json['first_name'] or not json['last_name']:
            return make_response(jsonify({'error': 'First name, last name, email, and password are required fields'}), HTTP_BAD_REQUEST)

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
            user_dict = user.to_dict()
            return user_dict, HTTP_CREATED
        except IntegrityError:
                # Handle IntegrityError...
                return {'error': 'A user with these details already exists'}, HTTP_CONFLICT

        except ValueError as ve:
                # Handle ValueError which might be raised during inappropriate data assignment...
                return {'error': f'Value error: {str(ve)}'}, HTTP_BAD_REQUEST

        except Exception as e:
                # Handle any other exceptions...
                return {'error': 'An unexpected error occurred'}, HTTP_SERVER_ERROR

class Login(Resource):
    def post(self):
        # retrieve the request values
        # determine if we have a user in the db with that email 
        # authenticate password
        # if not return error, if so return user and set session
        req_values = request.get_json()
        if not req_values or 'email' not in req_values or 'password' not in req_values:
            return jsonify({"error": "Invalid request"}), HTTP_BAD_REQUEST

        user = User.query.filter_by(email=req_values['email']).first()
        if user and user.authenticate(req_values['password']):
            session['user_id'] = user.id
            user_dict = user.to_dict()
            return user_dict, HTTP_CREATED
        else:
            return {'error': 'Wrong email or password'}, 401
        
class Logout(Resource):
    @authorized
    def delete(self):
        user = User.query.filter(User.id == session['user_id']).first() and session['user_id']

        if user: 
            session['user_id'] = None
            return {}, HTTP_NO_CONTENT
        else:
            return {'error': 'Unauthorized'}, HTTP_UNAUTHORIZED

class CheckSession(Resource):
    def get(self):
        if 'user_id' in session:
            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                user_dict = user.to_dict()
                return user_dict, HTTP_SUCCESS
        
        # return {"error": "you are not logged in"}, 404

class TextToVoice(Resource):
    # used generally for synthesizing text
    # in a typical application, we would input this into each lesson
    # However, we're attempting to maintain our free credits with GCP
    # so this will suffice
    # @authorized
    def post(self):
        text = request.get_json()['text']
        lesson_name = request.get_json()['lesson_name']

        try:
            return convert_text_to_voice(text, lesson_name)

        except Exception as e:
            return jsonify({"error": str(e)})

class GenerateSummary(Resource):
    # @authorized
    def post(self):
        req = request.get_json()
        response = palm.generate_text(prompt=req['text'])

        return {'text': str(response.result)}, HTTP_SUCCESS


api.add_resource(GenerateSummary, '/generate_summary', endpoint='generate_summary')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(TextToVoice, '/synthesize_speech', endpoint='text_synthesis')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/me', endpoint='me')
api.add_resource(ForgotPassword, '/forgot_password', endpoint='forgot_password')
api.add_resource(ResetPassword, '/reset_password', endpoint='reset_password')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
