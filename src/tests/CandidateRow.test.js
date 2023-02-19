import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CandidateRow from '../CandidateRow';
import { mockCandidate } from './mockCandidate';

const props = {
	candidate: mockCandidate,
	openModal: jest.fn(),
	accept: jest.fn(),
	reject: jest.fn(),
}

afterEach(() => {
	jest.resetAllMocks();
});

test('display candidate details and open modal when clicked', () => {
	render(<CandidateRow {...props} />);
	const name = screen.getByText("Dhruv Shet");
	expect(name).toBeInTheDocument();
	userEvent.click(name);
	expect(props.openModal).toHaveBeenCalled();
})

test('allow the user to accept a rejected candidate', () => {
	const newProps = {...props};
	newProps.candidate.accepted = true
  render(<CandidateRow {...newProps} />);
	const accept = screen.queryByTestId("accept-button");
	expect(accept).toBeNull();
	const reject = screen.getByTestId("reject-button");
	userEvent.click(reject);
	expect(props.reject).toBeCalled()
});

test('allow the user to reject an accepted candidate', () => {
	const newProps = {...props};
	newProps.candidate.accepted = false;
	newProps.candidate.rejected = true;
  render(<CandidateRow {...props} />);
	const reject = screen.queryByTestId("reject-button");
	expect(reject).toBeNull();
	const accept = screen.getByTestId("accept-button");
	userEvent.click(accept);
	expect(props.accept).toBeCalled()
});