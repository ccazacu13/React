from flask import Flask, request, render_template, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# sent_cache = json.loads(h.read())

print("---Initiliazation complete---")

def median(array, sent):
    array.sort()
    if len(array) == 0:
        return 0, "Undefined"

    return array[len(array)//2], sent

@app.route('/', methods=["POST"])
def root():
    toServer = {"sentiment": "" , "topics":[]} #object to be sent to frontEnd
    input = request.json.get("input")       #entity name
    select = request.json.get("select")     #sentiment for topic extraction

    toServer["sentiment"] = select

    toServer["topics"] = [{"id":1, "text": input}]

    return toServer    
        

if __name__ == "__main__":
    app.run()