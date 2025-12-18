import {  useState, useCallback } from "react";

const buttons = [
  "C", "/", "*", "DEL",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", "."
];

const isOperator = (v) => ["+", "-", "*", "/"].includes(v);

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = useCallback((value) => {
  if (value === "C") {
    setExpression("");
    setResult("");
    return;
  }

  if (value === "DEL") {
    setExpression(prev => prev.slice(0, -1));
    return;
  }

  if (value === "=") {
    if (!expression) return;
    try {
      const res = Function(`return ${expression}`)();
      setResult(res);
      setHistory(prev => [`${expression} = ${res}`, ...prev]);
    } catch {
      setResult("Error");
    }
    return;
  }

  const last = expression.slice(-1);
  if (isOperator(value) && isOperator(last)) return;
  if (value === "." && last === ".") return;

  setExpression(prev => prev + value);
}, [expression]);
  return (
    <div className="calculator">
      <div className="calculator-display">
        <span className="expression">{expression || "0"}</span>
        <span className="result">{result}</span>
      </div>

      <div className="calculator-buttons">
        {buttons.map(btn => (
          <button
            key={btn}
            className={`calculator-button ${
              btn === "C" ? "clear" :
              btn === "=" ? "equals" :
              isOperator(btn) ? "operator" : ""
            }`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="history">
        {history.map((h, i) => <div key={i}>{h}</div>)}
      </div>
    </div>
  );
}

export default App;
