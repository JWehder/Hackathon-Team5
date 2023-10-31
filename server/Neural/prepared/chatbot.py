import random 
import json
import pickle
import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer

import tensorflow as tf
from tensorflow import keras

from keras.models import load_model


lemmatizer = WordNetLemmatizer()
# Loading 'intents.json' which contains data related to chatbot intents and their patterns.
intents = json.loads(open('intents.json').read())

# Load preprocessed words from a binary file
words = pickle.load(open('words.pkl', 'rb'))

# Load preprocessed tags/classes from a binary file
tags = pickle.load(open('tags.pkl', 'rb'))

# Load a pre-trained machine learning model
model = load_model('chatbot_model.model')

# Helper function to preprocess a given sentence
def clean_up_sentence(sentence):
    # Tokenize the sentence (break it into individual words)
    sentence_words = nltk.word_tokenize(sentence)
    
    # Lemmatize each word (convert each word to its base form)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    
    # Return the processed list of words
    return sentence_words

# Main function to convert a sentence into a bag-of-words representation
def bag_of_words(sentence):
    # Preprocess the input sentence
    sentence_words = clean_up_sentence(sentence)
    
    # Create a 'bag' filled with zeros. The length of the bag is the same as the list of known words
    bag = [0] * len(words)
    
    # Construct the "bag of words"
    for w in sentence_words:
        # For each word in the processed sentence, check if it matches any word in the global 'words' list
        for i, word in enumerate(words):
            # If there's a match, set the corresponding position in the 'bag' to 1
            if word == w:
                bag[i] = 1
                
    # Convert the 'bag' list to a NumPy array and return it
    return np.array(bag)

# Function to predict the intent of a given sentence
def predict_tag(sentence):
    # Convert the sentence into a bag of words format
    bow = bag_of_words(sentence)
    
    # Predict the intent using the trained model. The result is an array of probabilities.
    res = model.predict(np.array([bow]))[0]
    
    # Set a threshold for prediction confidence
    ERROR_THRESHOLD = 0.25
    
    # Filter out predictions below the threshold
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    # Sort the predictions based on the highest probability
    results.sort(key=lambda x: x[1], reverse=True)
    
    return_list = []
    # Convert the predictions into a list of dictionaries with intent and probability
    for r in results:
        return_list.append({'intent': tags[r[0]], 'probability': str(r[1])})
    
    return return_list

# Function to fetch an appropriate response for the identified intent
def get_response(intents_list, intents_json):
    # Get the highest probable intent from the list
    tag = intents_list[0]['intent']
    
    # Extract the list of intents from the provided JSON
    list_of_intents = intents_json['intents']
    
    # Iterate over each intent in the list
    for i in list_of_intents:
        # If the intent matches the predicted intent
        if i['tag'] == tag:
            # Pick a random response from the intent's responses
            result = random.choice(i['responses'])
            break
    return result

# Continuously prompt the user for input and respond using the chatbot
while True:
    message = input("")  # Get user's message
    ints = predict_tag(message)  # Predict the intent of the user's message
    res = get_response(ints, intents)  # Get a response based on the predicted intent
    print(res)  # Print the chatbot's response