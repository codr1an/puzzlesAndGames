from flask import Flask
from flask_cors import CORS
from eight_queens_controller import queens_bp
from knight_domination_controller import knights_bp
from sudoku_controller import sudoku_bp
from killer_sudoku_controller import killer_sudoku_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(queens_bp, url_prefix="/api")
app.register_blueprint(knights_bp, url_prefix="/api")
app.register_blueprint(sudoku_bp, url_prefix="/api")
app.register_blueprint(killer_sudoku_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
