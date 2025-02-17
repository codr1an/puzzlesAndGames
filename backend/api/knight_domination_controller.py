from flask import Blueprint, jsonify, request
from Chess.knight_domination_model import solve_knights

knights_bp = Blueprint("knights", __name__)


@knights_bp.route("/knights/solve", methods=["POST"])
def solve_knight_domination():
    """Solve the knight domination problem"""
    board = request.json.get("board", [])
    solution = solve_knights(board)
    return jsonify(solution)
