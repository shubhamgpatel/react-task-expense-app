Here are the main key things to remember in ReactJS:
-	**Components** - React is component-based, meaning UIs are built using reusable components.
- **JSX** - JavaScript XML (JSX) allows writing HTML-like syntax within JavaScript code.
- **State** - State is used to manage dynamic data within a component and triggers re-rendering when updated.
- **Props** - Props are read-only data passed from parent components to child components.
- **Virtual DOM** - React uses a Virtual DOM to improve performance by updating only the changed parts of the actual DOM.
- **Lifecycle Methods** - These methods manage the lifecycle of a component, such as mounting, updating, and unmounting.
- **Hooks**  - Hooks like useState, useEffect, and useContext provide a way to use state and side-effects in functional components.
- **One-way Data Flow** - Data flows in one direction (from parent to child), making the application easier to debug.
- **Event Handling** - React has its own way of handling events, which uses camelCase syntax for events like onClick.
- **Conditional Rendering** - React allows rendering components conditionally based on certain conditions using JavaScript logic. These principles form the foundation of React development.
-  **Redux**: Redux is a predictable state management library for JavaScript applications, commonly used with React but can be used with other frameworks as well. It helps manage the state of an application in a way that is consistent, maintainable, and easy to debug.

- In Redux, the entire state of the application is stored in a single central store, which can be accessed by any component. The state is immutable, meaning it cannot be changed directly. Instead, to update the state, actions are dispatched. These actions are plain objects that describe what happened. **Reducers**, which are functions that specify how the state should change in response to an action, then update the state in an immutable manner.
**Store**: Holds the entire state of the application. Actions: Plain JavaScript objects that describe state changes. **Reducers**: Functions that handle state changes based on actions.

--- 

As for how many hooks there are in React, here are the most commonly used ones:
1. **useState**
	•	Allows you to add state to functional components.
2. **useEffect**
	•	Enables side effects in functional components, like fetching data, subscribing to events, or manually changing the DOM.
3. **useContext**
	•	Allows you to access context values in your component, making it easy to share data between components without prop drilling.
4. **useReducer**
	•	A more advanced version of useState, useful for handling complex state logic (like managing multiple state values or handling more complicated state transitions).
	•	const[state, dispatch] = useReducer()
5. **useCallback**
	•	Memoizes a function so it doesn't get recreated on every render, optimizing performance by preventing unnecessary re-renders.
6. **useMemo**
	•	Memoizes a value (like a computation or an object) so it doesn't get recomputed on every render unless dependencies change.
7. **useRef**
	•	Provides a way to reference a DOM element or a value that persists across renders but doesn’t trigger a re-render when changed.
8. **useLayoutEffect**
	•	Similar to useEffect, but it runs synchronously after all DOM mutations, making it useful for measuring or modifying the DOM before the browser paints.
9. **useImperativeHandle**
	•	Customizes the instance value that is exposed when using ref on a component, allowing you to control the methods or properties accessible from outside the component.
10. **useDebugValue**
	•	Used for debugging custom hooks, it helps display information in React DevTools about the state of a hook.
---