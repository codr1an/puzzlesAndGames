import json
from ortools.linear_solver import pywraplp


def solve_queens(board):
    N = 8
    solver = pywraplp.Solver.CreateSolver("SCIP")
    if not solver:
        return None

    # Create decision variables: 0 = no queen, 1 = queen placed
    X = [[solver.IntVar(0, 1, f"X[{i},{j}]") for j in range(N)] for i in range(N)]

    # If a board is given, place the queens as per the board
    if board:
        for i in range(N):
            for j in range(N):
                if board[i][j] != 0:
                    solver.Add(X[i][j] == 1)

    # Row constraint: exactly one queen per row
    for i in range(N):
        solver.Add(sum(X[i][j] for j in range(N)) == 1)

    # Column constraint: exactly one queen per column
    for j in range(N):
        solver.Add(sum(X[i][j] for i in range(N)) == 1)

    # Main diagonals (\ i - j \ is constant)
    for d in range(-N + 1, N):
        solver.Add(sum(X[i][j] for i in range(N) for j in range(N) if i - j == d) <= 1)

    # Anti-diagonals (\ i + j \ is constant)
    for d in range(2 * N - 1):
        solver.Add(sum(X[i][j] for i in range(N) for j in range(N) if i + j == d) <= 1)

    # **Define the objective function**: maximize the number of placed queens
    solver.Maximize(sum(X[i][j] for i in range(N) for j in range(N)))

    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        for i in range(N):
            for j in range(N):
                board[i][j] = int(X[i][j].solution_value())
        return json.dumps(board)
    else:
        return None
