import { useReducer } from ".";

function reducer(state, action) {
	switch (action.type) {
		case "add":
			return state + 1;
		default:
			return state;
	}
}

export function App() {
	let [state, dispatch] = useReducer(reducer, 0);

	return (
		<div>
			<span>{state}</span>
			<button onClick={() => dispatch({ type: "add" })}>加1</button>
		</div>
	);
}
