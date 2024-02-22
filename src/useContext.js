import React from "react";
import { useContext, useState } from ".";

const CounterContext = React.createContext();

function ChildCounter() {
	let { number, setNumber } = useContext(CounterContext);
	return (
		<div>
			{number}
			<button onClick={() => setNumber(number + 1)}>加1</button>
		</div>
	);
}
export function App() {
	let [number, setNumber] = useState(0);

	return (
		<CounterContext.Provider value={{ number, setNumber }}>
			<ChildCounter />
		</CounterContext.Provider>
	);
}
