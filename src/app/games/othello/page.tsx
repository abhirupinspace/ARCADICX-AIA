"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { AuroraBackground } from "../../../components/ui/aurora-background";

type Player = "B" | "W" | null;

export default function Page() {
  const initialBoard: Player[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Set initial positions for Othello
  initialBoard[3][3] = "W";
  initialBoard[3][4] = "B";
  initialBoard[4][3] = "B";
  initialBoard[4][4] = "W";

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("B");
  const [validMoves, setValidMoves] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState(false);

  // Calculate valid moves for the current player whenever the board or current player changes
  useEffect(() => {
    const moves = calculateValidMoves(board, currentPlayer);
    setValidMoves(moves);

    // If it's AI's turn, make an AI move after 500ms
    if (currentPlayer === "W" && moves.length > 0) {
      setTimeout(() => aiMove(), 500);
    }
  }, [board, currentPlayer]);

  // AI move logic
  const aiMove = () => {
    const moves = calculateValidMoves(board, "W");
    if (moves.length === 0) {
      setCurrentPlayer("B");
      return;
    }

    // Simple AI: Choose the first available move
    const [row, col] = moves[Math.floor(Math.random() * moves.length)];
    handleClick(row, col, "W");
  };

  // Handle player and AI click, and update the board
  const handleClick = (row: number, col: number, playerOverride?: Player) => {
    const player = playerOverride || currentPlayer;
    const moves = calculateValidMoves(board, player);

    if (!moves.some((move) => move[0] === row && move[1] === col)) return;

    const newBoard = [...board.map((row) => [...row])];
    newBoard[row][col] = player;
    flipPieces(newBoard, row, col, player);

    setBoard(newBoard);
    setCurrentPlayer(player === "B" ? "W" : "B");
  };

  // Flip opponent's pieces in valid directions
  const flipPieces = (newBoard: Player[][], row: number, col: number, player: Player) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1],
    ];

    directions.forEach(([dx, dy]) => {
      let i = row + dx;
      let j = col + dy;
      const piecesToFlip: number[][] = [];

      while (i >= 0 && i < 8 && j >= 0 && j < 8 && newBoard[i][j] && newBoard[i][j] !== player) {
        piecesToFlip.push([i, j]);
        i += dx;
        j += dy;
      }

      if (i >= 0 && i < 8 && j >= 0 && j < 8 && newBoard[i][j] === player) {
        piecesToFlip.forEach(([x, y]) => {
          newBoard[x][y] = player;
        });
      }
    });
  };

  // Calculate valid moves for the current player
  const calculateValidMoves = (board: Player[][], player: Player) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1],
    ];

    const moves: number[][] = [];

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) return;

        for (const [dx, dy] of directions) {
          let i = rowIndex + dx;
          let j = colIndex + dy;
          let foundOpponent = false;

          while (i >= 0 && i < 8 && j >= 0 && j < 8 && board[i][j] && board[i][j] !== player) {
            foundOpponent = true;
            i += dx;
            j += dy;
          }

          if (foundOpponent && i >= 0 && i < 8 && j >= 0 && j < 8 && board[i][j] === player) {
            moves.push([rowIndex, colIndex]);
            break;
          }
        }
      });
    });

    return moves;
  };

  // Render the Othello grid
  const renderSquare = (row: number, col: number) => {
    const piece = board[row][col];
    const isValidMove = validMoves.some((move) => move[0] === row && move[1] === col);
    return (
      <button
        key={`${row}-${col}`}
        onClick={() => handleClick(row, col)}
        className={`h-16 w-16 border border-gray-600 flex items-center justify-center ${
          isValidMove ? "bg-green-200 hover:bg-green-300" : "bg-gray-100"
        }`}
      >
        {piece === "B" && <div className="h-10 w-10 bg-black rounded-full" />}
        {piece === "W" && <div className="h-10 w-10 bg-white rounded-full border-2 border-gray-400" />}
      </button>
    );
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => renderSquare(row, col))
          )}
        </div>
        <div className="mt-6 flex flex-col items-center">
          <p className="text-2xl font-semibold">
            Current Player: <span className={currentPlayer === "B" ? "text-black" : "text-white"}>{currentPlayer}</span>
          </p>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
