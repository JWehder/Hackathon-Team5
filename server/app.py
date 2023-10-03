# from flask import request, session, jsonify, send_file
# from flask_restful import Resource
# from sqlalchemy.exc import IntegrityError
from google.cloud import texttospeech
import os
import google.generativeai as palm
from dotenv import load_dotenv

# from config import app, db, api
# from models import User

load_dotenv()

palm.configure(api_key=os.getenv('PALM_API_KEY'))

response = palm.generate_text(prompt="a name that starts with j")
print(response.result)

# class Signup(Resource):
#     def post(self):
#         json = request.get_json()

#         try: 
#             user = User(
#                 email=json.get('email'),
#                 linked_in=json.get('linked_in'),
#                 first_name=json.get('first_name'),
#                 last_name=json.get('last_name'),
#                 disability=json.get('disability'),
#                 country=json.get('country')
#             )
#             user.password_hash = json.get('password')
#             db.session.add(user)
#             db.session.commit()

#             session['user_id'] = user.id
#             user_dict = {
#                 'id': user.id,
#                 'email': user.email,
#                 'linked_in': user.linked_in,
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'disability': user.disability,
#                 'country': user.country
#             }
#             return user_dict, 201
#         except IntegrityError:
#             return {'error': 'Not Authorized'}, 422

# class TextToVoice(Resource):
#     # used generally for synthesizing text
#     # in a typical application, we would input this into each lesson
#     # However, we're attempting to maintain our free credits with GCP
#     # so this will suffice
#     def post(self):
#         text = request.get_json()['text']
#         lesson_name = request.get_json()['lesson_name']

#         try:
#             client = texttospeech.TextToSpeechClient()
#             synthesis_input = texttospeech.SynthesisInput(text=text)
#             voice = texttospeech.VoiceSelectionParams(language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL)
#             audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.LINEAR16)
            
#             response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

#             filename = f"{lesson_name}.wav"
#             with open(filename, "wb") as out:
#                 out.write(response.audio_content)
#                 print(f'printing to file: {filename}')

#             return send_file(filename, as_attachment=True, mimetype='audio/wav')

#         except Exception as e:
#             return jsonify({"error": str(e)})




# api.add_resource(Signup, '/signup', endpoint='signup')
# api.add_resource(TextToVoice, '/synthesize_speech', endpoint='text_synthesis')

# if __name__ == '__main__':
#     app.run(port=5555, debug=True)