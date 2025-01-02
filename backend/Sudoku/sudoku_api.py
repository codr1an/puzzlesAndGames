from flask import Flask, jsonify, request
from sudoku_generator import generate_sudoku
from sudoku_difficulty import remove_numbers

app = Flask(__name__)

sudoku = generate_sudoku()


@app.route("/api/sudoku_solution", methods=["GET"])
def sudoku_solution():
    return jsonify(sudoku)


@app.route("/api/sudoku", methods=["GET"])
def generate_sudoku_puzzle():
    difficulty = request.args.get("difficulty", "easy").lower()

    if difficulty not in ["easy", "medium", "hard"]:
        return (
            jsonify(
                {
                    "error": "Invalid difficulty level. Choose 'easy', 'medium', or 'hard'."
                }
            ),
            400,
        )

    puzzle = [row[:] for row in sudoku]
    puzzle = remove_numbers(puzzle, difficulty)

    return jsonify({"puzzle": puzzle, "solution": sudoku})


if __name__ == "__main__":
    app.run(debug=True)
