import React from 'react';

const CandidateRow = ({ candidate, openModal }) => {
	return (
		<div className='candidate-row' onClick={() => openModal()}>

			<button>{candidate.name.first} {candidate.name.last}</button>

			<div>{candidate.location.city}</div>
			<div>{candidate.location.state}</div>
			<div>{candidate.location.country}</div>

			<button className="accept-button">Accept</button>
			<button className="reject-button">Reject</button>
		</div>
	)
};

export default CandidateRow;