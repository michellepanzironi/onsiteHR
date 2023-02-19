import { render } from '@testing-library/react';
import App from '../App';

test('use localStorage to persist candidate data', () => {
	render(<App />);
	const candidates = window.localStorage.getItem('candidates');
	expect(candidates).toBeTruthy();
})