from flask import Flask, request, jsonify
from hr import solve_hr_problem
from ressource_distribution import receive_json
import json
app = Flask(__name__)

@app.route('/test', methods=['POST'])
def receive_json():
    data=request.get_json()
    response=receive_json(data)
    return response



@app.route('/input', methods=['POST'])
def test_endpoint():
    pass
if __name__ == "__main__":
    app.run(debug=True)