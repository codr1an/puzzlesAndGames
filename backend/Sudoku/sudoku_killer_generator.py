import random
import json
from sudoku_generator import generate_sudoku


def generate_cages(grid):
    # Get grid size
    rows = len(grid)
    cols = len(grid[0])

    # Directions for the neighbors (up, down, left, right)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # List to store the cages
    cages = []

    # Set to keep track of which cells have already been added to a cage
    visited = set()

    # Function to check if the neighbor is within bounds of the grid
    def in_bounds(r, c):
        return 0 <= r < rows and 0 <= c < cols

    # Function to get the neighbors of a given cell (r, c)
    def get_neighbors(r, c):
        neighbors = []
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if in_bounds(nr, nc):
                neighbors.append((nr, nc))
        return neighbors

    # Iterate through each cell in the grid
    for r in range(rows):
        for c in range(cols):
            if (r, c) not in visited:
                # Select a random number of neighbors for the current cell (1-4 neighbors)
                num_neighbors = random.randint(1, 4)
                neighbors = get_neighbors(r, c)
                selected_neighbors = random.sample(
                    neighbors, min(num_neighbors, len(neighbors))
                )

                # Create a cage starting with the current cell
                cage = [(r, c)]
                visited.add((r, c))

                # Add the selected neighbors to the cage, ensuring no duplicates
                for nr, nc in selected_neighbors:
                    if (nr, nc) not in visited:
                        cage.append((nr, nc))
                        visited.add((nr, nc))

                # Calculate the sum of the values of the cells in the cage
                cage_sum = sum(grid[r][c] for r, c in cage)

                # Add the cage and its sum to the list of cages
                cages.append({"cage": cage, "sum": cage_sum})

    return json.dumps(cages, indent=4)


# Generate a Sudoku grid
grid = generate_sudoku()

# Call the function to get the cages in JSON format
json_body = generate_cages(grid)
