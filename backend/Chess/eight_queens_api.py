import random
from flask import Flask, jsonify, request
from flask_cors import CORS
from eight_queens_model import solve_queens
from eight_queens_random_solution_generator import get_random_solution

app = Flask(__name__)
CORS(app)


@app.route("/api/eight_queens_solution", methods=["POST"])
def generate_queens_solution_for_input():
    """Solve the 8-queens problem for the given board"""
    board = request.json.get("board", [])
    solution = solve_queens(board)

    return jsonify(solution)


@app.route("/api/random_queens_solution", methods=["GET"])
def generate_random_queens_solution():
    """Generate a random 8-queens solution"""
    solution = get_random_solution()
    return jsonify(solution)


if __name__ == "__main__":
    app.run(debug=True)
