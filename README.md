# Puzzles and Games Using Mixed-Integer Programming and Constraint Programming

## Thesis

The objective of this project is to mathematically model and solve various puzzles and games using optimization techniques such as Mixed-Integer Programming (MIP) and Constraint Programming (CP), and to integrate these models into a fully functional, browser-based application with an interactive user interface. The selected puzzles and games are taken from the book _**Puzzles and Games, A Mathematical Approach by Tony Hürlimann**_ ([SpringerLink](https://link.springer.com/book/10.1007/978-3-662-67381-2)).

## Selected Puzzles and Games

1. **Classic Sudoku**  
   A logic puzzle where the goal is to fill a 9×9 grid so that each column, row, and 3×3 subgrid contains all digits from 1 to 9 exactly once. Implemented using Constraint Programming via Google OR-Tools.

2. **Killer Sudoku**  
   A more complex variant of Sudoku where groups of cells ("cages") must sum to specific values without repeating digits. The solver incorporates both classic and cage-specific constraints.

3. **N-Queens Problem**  
   Place N queens on an N×N chessboard so that no two queens threaten each other. This puzzle demonstrates constraint satisfaction in a combinatorial optimization context.

4. **Knight Domination**  
   Determine the minimum number of knights required on a chessboard such that every square is either occupied by a knight or attacked by one. This problem highlights strategic domination using discrete optimization.

## Technologies Used

- **Frontend**: React and Bootstrap
- **Backend**: Python with Flask
- **Optimization Models**: [Google OR-Tools](https://developers.google.com/optimization) using **CP-SAT** and **SCIP** solvers

## Setup Instructions

Clone the Repository

```bash
git clone https://github.com/codr1an/puzzlesAndGames.git
```

Navigate into it

```bash
cd puzzlesAndGames
```

### Backend

Install the necessary Python libraries. Depending on your operating system, your pip command may differ. For example, use `py -m pip` on Windows instead of `python -m pip`.

```bash
python -m pip install ortools flask flask-cors
```

Start the backend API:

```bash
python backend/api/puzzles_and_games_api.py
```

### Frontend

Since the frontend is developed in React, you first need to install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Then, in a new terminal, navigate to the frontend directory:

```bash
cd frontend
```

If this is your first time running the frontend, install the required modules:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

A new window should automatically open in your browser. If it doesn't, you can manually access the app by navigating to http://localhost:3000.

To stop the app, press `Ctrl+C` in each terminal window or simply close them.
