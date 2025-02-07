import matplotlib.pyplot as plt
import numpy as np
import random


def draw_sudoku_killer(cages):
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.set_xticks(np.arange(10) - 0.5, minor=True)
    ax.set_yticks(np.arange(10) - 0.5, minor=True)
    ax.grid(which="minor", color="black", linestyle="-", linewidth=2)
    ax.set_xticklabels([])
    ax.set_yticklabels([])
    ax.tick_params(which="both", length=0)

    colors = {}
    for i, cage in enumerate(cages):
        color = (
            random.random(),
            random.random(),
            random.random(),
            0.3,
        )  # Generate a random light color
        for r, c in cage["cells"]:
            ax.add_patch(plt.Rectangle((c, r), 1, 1, color=color))
        min_row, min_col = min(cage["cells"])
        ax.text(
            min_col + 0.1,
            min_row + 0.2,
            str(cage["sum"]),
            ha="left",
            va="top",
            fontsize=10,
            color="black",
            bbox=dict(facecolor="white", edgecolor="none", boxstyle="round,pad=0.2"),
        )

    ax.set_xlim(-0.5, 8.5)
    ax.set_ylim(8.5, -0.5)
    plt.show()


cages = [
Cage: [(0, 0), (1, 0), (0, 1)], Sum: 18
Cage: [(0, 2), (0, 1), (0, 3)], Sum: 19
Cage: [(0, 4), (0, 5), (0, 3)], Sum: 18
Cage: [(0, 6), (0, 5), (1, 6)], Sum: 16
Cage: [(0, 7), (0, 6), (1, 7), (0, 8)], Sum: 15
Cage: [(1, 1), (1, 0), (1, 2)], Sum: 18
Cage: [(1, 3), (1, 4), (2, 3), (1, 2)], Sum: 20
Cage: [(1, 5), (1, 6)], Sum: 9
Cage: [(1, 8), (2, 8)], Sum: 10
Cage: [(2, 0), (3, 0)], Sum: 4
Cage: [(2, 1), (2, 2), (3, 1)], Sum: 11
Cage: [(2, 4), (3, 4)], Sum: 13
Cage: [(2, 5), (1, 5), (2, 4)], Sum: 14
Cage: [(2, 6), (2, 7), (1, 6)], Sum: 20
Cage: [(3, 2), (3, 3), (4, 2)], Sum: 21
Cage: [(3, 5), (2, 5), (4, 5), (3, 6)], Sum: 18
Cage: [(3, 7), (2, 7), (3, 8), (4, 7)], Sum: 14
Cage: [(4, 0), (5, 0)], Sum: 10
Cage: [(4, 1), (3, 1), (4, 2), (5, 1), (4, 0)], Sum: 30
Cage: [(4, 3), (4, 4), (3, 3), (4, 2)], Sum: 29
Cage: [(4, 6), (5, 6), (3, 6)], Sum: 17
Cage: [(4, 8), (4, 7), (3, 8), (5, 8)], Sum: 18
Cage: [(5, 2), (4, 2), (5, 1)], Sum: 16
Cage: [(5, 3), (6, 3)], Sum: 7
Cage: [(5, 4), (6, 4)], Sum: 8
Cage: [(5, 5), (6, 5), (4, 5)], Sum: 15
Cage: [(5, 7), (5, 6), (5, 8), (4, 7)], Sum: 21
Cage: [(6, 0), (5, 0), (7, 0), (6, 1)], Sum: 25
Cage: [(6, 2), (6, 3)], Sum: 5
Cage: [(6, 6), (5, 6), (7, 6), (6, 7), (6, 5)], Sum: 26
Cage: [(6, 8), (6, 7)], Sum: 5
Cage: [(7, 1), (7, 2), (7, 0)], Sum: 11
Cage: [(7, 3), (7, 2)], Sum: 7
Cage: [(7, 4), (7, 5), (8, 4)], Sum: 19
Cage: [(7, 7), (8, 7), (7, 8)], Sum: 20
Cage: [(8, 0), (7, 0), (8, 1)], Sum: 14
Cage: [(8, 2), (7, 2)], Sum: 10
Cage: [(8, 3), (8, 2)], Sum: 10
Cage: [(8, 5), (8, 4), (7, 5), (8, 6)], Sum: 15
Cage: [(8, 8), (7, 8), (8, 7)], Sum: 22
]

draw_sudoku_killer(cages)
