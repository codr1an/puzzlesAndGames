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


cages = [
    {"cells": [(0, 0), (0, 1)], "sum": 12},
    {"cells": [(1, 0), (1, 1)], "sum": 3},
    {"cells": [(0, 2), (1, 2)], "sum": 11},
    {"cells": [(2, 1), (3, 1), (2, 2), (3, 0), (4, 1)], "sum": 26},
    {"cells": [(2, 5), (3, 5), (3, 4), (4, 5)], "sum": 19},
    {"cells": [(3, 7), (4, 7)], "sum": 11},
    {"cells": [(4, 2), (5, 2), (4, 3), (6, 2)], "sum": 17},
    {"cells": [(4, 6), (5, 6)], "sum": 4},
    {"cells": [(5, 0), (6, 0), (7, 0), (6, 1)], "sum": 20},
    {"cells": [(5, 4), (6, 4), (6, 3), (6, 5)], "sum": 13},
    {"cells": [(5, 7), (6, 7)], "sum": 9},
    {"cells": [(7, 6), (8, 6)], "sum": 14},
    {"cells": [(7, 8), (8, 8), (8, 7)], "sum": 12},
    {"cells": [(8, 1), (8, 2), (8, 3)], "sum": 20},
]


solution = solve_killer_sudoku(cages)
if solution:
    for row in solution:
        print(row)
else:
    print("No solution found.")
