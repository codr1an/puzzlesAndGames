from ortools.linear_solver import pywraplp


def main():
    # Create the mip solver with the CP-SAT backend.
    solver = pywraplp.Solver.CreateSolver("SAT")
    if not solver:
        return

    infinity = solver.infinity()

    # Define the coin denominations.
    coins = [1, 2, 5, 10, 25, 50]
    values = [1, 2, 5, 10, 25, 50]

    # Create a variable for each coin type: the number of each coin to use.
    coin_vars = [solver.IntVar(0, infinity, f"coin_{value}") for value in coins]

    print("Number of variables =", solver.NumVariables())

    # Constraint: The total value of coins must equal 63.
    solver.Add(solver.Sum(coin_vars[i] * values[i] for i in range(len(coins))) == 63)

    print("Number of constraints =", solver.NumConstraints())

    # Objective: Minimize the total number of coins used.
    solver.Minimize(solver.Sum(coin_vars))

    print(f"Solving with {solver.SolverVersion()}")
    status = solver.Solve()

    if status == pywraplp.Solver.OPTIMAL:
        print("Solution:")
        print("Minimum number of coins =", solver.Objective().Value())
        for i in range(len(coins)):
            print(f"{values[i]}-cent coins =", coin_vars[i].solution_value())
    else:
        print("The problem does not have an optimal solution.")

    print("\nAdvanced usage:")
    print(f"Problem solved in {solver.wall_time():d} milliseconds")
    print(f"Problem solved in {solver.iterations():d} iterations")
    print(f"Problem solved in {solver.nodes():d} branch-and-bound nodes")


if __name__ == "__main__":
    main()
