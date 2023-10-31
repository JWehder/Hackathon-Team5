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

# Creating an instance of WordNetLemmatizer.
lemmatizer = WordNetLemmatizer()

# Loading 'intents.json' which contains data related to chatbot intents and their patterns.
intents = json.loads(open('intents.json').read())

# Initializing empty lists to store words, tags and documents from the 'intents' JSON file.
words = []
tags = []
documents = []

# A list of characters to ignore during tokenization.
ignore_letters = ['?', '!', '.', ',']

# Iterating over each intent in the loaded JSON data.
for intent in intents['intents']:
    # Iterating over each pattern in the current intent.
    for pattern in intent['patterns']:
        # Tokenizing the pattern using NLTK's word tokenizer.
        # word tokenization: Dividing text into individual words.
        word_list = nltk.word_tokenize(pattern)
        # Extending the 'words' list with words from the current pattern.
        words.extend(word_list)
        # Appending a tuple of tokenized words and the tag to 'documents'.
        documents.append((word_list, intent['tag']))
        # If the tag from the current intent is not already in 'tags', append it.
        if intent['tag'] not in tags:
            tags.append(intent['tag'])

# Lemmatizing the words to get their base form and ignoring any in the ignore_letters list.
words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
# Removing duplicates by converting to a set and then sorting the list.
words = sorted(set(words))

# Removing duplicate tags and sorting them.
classes = sorted(set(tags))

# Storing the 'words' and 'tags' in binary format for later use.
pickle.dump(words, open('words.pkl', 'wb'))
pickle.dump(tags, open('tags.pkl', 'wb'))

# Initializing an empty list to store training data.
training = []
# Creating an empty output list filled with zeros. Its length is equal to the number of tags.
output_empty = [0] * len(tags)

# Iterating over each document (pattern and tag tuple).
for document in documents:
    bag = []  # This list will be used to represent words in binary format (0 or 1).
    # Lemmatizing each word in the current document's pattern.
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in document[0]]
    # For each word in our 'words' list, check if it's in the current pattern.
    # If yes, append 1 to 'bag', otherwise append 0.
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    # Creating a binary representation of tags.
    output_row = list(output_empty)
    output_row[tags.index(document[1])] = 1
    training.append([bag, output_row])

# Shuffling the training data.
random.shuffle(training)
# Converting the shuffled training data to a NumPy array.
# training = np.array(training)

# Splitting the training data into input (X) and output (Y) lists.
train_x = [pair[0] for pair in training]
train_y = [pair[1] for pair in training]

# convert the lists to numpy arrays
train_x = np.array(train_x)
train_y = np.array(train_y)

# creation of neural model
# Initializing a sequential neural network model using Keras. 
# The Sequential model is a linear stack of layers where you can just add one layer at a time.
model = Sequential()

# Adding a dense (fully connected) layer with 128 neurons. 
# The input shape corresponds to the length of 'train_x' elements (features). 
# The activation function used is ReLU (Rectified Linear Unit).
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))

# Adding a dropout layer with a rate of 0.5. Dropout is a regularization technique 
# where randomly selected neurons are ignored during training to prevent overfitting.
model.add(Dropout(0.5))

# Adding another dense layer with 64 neurons and a ReLU activation function.
model.add(Dense(64, activation='relu'))

# Adding another dropout layer with a rate of 0.5.
model.add(Dropout(0.5))

# Adding the final dense layer with a number of neurons equal to the length of 'train_y' elements. 
# The activation function used here is 'softmax', which makes it suitable for multi-class classification.
model.add(Dense(len(train_y[0]), activation='softmax'))

# Setting up the Stochastic Gradient Descent (SGD) optimizer with specific parameters:
# Learning rate (lr) of 0.01, decay rate of 1e-6, momentum of 0.9, and enabling Nesterov momentum.
sgd = tf.keras.optimizers.legacy.SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)

# Compiling the model, specifying the loss function as 'categorical_crossentropy' 
# (commonly used for multi-class classification), using the previously defined SGD optimizer, 
# and setting the metric for evaluation as 'accuracy'.
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

# Training (fitting) the model with training data. 
# Here, it uses the input 'train_x' and output 'train_y' for training, runs for 200 epochs, 
# uses a batch size of 5 for updates, and provides verbose output (showing progress for each epoch).
hist = model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1)

# Saving the trained model to a file named 'chatbot_model.model' for later use or deployment.
model.save('chatbot_model.h5', hist)

# Printing "done" to indicate the end of the process.
print("done")