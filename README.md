# WeaviateTry

Quick Little Attempt working with Vector Based Database Weaviate

Most code is similar to the tutorial linked here (https://weaviate.io/developers/weaviate/quickstart/end-to-end)

With data used from there mock json https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json

I did add user input for searching the vector database for Word Similarity instead of just searching for biology 

# Code Description (just a first exploration so I didnt functionalize too much)

## Heavy Lifter

### go.js => 
Takes the input for Similar concepts and then parses the Vector Database to return most similar items in that specific Vector class.

## Stuff similar to the Tutorial:

### index.js => 
instantiates the client and creates a First Vector DataBase with className Biology

### import.js => 
importing the dummy json data into the class 

### delete.js => 
for deleting classes in the Vector Database (Just for reference)

