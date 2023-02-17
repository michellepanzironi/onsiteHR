import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from './hooks/useOnClickOutside'
import './App.css';

const Modal = ({ isOpen, hide, candidate, accept, reject }) => {
	const ref = React.useRef();
	const [notes, setNotes] = useState(null)
	useOnClickOutside(ref, hide);
	
	const handleAccept = () => {
		accept(candidate, notes)
		hide()
		setNotes(null)
	}
	
	const handleReject = () => {
		reject(candidate, notes)
		hide()
		setNotes(null)
	}

	return isOpen ? ReactDOM.createPortal(
		<Fragment>
			<div className="modal-overlay" />
			<div className="modal-wrap" aria-modal aria-hidden tabIndex={-1} role="dialog">
				<div className="modal" ref={ref}>

					<div className="modal-header flex">
						<button 
							className="modal-close-button"
							onClick={hide}
							type="button"
							arai-label="close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<div className="modal-body">

						<div className="flex">
							<div className="candidate-name">
								<div>{candidate.name.first}</div>
								<div>{candidate.name.last}</div>
							</div>
							<img src={candidate.picture.medium} alt="candidate" />
						</div>

						<div className="flex">
							<div>
								<div>{`${candidate.location.city}, ${candidate.location.state}`}</div>
								<div>{candidate.location.country}</div>
							</div>
							<div>
								<div>{candidate.email}</div>
								<div>{candidate.phone}</div>
								<div>{candidate.cell}</div>
							</div>
						</div>

						<label>
							<div>Notes:</div>
							<textarea 
								name="notes"
								onChange={(e) => setNotes(e.target.value)}
								defaultValue={candidate.notes}
								rows={4}
								cols={40}
							/>
						</label>

						<div className="row-buttons flex">
							<button className="accept-button" onClick={handleAccept}>{candidate.accepted ? 'Save' : 'Accept'}</button>
							<button className="reject-button" onClick={handleReject}>{candidate.rejected ? 'Save' : 'Reject'}</button>
						</div>

					</div>

				</div>
			</div>
		</Fragment>, document.body
	) : null;
}

export default Modal;