# SudokuSolver
A sudoku solver I began creating while at camp for the weekend with my family.

The solver works by filling in squares which only have one remaining possible value based on the filled in squares.
When no more such squares are found, the solver looks for singletons (squares which must take a certain value because all
other candidates in its block, row or column cannot take the value)

In its current state, the solver does not take into account doubletons. Being so, it will fail to solve sudokus which require
this clever trick.
