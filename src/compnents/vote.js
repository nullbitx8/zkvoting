import React, { useState } from "react";

const maxTotalVotes = 60;
const maxVotesPerCandidate = 20;

const candidates = [
  {
    first: "Alex",
    last: "Popp",
    votes: 0,
  },
  {
    first: "George",
    last: "Washington",
    votes: 0,
  },
  {
    first: "Abraham",
    last: "Lincoln",
    votes: 0,
  },
  {
    first: "Santa",
    last: "Claus",
    votes: 0,
  },
  {
    first: "Johnny",
    last: "Cash",
    votes: 0,
  },
];

const VotingComponent = () => {
  const [raceOver, setRaceOver] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  const sendVote = (index, voteType) => {
    const updatedCandidates = [...candidates];
    if (
      voteType === "up" &&
      totalVotes < maxTotalVotes &&
      updatedCandidates[index].votes < maxVotesPerCandidate
    ) {
      updatedCandidates[index].votes = updatedCandidates[index].votes + 2;
      setTotalVotes(totalVotes + 2);
    } else if (voteType === "down" && updatedCandidates[index].votes > 0) {
      updatedCandidates[index].votes = updatedCandidates[index].votes - 2;
      setTotalVotes(totalVotes - 2);
    }

    setCandidates(updatedCandidates);
  };

  const [stateCandidates, setCandidates] = useState(candidates);

  const endRace = (candidates) => {
    setRaceOver(true);
    // Additional logic for the race being over
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "black",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        fontWeight: "bold",
      }}
    >
      <h4
        style={{
          fontFamily: "Arial, sans-serif",
          margin: "10px",
          borderRadius: "10px",
          marginTop: "20px",
          background: "black",
          color: "white",
          padding: "5px 20px",
          lineBreak: "auto",
        }}
      >
        {maxTotalVotes === totalVotes
          ? "Out of Funds"
          : `Total Funds Available: $${maxTotalVotes - totalVotes}`}
      </h4>

      <div>
        {stateCandidates.map((candidate, index) => {
          const percentage =
            (candidate.votes / maxVotesPerCandidate) * 100 + "%";

          return (
            <div
              key={index}
              style={{
                background: `linear-gradient(to right, #a2d2ff ${percentage}, transparent ${percentage})`,
                display: "flex",
                justifyContent: "space-between",
                border: "2px solid black",
                borderRadius: "5px",
                margin: "10px",
              }}
            >
              {candidate.votes > 0 ? (
                <button
                  style={{
                    background: "#ef233c",
                    border: "none",
                    color: "white",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                  onClick={() => sendVote(index, "down")}
                >
                  Down Vote
                </button>
              ) : null}
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <p>{`${candidate.first} ${candidate.last}`}</p>
                <p>${candidate.votes}</p>
              </div>
              {candidate.votes < maxVotesPerCandidate ? (
                <button
                  style={{
                    background: "#38b000",
                    border: "none",
                    color: "white",
                    padding: "5px 20px",
                    lineBreak: "auto",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                  onClick={() => sendVote(index, "up")}
                >
                  Vote Up
                </button>
              ) : (
                <div
                  style={{
                    background: "black",
                    border: "none",
                    color: "white",
                    padding: "5px 20px",
                    margin: "10px",
                    borderRadius: "5px",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      {maxTotalVotes === totalVotes && (
        <div
          style={{
            background: "black",
            border: "none",
            color: "white",
            padding: "5px 20px",
            textAlign: "center",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          <p>you can submit your votes now</p>
          <button
            style={{
              background: "#38b000",
              border: "none",
              color: "white",
              padding: "5px 20px",
              lineBreak: "auto",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default VotingComponent;
