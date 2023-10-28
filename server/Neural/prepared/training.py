import random
import json
import pickle
import numpy as np

import nltk
# these two are needed to be downloaded on my machine in order to get
# nltk working
nltk.download('punkt')
nltk.download('wordnet')
# natural language toolkit
from nltk.stem import WordNetLemmatizer
# this helps with breaking down words so work, working, worked, and works 
# all mean the same thing to the LLM
import tensorflow as tf
from tensorflow import keras

from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD

lemmatizer = WordNetLemmatizer()

intents = json.loads(open('intents.json').read())

words = []
tags = []
documents = []
ignore_letters = ['?', '!', '.', ',']

for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        # add multiple items to the end of the list with extend
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        # create tags for each category of responses
        if intent['tag'] not in tags:
            tags.append(intent['tag'])

words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))

print(words)

