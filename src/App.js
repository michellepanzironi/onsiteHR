import React, { useCallback, useEffect, useState } from 'react';
import useModal from './hooks/useModal';
import Modal from './Modal'
import './App.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const {isOpen, toggle } = useModal();

  const getCandidates = useCallback(async (controller) => {
    setIsFetching(true);
    const response = await fetch('https://randomuser.me/api/?results=10', { signal: controller.signal });
    const results = await response.json();
    await setCandidates([...candidates, ...results.results])
    setIsFetching(false);
  }, [candidates])

  useEffect(() => {
		const controller = new AbortController();
		if (candidates.length === 0) getCandidates(controller)
		return () => {
			controller.abort();
		}
	}, [candidates, getCandidates])

  console.log(candidates)

  // get more candidates

  return (
    <div className="App">
      <header className="header">
        <img className="header-logo" src="/onsiteiq vector-logo.png" alt="header-logo" />
      </header>

      <div>
        Select a candidate to view details and make changes
      </div>

      {!isFetching && <div className="candidates-list">
        list of candidates component
      </div>}

      {/* isFetching loader */}

      <div>
        <button onClick={toggle}>modal open</button>
        <Modal isOpen={isOpen} hide={toggle} />
      </div>
    </div>
  );
}

export default App;
