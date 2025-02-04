from flask import Flask, jsonify, request
from flask_cors import CORS
from knight_domination_model import solve_knights

app = Flask(__name__)
CORS(app)


@app.route("/api/solve_knight_domination", methods=["POST"])
def solve_knight_domination():
    board = request.json.get("board", [])
    solution = solve_knights(board)

    return jsonify(solution)


if __name__ == "__main__":
    app.run(debug=True)
