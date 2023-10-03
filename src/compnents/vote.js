import React, { useState } from 'react';

const candidates = [
  {
    first: "Alex",
    last: "Popp",
    votes: 0
  },
  {
    first: "George",
    last: "Washington",
    votes: 0
  },
  {
    first: "Abraham",
    last: "Lincoln",
    votes: 0
  },
  {
    first: "Santa",
    last: "Claus",
    votes: 0
  }, 
  {
    first: "Johnny",
    last: "Cash",
    votes: 0
  }
];

const VotingComponent = () => {
  const [raceOver, setRaceOver] = useState(false);

  const sendVote = (index) => {
    if (raceOver) {
      return;
    }
    const updatedCandidates = [...candidates];
    updatedCandidates[index].votes++;
    if (updatedCandidates[index].votes === 5) {
      const winnerName = `${updatedCandidates[index].first} ${updatedCandidates[index].last}`;
      wonRace(winnerName);
    } else {
      setCandidates(updatedCandidates);
      winningRace(updatedCandidates);
    }
  };

  const [stateCandidates, setCandidates] = useState(candidates);

  const winningRace = (candidates) => {
    const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
    const firstName = sortedCandidates[0].first + ' ' + sortedCandidates[0].last;
    const secondName = sortedCandidates[1].first + ' ' + sortedCandidates[1].last;

    if (sortedCandidates[0].votes === sortedCandidates[1].votes) {
      return `The race is tied between ${firstName} and ${secondName}!`;
    }

    return `${firstName} is winning the race!`;
  };

  const wonRace = (winnerName) => {
    setRaceOver(true);
    // Additional logic for the race being over
  };

  return (
    <div className={`container ${raceOver ? 'votingDone' : ''}`}>
      <div className="winning">{raceOver ? 'Race Over!' : 'Vote for a Candidate!'}</div>
      <div className="votingContainer">
        {stateCandidates.map((candidate, index) => (
          <div className={`singleCandidate vote${candidate.votes}`} key={index}>
            <div className="name">{`${candidate.first} ${candidate.last}`}</div>
            <div className="votes">{candidate.votes}</div>
            {!raceOver && (
              <button onClick={() => {sendVote(index)
            console.log("vote sent")
            }}>Vote</button>
            )}
          </div>
        ))}
      </div>
      {raceOver && <div className="winning">{winningRace(stateCandidates)}</div>}
    </div>
  );
};

export default VotingComponent;
