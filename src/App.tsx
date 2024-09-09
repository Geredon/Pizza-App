import { Button } from './components/Buttton/Button.tsx';
import { useState } from 'react';


function App() {
	const [counter, setCounter] = useState();

	const addCounter = (e: MouseEvent) => {

	};

	return (
		<>
			<Button onClick={addCounter}>Кнпока</Button>
		</>
	);
}

export default App;
