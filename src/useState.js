import { useState } from ".";

export function App() {
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
