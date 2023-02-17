import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, hide }) => isOpen ? ReactDOM.createPortal(
	<Fragment>
		<div className="modal-overlay" />
		<div className="modal-wrap" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				<div className="modal-header">
					<button 
						className="modal-close-button"
						onClick={hide}
						type="button"
						arai-label="close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className='modal-body'>
					modal body
				</div>
			</div>
		</div>
	</Fragment>, document.body
) : null;

export default Modal;