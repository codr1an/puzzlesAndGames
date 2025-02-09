from flask import Blueprint, jsonify

from sudoku.sudoku_generator import generate_sudoku
from sudoku.killer_sudoku_generator import generate_cages
from sudoku.killer_sudoku_model import solve_killer_sudoku

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

    def get_cages(self):
        return self.cages

    def get_solution(self):
        return self.solution


sudoku_state = KillerSudokuState()


@killer_sudoku_bp.route("/killer_sudoku", methods=["GET"])
def get_killer_sudoku():
    """Return the current killer sudoku puzzle."""
    return jsonify(sudoku_state.get_cages())


@killer_sudoku_bp.route("/killer_sudoku_solution", methods=["GET"])
def get_killer_sudoku_solution():
    """Return the solution for the current killer sudoku puzzle."""
    return jsonify(sudoku_state.get_solution())


@killer_sudoku_bp.route("/generate_new_killer_sudoku", methods=["GET"])
def generate_new_killer_sudoku():
    """Generate a new unsolved killer sudoku puzzle and update the state."""
    sudoku_state.generate_new()
    return jsonify(sudoku_state.get_cages())
