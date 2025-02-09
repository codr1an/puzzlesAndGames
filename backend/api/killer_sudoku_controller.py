from flask import Blueprint, jsonify
from sudoku.sudoku_generator import generate_sudoku
from sudoku.killer_sudoku_generator import generate_cages
from sudoku.killer_sudoku_model import solve_killer_sudoku

killer_sudoku_bp = Blueprint("killer_sudoku", __name__)

# The sudoku killer model can find a different feasible solution for the same cages.
# This is why we generate a new sudoku puzzle and cages then solve it using the
# killer model so that we compare user inputs to the solution of the model.
new_sudoku = generate_sudoku()
current_cages = generate_cages(new_sudoku)
current_sudoku = solve_killer_sudoku(current_cages)


@killer_sudoku_bp.route("/killer_sudoku", methods=["GET"])
def generate_killer_sudoku():
    """Generate a new killer sudoku puzzle"""
    return current_cages


@killer_sudoku_bp.route("/killer_sudoku_solution", methods=["GET"])
def get_killer_sudoku_solution():
    """Get the solution for the current killer sudoku"""
    print("current sud", current_sudoku)
    return jsonify(current_sudoku)


@killer_sudoku_bp.route("/generate_new_killer_sudoku", methods=["GET"])
def generate_new_killer_sudoku():
    """Generate a new unsolved killer sudoku puzzle"""
    global new_sudoku
    new_sudoku = generate_sudoku()
    global current_cages
    current_cages = generate_cages(new_sudoku)
    global current_sudoku
    current_sudoku = solve_killer_sudoku(current_cages)
    print(current_sudoku)
    return jsonify(current_cages)
