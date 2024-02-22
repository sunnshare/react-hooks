import { forwardRef, useRef } from "react";
import { useImperativeHandle } from ".";

function Child(props, inputRef) {
	useImperativeHandle(inputRef, () => ({
		focus() {
			console.log("ok");
		},
		blur() {
			console.log("blur");
		},
	}));

	return <input type="text" ref={inputRef}></input>;
}

const ForwardChild = forwardRef(Child);

export function App() {
	const inputRef = useRef();

	function getFoucus() {
		console.log(inputRef.current);
	}
	return (
		<div>
			<ForwardChild ref={inputRef}></ForwardChild>
			<button onClick={getFoucus}>获取焦点</button>
		</div>
	);
}
