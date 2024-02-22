import React from "react";
import { useCallback, useMemo, useState } from ".";

function Child({ data, onButtonClick }) {
	console.log("child click");
	return (
		<div>
			{data.age}
			<button onClick={onButtonClick}>修改年龄</button>
		</div>
	);
}

// 由于 render 函数执行时 Child 会重新创建，所以需要使用 React.memo 进行缓存一下
// eslint-disable-next-line no-func-assign
Child = React.memo(Child); // 比较两个属性，如果前后一致就不会更新了 shouldComponentUpdate

export function App() {
	const [name, setName] = useState("zhang");
	const [age, setAge] = useState(18);

	const data = useMemo(() => ({ age }), [age]);
	const addClick = useCallback(() => setAge(age + 1), [age]);
	return (
		<div>
			{name}
			<input type="text" value={name} onChange={e => setName(e.target.value)}></input>
			<Child data={data} onButtonClick={addClick}></Child>
		</div>
	);
}
