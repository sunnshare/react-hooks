import { useEffect, useState } from ".";

export function App() {
	const [number, setNumber] = useState(0);
	const [number1, setNumber1] = useState(0);

	useEffect(() => {
		console.log("use Effect");
		// let timer = setInterval(() => {
		// 	setNumber(number + 1);
		// }, 1000);

		// return () => {
		// 	clearInterval(timer);
		// };
	}, [number]);

	return (
		<div>
			{number}
			<button onClick={() => setNumber(number + 1)}>number加1</button>
			<br />
			{number1}
			<button onClick={() => setNumber1(number1 + 1)}>number1加1</button>
		</div>
	);
}
