import React from 'react';

const CandidateRow = ({ candidate, openModal, accept, reject }) => {
	const handleAccept = (e) => {
		e.stopPropagation()
		accept(candidate)
	}
	const handleReject = (e) => {
		e.stopPropagation()
		reject(candidate)
	}

	return (
		<div className="candidate-row flex" data-testid="candidate-row" onClick={openModal}>
			<button>{candidate.name.first} {candidate.name.last}</button>
			<div className="flex candidate-location">
				<div>{candidate.location.city}</div>
				<div>{candidate.location.state}</div>
				<div>{candidate.location.country}</div>
			</div>

			<div className="row-buttons flex">
				{!candidate.accepted && 
					<button className="accept-button" data-testid="accept-button" onClick={handleAccept}>Accept</button>
				}
				{!candidate.rejected &&
					<button className="reject-button" data-testid="reject-button" onClick={handleReject}>Reject</button>
				}
			</div>
		</div>
	)
};

export default CandidateRow;