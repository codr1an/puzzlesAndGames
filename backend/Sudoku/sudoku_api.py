from flask import Flask, jsonify, request
from flask_cors import CORS
from sudoku_generator import generate_sudoku
from sudoku_difficulty_setter import remove_numbers
from sudoku_model import solve_sudoku

app = Flask(__name__)
CORS(app)


def generate_unsolved_sudoku(difficulty="easy"):
    """Generate the initial unsolved sudoku puzzle with easy difficulty"""
    generated_sudoku = generate_sudoku()
    unsolved_sudoku = remove_numbers(generated_sudoku, difficulty)

    return unsolved_sudoku


@app.route("/api/sudoku_solution", methods=["GET"])
def get_sudoku_solution():
    """Solve sudoku using the mathematical model"""
    solved_sudoku = solve_sudoku(current_sudoku)

    return jsonify(solved_sudoku)


@app.route("/api/generate_new_sudoku", methods=["GET"])
def generate_new_unsolved_sudoku():
    """Generate a new unsolved sudoku puzzle"""
    difficulty = request.args.get("difficulty").lower()
    # this is bad practice but whatever
    global current_sudoku
    current_sudoku = generate_unsolved_sudoku(difficulty)

    return jsonify(current_sudoku)


@app.route("/api/current_sudoku", methods=["GET"])
def get_current_sudoku():
    """Get the current sudoku puzzle"""
    return jsonify(current_sudoku)


current_sudoku = generate_unsolved_sudoku()


if __name__ == "__main__":
    app.run(debug=True)
