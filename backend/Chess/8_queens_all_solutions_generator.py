import json
from ortools.linear_solver import pywraplp


def generate_all_queens_solutions():
    N = 8
    solver = pywraplp.Solver.CreateSolver("SAT")
    if not solver:
        return []

    X = [[solver.IntVar(0, 1, f"X[{i},{j}]") for j in range(N)] for i in range(N)]

    for i in range(N):
        solver.Add(sum(X[i][j] for j in range(N)) == 1)
    for j in range(N):
        solver.Add(sum(X[i][j] for i in range(N)) == 1)
    for d in range(-N + 1, N):
        solver.Add(sum(X[i][j] for i in range(N) for j in range(N) if i - j == d) <= 1)
    for d in range(2 * N - 1):
        solver.Add(sum(X[i][j] for i in range(N) for j in range(N) if i + j == d) <= 1)

    solutions = []
    while solver.Solve() == pywraplp.Solver.OPTIMAL:
        solution = [[int(X[i][j].solution_value()) for j in range(N)] for i in range(N)]
        solutions.append(solution)

        solver.Add(
            sum(
                X[i][j]
                for i in range(N)
                for j in range(N)
                if X[i][j].solution_value() == 1
            )
            <= N - 1
        )

    return solutions


def get_solutions_json():
    solutions = generate_all_queens_solutions()
    return json.dumps(solutions, indent=4)
