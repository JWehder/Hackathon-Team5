from datetime import datetime
from flask import Response, make_response, jsonify, Blueprint
from sqlalchemy.types import DateTime
from sqlalchemy.sql.functions import now
import requests

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

@root_bp.route('/login', methods=['POST'])
def login_with_email():
    # Get the JSON data from the request sent by the React app.
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Invalid request"}), 400

    email = data['email']
    password = data['password']

    # Check if the user exists in your data store.
    user = next((user for user in users if user['username'] == username), None)

    if user is None or user['password'] != password:
        return jsonify({"error": "Invalid username or password"}), 401

    # You can add more logic here, such as creating a session or JWT token.
    # For now, let's just return a success message.
    return jsonify({"message": "Login successful"}), 200

@root_bp.route('/signup', methods=['POST'])
def signup():
    # Get the JSON data from the request sent by the React app.
    data = request.get_json()

    if not data or 'first_name' not in data or 'last_name' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Invalid request"}), 400

    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    password = data['password']

    # Check if the email already exists in your data store.
    if any(user['email'] == email for user in users):
        return jsonify({"error": "Email already exists"}), 409

    # Create a new user record.
    new_user = {"first_name": first_name, "last_name": last_name, "email": email, "password": password}
    users.append(new_user)

    # You can add more logic here, such as creating a session or JWT token.
    # For now, let's just return a success message.
    return jsonify({"message": "Signup successful"}), 201

@root_bp.route('/login/google')
def login_with_google():
  app.config['GOOGLE_CLIENT_ID'] = 'YOUR_GOOGLE_CLIENT_ID'
  app.config['GOOGLE_CLIENT_SECRET'] = 'YOUR_GOOGLE_CLIENT_SECRET'

  CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'

  oauth.register(
      name='google',
      client_id=GOOGLE_CLIENT_ID,
      client_secret=GOOGLE_CLIENT_SECRET,
      server_metadata_url=CONF_URL,
      client_kwargs={
          'scope': 'openid email profile'
      }
  )

  # Redirect the user to Google's OAuth2 login page.
  return oauth.google.authorize(callback=url_for('authorized_google', _external=True))


@root_bp.route('/login/google/authorized')
def authorized_google():
    # Handle the callback from Google after the user logs in.
    resp = oauth.google.authorized_response()

    if resp is None or resp.get('access_token') is None:
        return jsonify({"error": "Access denied: reason={} error={}".format(
            request.args['error_reason'],
            request.args['error_description']
        )}), 403

    email = resp['email']

    # Check if the email exists in your database; if not, create a new user.
    if email not in [user['email'] for user in users]:
        users.append({"email": email})

    return jsonify({"message": "Login successful"}), 200

@root_bp.route('/login/facebook')
def login_with_facebook():
  app.config['FACEBOOK_CLIENT_ID'] = 'YOUR_FACEBOOK_CLIENT_ID'
  app.config['FACEBOOK_CLIENT_SECRET'] = 'YOUR_FACEBOOK_CLIENT_SECRET'

  CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'

  oauth.register(
        name='facebook',
        client_id=FACEBOOK_CLIENT_ID,
        client_secret=FACEBOOK_CLIENT_SECRET,
        access_token_url='https://graph.facebook.com/oauth/access_token',
        access_token_params=None,
        authorize_url='https://www.facebook.com/dialog/oauth',
        authorize_params=None,
        api_base_url='https://graph.facebook.com/',
        client_kwargs={'scope': 'email'},
    )

  return oauth.facebook.authorize(callback=url_for('authorized_facebook', _external=True))

@root_bp.route('/login/facebook/authorized')
def authorized_facebook():
    resp = oauth.facebook.authorized_response()

    if resp is None or resp.get('access_token') is None:
        return jsonify({"error": "Access denied: reason={} error={}".format(
            request.args['error_reason'],
            request.args['error_description']
        )}), 403

    email = resp['email']

    # Check if the email exists in your database; if not, create a new user.
    if email not in [user['email'] for user in users]:
        users.append({"email": email})

    # You should implement session management or JWT token creation here.
    return jsonify({"message": "Login successful"}), 200


