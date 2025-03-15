from ortools.sat.python import cp_model


def generate_all_killer_solutions(cages):
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

    for cage in cages:
        cells, total = cage["cage"], cage["sum"]
        variables = [X[i][j] for i, j in cells]
        model.Add(sum(variables) == total)

    solver = cp_model.CpSolver()
    solutions = []

    while True:
        status = solver.Solve(model)

        if status != cp_model.FEASIBLE and status != cp_model.OPTIMAL:
            break  # No more solutions

        # Store and print the solution
        solution = [[solver.Value(X[i][j]) for j in range(N)] for i in range(N)]
        solutions.append(solution)

        # no-good constraint to exclude already found solutions
        no_good_constraint = []
        for i in range(N):
            for j in range(N):
                b = model.NewBoolVar(f"diff_{i}_{j}")
                model.Add(X[i][j] != solution[i][j]).OnlyEnforceIf(b)
                model.Add(X[i][j] == solution[i][j]).OnlyEnforceIf(b.Not())
                no_good_constraint.append(b)

        model.Add(sum(no_good_constraint) >= 1)

    print(f"Total unique solutions found: {len(solutions)}")
    return len(solutions)
