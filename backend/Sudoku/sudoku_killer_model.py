from ortools.sat.python import cp_model


def solve_killer_sudoku(cages, n=3):
    N = n * n  # Sudoku grid size
    model = cp_model.CpModel()

    # Define variables
    X = [[model.NewIntVar(1, N, f"X[{i},{j}]") for j in range(N)] for i in range(N)]

    # Row constraints
    for i in range(N):
        model.AddAllDifferent(X[i])

    # Column constraints
    for j in range(N):
        model.AddAllDifferent([X[i][j] for i in range(N)])

    # Sub-grid constraints
    for r in range(n):
        for c in range(n):
            model.AddAllDifferent(
                [X[r * n + i][c * n + j] for i in range(n) for j in range(n)]
            )

    # Cage constraints
    for cage in cages:
        cells, total = cage["cells"], cage["sum"]
        variables = [X[i][j] for i, j in cells]
        model.Add(sum(variables) == total)
        model.AddAllDifferent(variables)

    # Solve model
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status in (cp_model.FEASIBLE, cp_model.OPTIMAL):
        return [[solver.Value(X[i][j]) for j in range(N)] for i in range(N)]
    else:
        return None


# Example usage:
cages = [
    {"cells": [(0, 0), (0, 1)], "sum": 3},
    {"cells": [(1, 0), (2, 0)], "sum": 6},
    # Add more cage constraints here
]

solution = solve_killer_sudoku(cages)
if solution:
    for row in solution:
        print(row)
else:
    print("No solution found.")
