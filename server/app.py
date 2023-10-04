from flask import request, session, jsonify, send_file
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from google.cloud import texttospeech
import os
import google.generativeai as palm
from dotenv import load_dotenv

from config import app, db, api
from models import User

from config import Flask, SQLAlchemy, db

palm.configure(api_key=os.getenv('PALM_API_KEY'))

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="text_to_speech_credentials.json"

class Signup(Resource):
    def post(self):
        json = request.get_json()

        try: 
            user = User(
                email=json.get('email'),
                # linked_in=json.get('linked_in'),
                first_name=json.get('first_name'),
                last_name=json.get('last_name'),
                # disability=json.get('disability'),
                # country=json.get('country')
            )
            user.password_hash = json.get('password')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            user_dict = user.to_dict()
            return user_dict, 201
        except IntegrityError:
            return {'error': 'Not Authorized'}, 422

class Login(Resource):
    def post(self):
        # retrieve the request values
        # determine if we have a user in the db with that email 
        # authenticate password
        # if not return error, if so return user and set session
        req_values = request.get_json()
        if not req_values or 'email' not in req_values or 'password' not in req_values:
            return jsonify({"error": "Invalid request"}), 400

        user = User.query.filter_by(email=req_values['email']).first()
        if user and user.authenticate(req_values['password']):
            session['user_id'] = user.id
            user_dict = user.to_dict()
            return user_dict, 201
        else:
            return {'error': 'Wrong email or password'}, 401
        
class Logout(Resource):
    def delete(self):
        user = User.query.filter(User.id == session['user_id']).first() and session['user_id']

        if user: 
            session['user_id'] = None
            return {}, 204
        else:
            return {'error': 'Unauthorized'}, 401

class CheckSession(Resource):
    def get(self):
        if 'user_id' in session:
            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                user_dict = user.to_dict()
                return user_dict, 200
        
        # return {"error": "you are not logged in"}, 404

class TextToVoice(Resource):
    # used generally for synthesizing text
    # in a typical application, we would input this into each lesson
    # However, we're attempting to maintain our free credits with GCP
    # so this will suffice
    def post(self):
        text = request.get_json()['text']
        lesson_name = request.get_json()['lesson_name']

        try:
            client = texttospeech.TextToSpeechClient()
            synthesis_input = texttospeech.SynthesisInput(text=text)
            voice = texttospeech.VoiceSelectionParams(language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL)
            audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.LINEAR16)
            
            response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

            print(response.audio_content)

            filename = f"{lesson_name}.wav"
            with open(filename, "wb") as out:
                out.write(response.audio_content)
                print(f'printing to file: {filename}')

            return send_file(filename, as_attachment=True, mimetype='audio/wav')

        except Exception as e:
            return jsonify({"error": str(e)})

class GenerateSummary(Resource):
    def post(self):
        req = request.get_json()
        response = palm.generate_text(prompt=req['text'])
        print(response.result)


        return {'text': str(response.result)}, 200


api.add_resource(GenerateSummary, '/generate_summary', endpoint='generate_summary')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(TextToVoice, '/synthesize_speech', endpoint='text_synthesis')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/me', endpoint='me')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
