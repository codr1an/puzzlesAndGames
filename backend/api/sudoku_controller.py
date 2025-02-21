from flask import Blueprint, jsonify, request
from Sudoku.sudoku_model import solve_sudoku

sudoku_bp = Blueprint("sudoku", __name__)


@sudoku_bp.route("/sudokus", methods=["POST"])
def generate_new_unsolved_sudoku():
    """Generate a new Sudoku puzzle based on difficulty."""
    grid = request.json.get("board", [])
    solution = solve_sudoku(grid)
    return jsonify(solution)
