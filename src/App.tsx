

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

const Square = ({valor}) => {
  const val = valor ?? "-";
  return <button className="square">{val}</button>;
}

const Aplicacao = () => {
  return (
    <>
      <div className="board-row">
        <Square valor="X"/>
        <Square valor="0"/>
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

export default Aplicacao
