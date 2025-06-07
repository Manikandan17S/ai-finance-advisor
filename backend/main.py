from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route("/")
def home():
    return jsonify({'message': '🔥 AI Finance Advisor Backend is Live!'})

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from Flask backend 👋'})

# No need for app.run() on Render!
