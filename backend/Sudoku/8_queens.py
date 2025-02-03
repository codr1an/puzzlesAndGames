import sys
import time
from ortools.sat.python import cp_model


class NQueenSolutionPrinter(cp_model.CpSolverSolutionCallback):
    """Print intermediate solutions as a 2D array with 0s and 1s."""

    def __init__(self, queens: list[cp_model.IntVar], board_size: int):
        cp_model.CpSolverSolutionCallback.__init__(self)
        self.__queens = queens
        self.__board_size = board_size
        self.__solution_count = 0
        self.__start_time = time.time()

    @property
    def solution_count(self) -> int:
        return self.__solution_count

    def on_solution_callback(self):
        current_time = time.time()
        print(
            f"Solution {self.__solution_count}, "
            f"time = {current_time - self.__start_time} s"
        )
        self.__solution_count += 1

        # Create a 2D board initialized with 0s
        board = [[0] * self.__board_size for _ in range(self.__board_size)]

        # Place the queens on the board (value of the queens gives the row index)
        for col in range(self.__board_size):
            row = self.Value(self.__queens[col])
            board[row][col] = 1  # Place a queen at the correct position

        # Print the board
        for row in board:
            print(" ".join(str(cell) for cell in row))
        print()


def main(board_size: int) -> None:
    # Creates the solver.
    model = cp_model.CpModel()

    # Creates the variables.
    # There are `board_size` number of variables, one for a queen in each column
    # of the board. The value of each variable is the row that the queen is in.
    queens = [model.new_int_var(0, board_size - 1, f"x_{i}") for i in range(board_size)]

    # Creates the constraints.
    # All rows must be different.
    model.add_all_different(queens)

    # No two queens can be on the same diagonal.
    model.add_all_different(queens[i] + i for i in range(board_size))
    model.add_all_different(queens[i] - i for i in range(board_size))

    # Solve the model.
    solver = cp_model.CpSolver()
    solution_printer = NQueenSolutionPrinter(queens, board_size)
    solver.parameters.enumerate_all_solutions = True
    solver.solve(model, solution_printer)

    # Statistics.
    print("\nStatistics")
    print(f"  conflicts      : {solver.num_conflicts}")
    print(f"  branches       : {solver.num_branches}")
    print(f"  wall time      : {solver.wall_time} s")
    print(f"  solutions found: {solution_printer.solution_count}")


if __name__ == "__main__":
    # By default, solve the 8x8 problem.
    size = 8
    if len(sys.argv) > 1:
        size = int(sys.argv[1])
    main(size)
