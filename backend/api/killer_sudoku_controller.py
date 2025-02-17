from flask import Blueprint, jsonify, request

from Sudoku.sudoku_generator import generate_sudoku
from Sudoku.killer_sudoku_generator import generate_cages
from Sudoku.killer_sudoku_model import solve_killer_sudoku

killer_sudoku_bp = Blueprint("killer_sudoku", __name__)


class KillerSudokuState:
    """Manages the current state of the Killer Sudoku puzzle."""

    def __init__(self):
        self.generate_new()

    def generate_new(self):
        """Generate a new killer sudoku puzzle and store it."""
        self.sudoku = generate_sudoku()
        self.cages = generate_cages(self.sudoku)
        self.solution = solve_killer_sudoku(self.cages)
        self.updated_sudoku = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

    def update_puzzle(self, grid):
        self.updated_sudoku = grid

    def get_cages(self):
        return self.cages

    def get_solution(self):
        return self.solution

    def get_puzzle(self):
        self.updated_sudoku
        return self.updated_sudoku


sudoku_state = KillerSudokuState()


@killer_sudoku_bp.route("/killers/user_inputs", methods=["GET"])
def get_killer_user_inputs():
    """Return the user unputs."""
    return jsonify(sudoku_state.get_puzzle())


@killer_sudoku_bp.route("/killers/current", methods=["GET"])
def get_killer_sudoku():
    """Return the current killer sudoku puzzle."""
    return jsonify(sudoku_state.get_cages())


@killer_sudoku_bp.route("/killers/current/solution", methods=["GET"])
def get_killer_sudoku_solution():
    """Return the solution for the current killer sudoku puzzle."""
    return jsonify(sudoku_state.get_solution())


@killer_sudoku_bp.route("/killers", methods=["POST"])
def generate_new_killer_sudoku():
    """Generate a new unsolved killer sudoku puzzle and update the state."""
    sudoku_state.generate_new()
    return jsonify(sudoku_state.get_cages())


@killer_sudoku_bp.route("/killers", methods=["PUT"])
def update_current_sudoku():
    """Update current sudoku after user input"""
    grid = request.json.get("board", [])
    sudoku_state.update_puzzle(grid)
    return jsonify(sudoku_state.get_puzzle())
