import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Modal from '../Modal';
import { mockCandidate } from './mockCandidate';

const props = {
	candidate: mockCandidate,
	hide: jest.fn(),
	isOpen: true,
	reject: jest.fn()
}

afterEach(() => {
	jest.resetAllMocks();
});

test('modal shows the candidate info and a close button', () => {
  render(<Modal {...props}/>);
	const name = screen.getByText("Dhruv");
	expect(name).toBeInTheDocument();
	const city = screen.getByText("Kanpur, Gujarat");
	expect(city).toBeInTheDocument();
  const close = screen.getByTestId("modal-close-button");
  expect(close).toBeInTheDocument();
});

test('allow user to leave candidate notes in modal', () => {
	const newProps = {...props}
	newProps.candidate.notes = 'Notes for Dhruv';
	render(<Modal {...props}/>);
	const textarea = screen.getByText('Notes for Dhruv');
	expect(textarea).toBeInTheDocument();
	userEvent.type(textarea, '{space}Shet');
	expect(textarea).toHaveValue('Notes for Dhruv Shet');
	const reject = screen.getByTestId("reject-button");
	userEvent.click(reject);
	expect(props.reject).toHaveBeenCalledWith(newProps.candidate, 'Notes for Dhruv Shet');
});

test('allow user to accept/reject candidate', () => {
	const newProps = {...props}
	newProps.candidate.accepted = true;
	render(<Modal {...props}/>);
	expect(screen.getByText('Save')).toBeInTheDocument()
	expect(screen.getByText('Reject')).toBeInTheDocument()
});
