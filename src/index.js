import ReactDOM from "react-dom/client";

// import { App } from "./useState";
// import { App } from "./useMemo";
// import { App } from "./useEffect";
// import { App } from "./useLayoutEffect";
// import { App } from "./useReducer";
import { App } from "./useContext";

let hookIndex = 0;
let hookStates = [];

export function useState(initialState) {
	return useReducer(null, initialState);
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

export function useEffect(callback, dependencies) {
	if (hookStates[hookIndex]) {
		let [lastDestroy, lastDependencies] = hookStates[hookIndex];
		let same = false;
		if (lastDependencies) {
			same = dependencies.every((item, index) => item === lastDependencies[index]);
		}
		if (same) {
			hookIndex++;
		} else {
			lastDestroy && lastDestroy();
			let arr = [null, dependencies];
			setTimeout(() => {
				arr[0] = callback();
			});
			hookStates[hookIndex++] = arr;
		}
	} else {
		let arr = [null, dependencies];
		setTimeout(() => {
			arr[0] = callback();
		});
		hookStates[hookIndex++] = arr;
	}
}

export function useLayoutEffect(callback, dependencies) {
	if (hookStates[hookIndex]) {
		let [lastDestroy, lastDependencies] = hookStates[hookIndex];
		let same = false;
		if (lastDependencies) {
			same = dependencies.every((item, index) => item === lastDependencies[index]);
		}
		if (same) {
			hookIndex++;
		} else {
			lastDestroy && lastDestroy();
			let arr = [null, dependencies];
			queueMicrotask(() => {
				arr[0] = callback();
			});
			hookStates[hookIndex++] = arr;
		}
	} else {
		let arr = [null, dependencies];
		queueMicrotask(() => {
			arr[0] = callback();
		});
		hookStates[hookIndex++] = arr;
	}
}

export function useRef(initialState) {
	hookStates[hookIndex] = hookStates[hookIndex] || { current: initialState };
	return hookStates[hookIndex++];
}

export function useReducer(reducer, initialState) {
	hookStates[hookIndex] = hookStates[hookIndex] || initialState;

	let currentIndex = hookIndex;
	function dispatch(action) {
		hookStates[currentIndex] = reducer ? reducer(hookStates[currentIndex], action) : action;
		render();
	}
	return [hookStates[hookIndex++], dispatch];
}

export function useContext(context) {
	return context._currentValue;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
function render() {
	hookIndex = 0;
	root.render(<App />);
}
render();
