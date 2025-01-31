import random


def remove_numbers(grid, difficulty):
    """Removes numbers from the Sudoku grid based on the difficulty."""
    difficulties = {
        "easy": 43,
        "medium": 50,
        "hard": 56,
    }

    cells_to_remove = difficulties.get(difficulty, 36)
    side = len(grid)
    removed = 0

    while removed < cells_to_remove:
        row = random.randint(0, side - 1)
        col = random.randint(0, side - 1)

        if grid[row][col] != 0:
            grid[row][col] = 0
            removed += 1

    return grid
