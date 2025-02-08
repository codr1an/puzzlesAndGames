from flask import Blueprint, jsonify
from sudoku.sudoku_generator import generate_sudoku
from sudoku.killer_sudoku_generator import generate_cages

killer_sudoku_bp = Blueprint("killer_sudoku", __name__)

current_sudoku = generate_sudoku()


@killer_sudoku_bp.route("/killer_sudoku", methods=["GET"])
def generate_killer_sudoku():
    """Generate a new killer sudoku puzzle"""
    cages = generate_cages(current_sudoku)
    return cages


@killer_sudoku_bp.route("/killer_sudoku_solution", methods=["GET"])
def get_killer_sudoku_solution():
    """Get the solution for the current killer sudoku"""
    return jsonify(current_sudoku)
