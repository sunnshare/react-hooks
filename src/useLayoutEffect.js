import { useEffect, useLayoutEffect, useRef } from ".";

export function App() {
	let box1 = useRef();
	let box2 = useRef();

	const style = { width: "100px", height: "100px" };

	useEffect(() => {
		box1.current.style.transform = "translateX(300px)";
		box1.current.style.transition = "0.5s all";
	}, []);

	useLayoutEffect(() => {
		box2.current.style.transform = "translateX(300px)";
		box2.current.style.transition = "0.5s all";
	}, []);

	return (
		<div>
			<div ref={box1} style={{ ...style, background: "red" }}>
				box1
			</div>
			<div ref={box2} style={{ ...style, background: "green" }}>
				box2
			</div>
		</div>
	);
}
