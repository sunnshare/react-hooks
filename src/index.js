import React from "react";
import ReactDOM from "react-dom/client";

let hookStates = [];
let hookIndex = 0;

function useState(initState) {
	hookStates[hookIndex] = hookStates[hookIndex] || initState;

	let currentIndex = hookIndex;
	function setState(newValue) {
		hookStates[currentIndex] = newValue;
		render();
	}
	return [hookStates[hookIndex++], setState];
}

function Count() {
	let [number1, setNumber1] = useState(0);
	let [number2, setNumber2] = useState(0);

	return (
		<div>
			{number1}
			<button onClick={() => setNumber1(number1 + 1)}>number1 + 1</button>
			<hr></hr>
			{number2}
			<button onClick={() => setNumber2(number2 + 1)}>number2 + 1</button>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
	hookIndex = 0;
	root.render(<Count />);
}
debugger;
render();
