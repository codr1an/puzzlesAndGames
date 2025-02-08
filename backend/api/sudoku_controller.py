from flask import Blueprint, jsonify, request
from sudoku.sudoku_generator import generate_sudoku
from sudoku.sudoku_difficulty_setter import remove_numbers
from sudoku.sudoku_model import solve_sudoku

sudoku_bp = Blueprint("sudoku", __name__)


def generate_unsolved_sudoku(difficulty="easy"):
    """Generate an initial unsolved sudoku puzzle"""
    generated_sudoku = generate_sudoku()
    unsolved_sudoku = remove_numbers(generated_sudoku, difficulty)
    return unsolved_sudoku


current_sudoku = generate_unsolved_sudoku()


@sudoku_bp.route("/sudoku_solution", methods=["GET"])
def get_sudoku_solution():
    """Solve sudoku using the mathematical model"""
    solved_sudoku = solve_sudoku(current_sudoku)
    return jsonify(solved_sudoku)


@sudoku_bp.route("/generate_new_sudoku", methods=["GET"])
def generate_new_unsolved_sudoku():
    """Generate a new unsolved sudoku puzzle"""
    difficulty = request.args.get("difficulty", "easy").lower()
    global current_sudoku
    current_sudoku = generate_unsolved_sudoku(difficulty)
    return jsonify(current_sudoku)


@sudoku_bp.route("/current_sudoku", methods=["GET"])
def get_current_sudoku():
    """Get the current sudoku puzzle"""
    return jsonify(current_sudoku)
