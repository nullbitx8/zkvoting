import React, {useState} from "react";
import {Paragraph} from "theme-ui";
import Modal from "./modal";

const maxTotalVotes = 60;
const maxVotesPerCandidate = 20;

const candidates = [
  {
    project_id: 1,
    title: "Create a web3 Gofundme",
    description: " The Problem\n" +
      "\n" +
      "<b>Currently pop up cities like</b> MuChiangMai (https://www.craft.me/s/mNpnCsIkvRUMDD) and Zuzalu are all looking for a way to track people who contribute to these pop up cities but due to the nature of contribution it's hard to quantify and track.\n" +
      "\n" +
      "Using an example to explain this , Lets say I am in a pop up city and I decide to host Thai Language Classes ,( basically to help people interact with locals properly )  . I would need help with mic set up, looking for a classroom etc . All those people that help me make the workshop possible can basically interact on the platform and hence make it possible for me and the pop up city organizers to track their contributions.\n" +
      "\n" +
      "\n" +
      " Objective\n" +
      "\n" +
      "For the basic MVP , these things should work ....\n" +
      "\n" +
      " 1.  A platform to easily create proposals and invite contributors to it that will help push contributions updates to the Proposals\n" +
      "2. Creating a     user profile ( basic email  , name , authentication  )\n" +
      "3. A issues panel ,where anyone can raise an issue related to a proposal ( Similar to Github issue in repositories)\n" +
      "4. A Pull request system where anyone can raise potential solution and submit that solution for review .\n" +
      "\n" +
      " \n" +
      " Potential Approach\n" +
      "\n" +
      " This includes quick MVP and also how to make a scalable self hosted solution too .    \n" +
      "Bascially a markdown is like a notion page ... It's easy to write up and looks good at the same time .\n" +
      " 1. Using Github Repo's , github pages ,Husky or CI/CD and markdown files\n" +
      "       a. Basically this solution requires less coding and its faster to implement , if you wanna test out this system .\n" +
      "       b. You can create a Repo , in which the title of the repo will be in a predictable format like ``<name-of-popup-city>-<proposal-name>`` this way its easier to search on github for public good related to a specific pop up city\n" +
      "       c. In the Repo , bascially you use Markdown to document everyone contributions . so the folder  can be like this\n" +
      "        ---viaprize:\n" +
      "                          /main.md  -> this will contain sub sections with the details  like Title, Problem statement, Proof that it's being worked on ( this could be images / videos etc)\n" +
      "                          /contribution\n" +
      "                                /<contribution-title>-<contributor-username>-<date-of-contribution>.md -> this will contain a  mark down with the following sections  Title of contribution , Why you  contributed , Proof of contribution , and Additional Information  , Link to other contributor username .\n" +
      "       d.  Now using github books and some documentation tools , it can convert this contribution tracking history markdown files into a website with good UI/UX and SEO .\n" +
      "       e. Using Husky or CI/CD , it will make sure to deploy the documentation website when ever there is a push to the main repo\n" +
      "\n" +
      "2. Forking GitLab and Stream lining this process using this .\n" +
      "            a. Bascially fork Gitlab frontend ,",
    votes: 0,
  },
  {
    project_id: 2,
    title: "Create a blog for Zuzalu",
    description: "",
    votes: 0,
  },
  {
    project_id: 3,
    title: "Title 3",
    description: "",
    votes: 0,
  },
];

const VotingComponent = () => {
  const [raceOver, setRaceOver] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

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

  const openDetails = (project_id) => {
    setSelectedProject(project_id);
    setShowProjectDetails(true);
  }

  const [stateCandidates, setCandidates] = useState(candidates);

  const endRace = (candidates) => {
    setRaceOver(true);
    // Additional logic for the race being over
  };

  return (
    <>
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
                      maxHeight: "100px",
                      padding: "5px 20px",
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
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      margin: "0px",
                    }}
                  >{`Funding: $${candidate.votes}`}</p>
                  <p
                    style={{
                      margin: "0px",
                    }}
                  >{`${candidate.title}`}</p>
                  <Paragraph>
                    <div
                      dangerouslySetInnerHTML={
                        {__html: candidate.description.split(' ').slice(0, 75).join(' ')}
                      }>
                    </div>
                    <span onClick={() => {
                      openDetails(candidate.project_id)
                    }}>Read more
                    </span>
                  </Paragraph>
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
                      maxHeight: "100px",
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
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      maxHeight: "100px",
                    }}
                  >
                    max
                  </div>
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
      <Modal
        open={showProjectDetails}
        onClose={() => setShowProjectDetails(false)}
        project={{
          description: ""
        }}
      />
    </>
  );
};

export default VotingComponent;
