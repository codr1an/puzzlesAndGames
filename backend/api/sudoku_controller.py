from flask import Blueprint, jsonify, request
from Sudoku.sudoku_generator import generate_sudoku
from Sudoku.sudoku_difficulty_setter import remove_numbers
from Sudoku.sudoku_model import solve_sudoku

sudoku_bp = Blueprint("sudoku", __name__)


class SudokuState:
    """Manages the current state of the Classic Sudoku puzzle."""

    def __init__(self, difficulty="easy"):
        self.generate_new(difficulty)

    def generate_new(self, difficulty="easy"):
        """Generate a new Sudoku puzzle with the given difficulty."""
        full_sudoku = generate_sudoku()
        self.unsolved_sudoku = remove_numbers(full_sudoku, difficulty)

    def update_puzzle(self, grid):
        self.unsolved_sudoku = grid

    def get_puzzle(self):
        return self.unsolved_sudoku

    def get_solution(self):
        return solve_sudoku(self.unsolved_sudoku)


sudoku_state = SudokuState()


@sudoku_bp.route("/sudokus/current", methods=["GET"])
def get_current_sudoku():
    """Return the current Sudoku puzzle."""
    return jsonify(sudoku_state.get_puzzle())


@sudoku_bp.route("/sudokus/current/solution", methods=["GET"])
def get_sudoku_solution():
    """Return the solution of the current Sudoku puzzle."""
    return jsonify(sudoku_state.get_solution())


@sudoku_bp.route("/sudokus", methods=["POST"])
def generate_new_unsolved_sudoku():
    """Generate a new Sudoku puzzle based on difficulty."""
    difficulty = request.args.get("difficulty", "easy").lower()
    sudoku_state.generate_new(difficulty)
    return jsonify(sudoku_state.get_puzzle())


@sudoku_bp.route("/sudokus", methods=["PUT"])
def update_current_sudoku():
    """Update current sudoku after user input"""
    grid = request.json.get("board", [])
    sudoku_state.update_puzzle(grid)
    return jsonify(sudoku_state.get_puzzle())
