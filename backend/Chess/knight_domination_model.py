import json
from ortools.linear_solver import pywraplp


def solve_knights(board):
    N = 8

    solver = pywraplp.Solver.CreateSolver("SCIP")
    if not solver:
        return None

    # Decision variables: X[i][j] = 1 if a knight is placed at (i, j), otherwise 0
    X = [[solver.IntVar(0, 1, f"X[{i},{j}]") for j in range(N)] for i in range(N)]

    # Pre-place knights if provided in the board
    if board:
        for i in range(N):
            for j in range(N):
                if board[i][j] != 0:
                    solver.Add(X[i][j] == 1)

    # Possible knight moves
    knight_moves = [
        (-2, -1),
        (-1, -2),
        (1, -2),
        (2, -1),
        (2, 1),
        (1, 2),
        (-1, 2),
        (-2, 1),
    ]

    # Each square must be attacked by at least one knight
    for i in range(N):
        for j in range(N):
            attacking_knights = [
                X[i][j]
            ]  # Include itself (a knight can protect its own square)
            for di, dj in knight_moves:
                ni, nj = i + di, j + dj
                if 0 <= ni < N and 0 <= nj < N:
                    attacking_knights.append(X[ni][nj])

            solver.Add(solver.Sum(attacking_knights) >= 1)  # Ensure coverage

    # Objective: Minimize the number of knights
    solver.Minimize(solver.Sum(X[i][j] for i in range(N) for j in range(N)))

    # Solve the problem
    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        solution = [[int(X[i][j].solution_value()) for j in range(N)] for i in range(N)]
        return solution
    else:
        return None
