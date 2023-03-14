import React, { useCallback, useEffect, useState } from 'react';
import useModal from './hooks/useModal';
import Modal from './Modal'
import { useLocalStorageState } from './hooks/useLocalStorage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import CandidateRow from './CandidateRow';

function App() {
  const [candidates, setCandidates] = useLocalStorageState('candidates', []);
  const [isFetching, setIsFetching] = useState(false);
  const [modalCandidate, setModalCandidate] = useState();
  const { isOpen, toggle } = useModal();

  const newCandidates = candidates.filter(c => !c.accepted && !c.rejected);
  const acceptedCandidates = candidates.filter(c => c.accepted);
  const rejectedCandidates = candidates.filter(c => c.rejected);

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

  const handleOpenModal = (candidate) => {
    toggle()
    setModalCandidate(candidate)
  }

  const accept = (candidate, newNotes) => {
    const index = candidates.indexOf(candidate);
    const accepted = {...candidate, accepted: true, rejected: false};
    if (newNotes) accepted.notes = newNotes;
    const newList = [...candidates]
    newList[index] = accepted;
    setCandidates(newList);
  }

  const reject = (candidate, newNotes) => {
    const index = candidates.indexOf(candidate);
    const rejected = {...candidate, accepted: false, rejected: true};
    if (newNotes) rejected.notes = newNotes;
    const newList = [...candidates]
    newList[index] = rejected;
    setCandidates(newList);
  }

  const FetchMoreCandidates = (
    <button onClick={getCandidates}>Fetch More Candidates</button>
  )

  return (
    <div className="App">
      <header className="header">
        <img className="header-logo" src="/onsiteiq vector-logo.png" alt="header-logo" />
      </header>

      <div className="top-info">
        Select a candidate to view details and make changes
      </div>

      {!isFetching && <div className="candidates-list">
        <Tabs>
          <TabList>
            <Tab>New Candidates</Tab>
            <Tab>Accepted</Tab>
            <Tab>Rejected</Tab>
          </TabList>

          <TabPanel>
            {newCandidates.length === 0 ? FetchMoreCandidates : newCandidates.map(candidate => (
              <CandidateRow
                candidate={candidate}
                openModal={() => handleOpenModal(candidate)}
                key={candidate.name.last}
                accept={accept}
                reject={reject}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {acceptedCandidates.length === 0 ? 'Accepted candidates will appear here.' : acceptedCandidates.map(candidate => (
              <CandidateRow
                candidate={candidate}
                openModal={() => handleOpenModal(candidate)}
                key={candidate.name.last}
                accept={accept}
                reject={reject}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {rejectedCandidates.length === 0 ? 'Rejected candidates will appear here.' : rejectedCandidates.map(candidate => (
              <CandidateRow
                candidate={candidate}
                openModal={() => handleOpenModal(candidate)}
                key={candidate.name.last}
                accept={accept}
                reject={reject}
              />
            ))}
          </TabPanel>
        </Tabs>    
      </div>}

      <Modal isOpen={isOpen} hide={toggle} candidate={modalCandidate} accept={accept} reject={reject} />
    </div>
  );
}

export default App;
