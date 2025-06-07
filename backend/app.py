from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello from Flask backend 👋'})
# remove or comment out app.run(), Render uses Gunicorn or similar automatically
if __name__ == '__main__':
    app.run(debug=True)
