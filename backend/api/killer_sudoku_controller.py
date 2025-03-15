from flask import Blueprint, jsonify, request

from Sudoku.sudoku_generator import generate_sudoku
from Sudoku.killer_sudoku_generator import generate_cages
from Sudoku.killer_sudoku_model import solve_killer_sudoku
from Sudoku.killer_no_good import generate_all_killer_solutions

killer_sudoku_bp = Blueprint("killer_sudoku", __name__)


@killer_sudoku_bp.route("/killers", methods=["GET"])
def get_killer_sudoku():
    """Generate a new Killer Sudoku"""
    while True:
        sudoku = generate_sudoku()
        cages = generate_cages(sudoku)
        solutions = generate_all_killer_solutions(cages)
        if solutions == 1:
            return jsonify(cages)


@killer_sudoku_bp.route("/killers/solution", methods=["POST"])
def get_killer_sudoku_solution():
    """Return the solution for the given killer sudoku."""
    cages = request.json.get("cages", [])
    return jsonify(solve_killer_sudoku(cages))


@killer_sudoku_bp.route("/killers/solutions", methods=["POST"])
def get_killer_sudoku_solutions():
    """Return the number of solutions for the given killer sudoku."""
    cages = request.json.get("cages", [])
    return jsonify(generate_all_killer_solutions(cages))
