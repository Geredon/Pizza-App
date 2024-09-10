import { Button } from './components/Buttton/Button.tsx';
import { useState } from 'react';
import { Input } from './components/Input/Input.tsx';

function App() {
	const [counter, setCounter] = useState();

	const addCounter = (e: MouseEvent) => {

	};

	return (
		<>
			<Button onClick={addCounter}>Кнпока</Button>
			<Button appearance="big" onClick={addCounter}>Кнпока</Button>
			<Input placeholder="Email"/>
		</>
	);
}

export default App;
