from ortools.sat.python import cp_model
import random


def generate_sudoku():
    n = 3
    N = n * n
    model = cp_model.CpModel()

    X = [[model.NewIntVar(1, N, f"X[{i},{j}]") for j in range(N)] for i in range(N)]

    for i in range(N):
        model.AddAllDifferent(X[i])

    for j in range(N):
        model.AddAllDifferent([X[i][j] for i in range(N)])

    for r in range(n):
        for c in range(n):
            model.AddAllDifferent(
                [X[r * n + i][c * n + j] for i in range(n) for j in range(n)]
            )

    # Add a random number to the board to generate different solutions
    rand_i, rand_j = random.randint(0, N - 1), random.randint(0, N - 1)
    rand_value = random.randint(1, N)
    model.Add(X[rand_i][rand_j] == rand_value)

    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status == cp_model.FEASIBLE or status == cp_model.OPTIMAL:
        return [[solver.Value(X[i][j]) for j in range(N)] for i in range(N)]
    else:
        return None
