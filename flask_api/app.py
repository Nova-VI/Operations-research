from flask import Flask, request, jsonify
from hr import solve_hr_problem
from ressource_distribution import receive_json
import json
app = Flask(__name__)

@app.route('/test', methods=['POST'])
def test_endpoint():
    data=request.get_json()
    response=receive_json(data)
    return response



@app.route('/input', methods=['POST'])
def input_endpoint():

    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    data=json.loads(data)
    num_workers = data["num_workers"]
    num_locations = data["num_locations"]
    num_shifts_per_day = data["num_shifts_per_day"]
    skills = data["skills"]



    result = solve_hr_problem(num_workers, num_locations, num_shifts_per_day, skills)
    return jsonify(result)

    # except Exception as e:
    #     print(e)
    #     return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)