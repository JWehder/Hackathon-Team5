from google.cloud import texttospeech
import os
import google.generativeai as palm
from dotenv import load_dotenv
from flask import send_file
import smtplib
from email.mime.text import MIMEText

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="text_to_speech_credentials.json"

def convert_text_to_voice(prompt, lesson_name):
        client = texttospeech.TextToSpeechClient()
        synthesis_input = texttospeech.SynthesisInput(text=prompt)
        voice = texttospeech.VoiceSelectionParams(language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL)
        audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.LINEAR16)
        
        response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

        filename = f"{lesson_name}.wav"
        with open(filename, "wb") as out:
            out.write(response.audio_content)
            print(f'printing to file: {filename}')

        return send_file(filename, as_attachment=True, mimetype='audio/wav')

def send_email(to_address, subject, body):
    msg = MIMEText(body, "html")
    msg['Subject'] = subject
    msg['From'] = os.getenv('EMAIL')
    msg['To'] = to_address

    with smtplib.SMTP("smtp.zoho.com", 587) as server:
        server.login(os.getenv('EMAIL'), os.getenv('EMAIL_PASSWORD'))
        server.sendmail(msg['From'], msg['To'], msg)
