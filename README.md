### useState

- params (state)，return [state, setState]
- 内部采用闭包，用 currentIndex 去记录 state 在 hookStates 数组中的位置
- 调用 setState 设置值时，将 state 改变，并重置 hookIndex，重新渲染组件

### useMemo

- params (() => {key: value}, [deps])，return {key: value}
- 初始以 [{key, value}, [deps]]形式 缓存在 hookStates 中
- 读取时比较前后 deps 的变化，不变则读取缓存，发生改变则重新缓存

### useCallback

- params (() => fn, [deps])，return () => fn
- 与 useMemo 实现基本一致

### useEffect

- params (callback, [deps])，return callback()
- 初始以 [callback(), [deps]]形式 缓存在 hookStates 中
- 读取时比较前后 deps 的变化，发生改变则调用 destroy 函数，重新缓存销毁函数和依赖
