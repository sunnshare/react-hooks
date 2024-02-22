import ReactDOM from "react-dom/client";

// import { App } from "./useState";
import { App } from "./useMemo";

let hookIndex = 0;
let hookStates = [];

const root = ReactDOM.createRoot(document.getElementById("root"));

export function useState(initState) {
	hookStates[hookIndex] = hookStates[hookIndex] || initState;

	let currentIndex = hookIndex;
	function setState(newValue) {
		hookStates[currentIndex] = newValue;
		render();
	}
	return [hookStates[hookIndex++], setState];
}

export function useMemo(factory, dependencies) {
	if (hookStates[hookIndex]) {
		// 缓存过对象
		let [lastMemo, lastDependencies] = hookStates[hookIndex];
		// 比较一下 dependencies 和 lastDependencies
		let same = dependencies.every((item, index) => item === lastDependencies[index]);
		if (same) {
			hookIndex++;
			return lastMemo;
		} else {
			let newMemo = factory(); // {key: value}
			hookStates[hookIndex++] = [newMemo, dependencies];
			return newMemo;
		}
	} else {
		// 没有缓存过对象
		let newMemo = factory(); // {key: value}
		hookStates[hookIndex++] = [newMemo, dependencies];
		return newMemo;
	}
}

export function useCallback(callback, dependencies) {
	if (hookStates[hookIndex]) {
		// 缓存过函数
		let [lastCallback, lastDependencies] = hookStates[hookIndex];
		// 比较一下 dependencies 和 lastDependencies
		let same = dependencies.every((item, index) => item === lastDependencies[index]);
		if (same) {
			hookIndex++;
			return lastCallback;
		} else {
			hookStates[hookIndex++] = [callback, dependencies];
			return callback;
		}
	} else {
		// 没有缓存过对象
		hookStates[hookIndex++] = [callback, dependencies];
		return callback;
	}
}

function render() {
	hookIndex = 0;
	root.render(<App />);
}

render();
