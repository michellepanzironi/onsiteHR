import React from 'react';

const CandidateRow = ({ candidate, openModal, accept, reject }) => {
	return (
		<div className='candidate-row'>
			<button onClick={openModal}>{candidate.name.first} {candidate.name.last}</button>
			<div onClick={openModal}>{candidate.location.city}</div>
			<div onClick={openModal}>{candidate.location.state}</div>
			<div onClick={openModal}>{candidate.location.country}</div>

			<div className="row-buttons">
				<button className="accept-button" onClick={() => accept(candidate)}>Accept</button>
				<button className="reject-button" onClick={() => reject(candidate)}>Reject</button>
			</div>
		</div>
	)
};

export default CandidateRow;