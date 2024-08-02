import { useState } from 'react';

// const Aplicacao = () => {
//   return <button className="square">X</button>;
// }
// const Aplicacao = (<button className="square">X</button>);


// const Square = (props) => {
//   const valor = props.valor ?? "-";
//   // const valor = props.valor ? props.valor  : "-";
//   // let valor;
//   // if (props.valor) valor = props.valor;
//   // else valor = "";
//   return <button className="square">{valor}</button>;
// }

// const Square = ({valor} : any) => {
//   const val = valor ?? "-";
//   return <button className="square">{val}</button>;
// }

// const Square = () => {
//   const [value, setValue] = useState(null);


//   const handleClick = () => {
//     setValue('X');
//   }



//   return (
//     <button
//       className="square"
//       onClick={handleClick}
//     >
//       {value}
//     </button>
//   );
// }

const Square = ({ value, onSquareClick }: any) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


const calculateWinner = (squares: any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = ({ xIsNext, squares, onPlay }: any) => {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // const handleClick = (i: any) => {
  //   if (squares[i] || calculateWinner(squares)) {
  //     return;
  //   }
  //   const nextSquares = squares.slice();
  //   if (xIsNext) {
  //     nextSquares[i] = "X";
  //   } else {
  //     nextSquares[i] = "O";
  //   }
  //   setSquares(nextSquares);
  //   setXIsNext(!xIsNext);
  // }

  const escutarClick = (i: any) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => escutarClick(0)} />
        <Square value={squares[1]} onSquareClick={() => escutarClick(1)} />
        <Square value={squares[2]} onSquareClick={() => escutarClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => escutarClick(3)} />
        <Square value={squares[4]} onSquareClick={() => escutarClick(4)} />
        <Square value={squares[5]} onSquareClick={() => escutarClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => escutarClick(6)} />
        <Square value={squares[7]} onSquareClick={() => escutarClick(7)} />
        <Square value={squares[8]} onSquareClick={() => escutarClick(8)} />
      </div>
    </>
  );
}

const Aplicacao = () => {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const escutarPlay = (nextSquares : any) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const pulePara = (proximoMovimento : any) => {
    setCurrentMove(proximoMovimento);
  }

  const movimentos = history.map((squares : any, move: any)  => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => pulePara(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={escutarPlay} />
      </div>
      <div className="game-info">
        <ol>{movimentos}</ol>
      </div>
    </div>
  );
}

export default Aplicacao
