from flask import Blueprint, jsonify
from sudoku.sudoku_generator import generate_sudoku
from sudoku.killer_sudoku_generator import generate_cages

killer_sudoku_bp = Blueprint("killer_sudoku", __name__)

current_sudoku = generate_sudoku()
current_cages = generate_cages(current_sudoku)


@killer_sudoku_bp.route("/killer_sudoku", methods=["GET"])
def generate_killer_sudoku():
    """Generate a new killer sudoku puzzle"""
    return current_cages


@killer_sudoku_bp.route("/killer_sudoku_solution", methods=["GET"])
def get_killer_sudoku_solution():
    """Get the solution for the current killer sudoku"""
    return jsonify(current_sudoku)


@killer_sudoku_bp.route("/generate_new_killer_sudoku", methods=["GET"])
def generate_new_killer_sudoku():
    """Generate a new unsolved sudoku puzzle"""
    global current_sudoku
    current_sudoku = generate_sudoku()
    global current_cages
    current_cages = generate_cages(current_sudoku)
    return current_cages
