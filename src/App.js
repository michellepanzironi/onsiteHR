import React, { useCallback, useEffect, useState } from 'react';
import useModal from './hooks/useModal';
import Modal from './Modal'
import CandidateRow from './CandidateRow'
import { useLocalStorageState } from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [candidates, setCandidates] = useLocalStorageState('candidates', []);
  const [isFetching, setIsFetching] = useState(false);
  const {isOpen, toggle } = useModal();

  const getCandidates = useCallback(async (controller) => {
    setIsFetching(true);
    const response = await fetch('https://randomuser.me/api/?results=10', { signal: controller.signal });
    const results = await response.json();
    await setCandidates([...candidates, ...results.results])
    setIsFetching(false);
  }, [candidates, setCandidates])

  useEffect(() => {
		const controller = new AbortController();
		if (candidates.length === 0) getCandidates(controller)
		return () => {
			controller.abort();
		}
	}, [candidates, getCandidates])

  console.log(candidates)

  // get more candidates button

  return (
    <div className="App">
      <header className="header">
        <img className="header-logo" src="/onsiteiq vector-logo.png" alt="header-logo" />
      </header>

      <div>
        Select a candidate to view details and make changes
      </div>

      {!isFetching && <div className="candidates-list">
        {candidates.map(candidate => {
          return (
            <CandidateRow candidate={candidate} openModal={toggle} key={candidate.name.last} />
          )
        })}
      </div>}

      {/* isFetching loader */}

      <Modal isOpen={isOpen} hide={toggle} />
    </div>
  );
}

export default App;
