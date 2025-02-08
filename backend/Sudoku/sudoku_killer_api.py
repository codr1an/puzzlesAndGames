from flask import Flask, jsonify
from flask_cors import CORS
from sudoku_generator import generate_sudoku
from sudoku_killer_generator import generate_cages

app = Flask(__name__)
CORS(app)


@app.route("/api/killer_sudoku", methods=["GET"])
def generate_killer_sudoku():
    """Generate a new killer sudoku puzzle"""
    grid = current_sudoku
    cages = generate_cages(grid)
    for row in grid:
        print(row)

    return cages


@app.route("/api/killer_sudoku_solution", methods=["GET"])
def get_sudoku_solution():
    """Solve sudoku using the mathematical model"""

    return jsonify(current_sudoku)


current_sudoku = generate_sudoku()

if __name__ == "__main__":
    app.run(debug=True)
