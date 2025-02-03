from ortools.sat.python import cp_model


def solve_sudoku(grid):
    n = 3
    N = n * n
    model = cp_model.CpModel()

    # Define variables: X[i][j] represents the number in cell (i, j)
    X = [[model.NewIntVar(1, N, f"X[{i},{j}]") for j in range(N)] for i in range(N)]

    # Pre-fill the grid with given numbers
    if grid:
        for i in range(N):
            for j in range(N):
                if grid[i][j] != 0:
                    model.Add(X[i][j] == grid[i][j])

    # Each row must have unique values
    for i in range(N):
        model.AddAllDifferent(X[i])

    # Each column must have unique values
    for j in range(N):
        model.AddAllDifferent([X[i][j] for i in range(N)])

    # Each sub-grid (n x n) must have unique values
    for r in range(n):
        for c in range(n):
            model.AddAllDifferent(
                [X[r * n + i][c * n + j] for i in range(n) for j in range(n)]
            )

    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status == cp_model.FEASIBLE or status == cp_model.OPTIMAL:
        return [[solver.Value(X[i][j]) for j in range(N)] for i in range(N)]
    else:
        return None
