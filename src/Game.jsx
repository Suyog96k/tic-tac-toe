// src/Game.jsx
import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Check winner
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const currentWinner = checkWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
    }
  };

  const renderStatus = () => {
    if (winner) {
      return (
        <Typography variant="h5">{`${winner} Wins!`}</Typography>
      );
    } else {
      return (
        <Typography variant="h5">{`Next player: ${
          isXNext ? 'X' : 'O'
        }`}</Typography>
      );
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        backgroundColor: '#FFEB3B', // Light yellow background for the whole screen
        textAlign: 'center',
        padding: 2,
        boxSizing: 'border-box',
        overflow: 'hidden', // Prevent overflow and hide scrollbars
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: '5vw', color: '#388E3C' }}
      >
        Tic-Tac-Toe
      </Typography>
      {renderStatus()}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // Three equal columns for the Tic-Tac-Toe grid
          gridTemplateRows: 'repeat(3, 1fr)', // Three equal rows for the Tic-Tac-Toe grid
          gap: 0,
          width: '80vmin', // Grid will take up 80% of the smaller viewport dimension (height or width)
          height: '80vmin', // Square grid, ensuring it takes up 80% of the smaller dimension (height or width)
          position: 'relative',
        }}
      >
        {board.map((value, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight:
                index % 3 !== 2 ? '4px solid green' : 'none', // Green line between cells horizontally
              borderBottom: index < 6 ? '4px solid green' : 'none', // Green line between cells vertically
              position: 'relative',
            }}
            onClick={() => handleClick(index)}
          >
            <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                fontSize: '3vw',
                fontWeight: 'bold',
              }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        sx={{
          marginTop: 3,
          fontSize: '1vw', // Responsive button text size
          padding: '10px 20px',
        }}
        variant="contained"
        color="primary"
        onClick={handleReset}
      >
        Reset Game
      </Button>
    </Box>
  );
};

export default Game;
