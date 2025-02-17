import os
import sys
from flask import Blueprint, jsonify, request

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from Chess.eight_queens_model import solve_queens
from Chess.eight_queens_random_solution_generator import get_random_solution

queens_bp = Blueprint("queens", __name__)


@queens_bp.route("/queens/solve", methods=["POST"])
def generate_queens_solution_for_input():
    """Solve the 8-queens problem for the given board"""
    board = request.json.get("board", [])
    solution = solve_queens(board)
    return jsonify(solution)
