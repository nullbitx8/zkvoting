import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Paragraph } from "theme-ui";
import Modal from "./modal";
import useSound from "use-sound";
import { encodeSignal } from "../lib";
import { SemaphoreEthers } from "@semaphore-protocol/data";
import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { generateProof } from "@semaphore-protocol/proof";

const maxTotalVotes = 60;
const maxVotesPerCandidate = 20;

const candidates = [
  {
    title: "A social graph to make connections in web3 communities",

    description:
      '<h1>Socialite</h1><blockquote><p>A social graph to make connections in web3 communities</p></blockquote><h3>Problem Statement</h3>As an organizer, it’s hard to know whether community members are actually interacting with each other and establishing strong relationships as a bonded community.<br><br>One of my main reasons for joining Mu Chiang Mai was to be able to meet new people from different backgrounds, but I’m horrible at reaching out and making that first point of connection. As someone who joined solo, without some form of connection into the community, I would feel like an outsider, and that makes me less likely to interact until I feel like I found someone that would be open to talk me because, I just don’t know anyone else to talk to. I want to be able to know who knows who, but without a way to see the relationships within a community, newcomers to a community need to take a leap of faith to find their tribe of friends within the community to hang out with.<br><br>Communities are about finding the people you like hanging out with and creating lasting connections that go beyond the community as lasting, genuine friendships.<br><br>So what if you had a way to visualize all of that with a social graph?<br><br>You would be able to see all the mutual relationships within a community that you’ve created, and also be able to see the progress you have made in meeting new friends while you’re in the community and continue relationships beyond the community.<br><br><hr><br><p><img src="https://www.viaprize.org/api/static/images/campaign/30/76/07/0AE68F38-638A-11EE-AE0E-5E65CE8206F8-image-a68fa10ef3e7876df7963e900fdd6c9f7108b3dd1d6a4a6df17c3748848df243.png" class="fr-fic fr-dib" style="width: 95.3%;"></p><div><br></div><div><strong>This project called ‘Socialite’ solves the problem of incentivizing mutual connections within communities',
    image:
      "https://www.viaprize.org/api/image/campaign_detail_large/campaign/72/93/6e/8F499A78-6389-11EE-8CEE-5E65CE8206F8-image-a51d858ddb48d88d7328c52677f3a882599fa34f3409ca0c16f628e392fb5312.png",
    link: "https://www.viaprize.org/campaign/161/a-social-graph-to-make-connections-in-web3-communities",
  },
  {
    title: "Github Inspired Platform but for Public Good Contribution",

    description:
      "<p>The Problem<br><br>Currently, pop-up cities like MuChiangMai &nbsp;(https://www.craft.me/s/mNpnCsIkvRUMDD) and Zuzalu are all looking for a &nbsp;way to track people who contribute to these pop-up cities. However, due &nbsp;to the nature of contribution, it's hard to quantify and track.<br><br>Using &nbsp;an example to explain this: Let's say I am in a pop-up city and I &nbsp;decide to host Thai Language Classes (basically to help people interact &nbsp;with locals properly). I would need help with mic set up, looking for a &nbsp;classroom, etc. All those people that help me make the workshop possible &nbsp;can basically interact on the platform and hence make it possible for &nbsp;me and the pop-up city organizers to track their contributions.<br><br>Objective<br><br>For the basic MVP, these things should work:<br><br>1. &nbsp;A platform to easily create proposals and invite contributors to it &nbsp;that will help push contributions updates to the Proposals.<br>2. Creating a user profile (basic email, name, authentication).<br>3. An issues panel, where anyone can raise an issue related to a proposal (Similar to Github issue in repositories).<br>4. A Pull request system where anyone can raise potential solutions and submit that solution for review.<br><br>Potential Approach<br><br>This &nbsp;includes a quick MVP and also how to make a scalable self-hosted &nbsp;solution too. Basically, a markdown is like a Notion page... It's easy &nbsp;to write up and looks good at the same time.<br><br>1. Using Github Repos, Github Pages, CI/CD, and markdown files:<br>&nbsp; &nbsp;a. Basically, this solution requires less coding and it's faster to implement if you want to test out this system.<br>&nbsp; &nbsp; b. Every Pop Up city will have a GitHub account/organization, which &nbsp;will contain a repository marked by the year of the Pop-up city &nbsp;happening. Example: 'Zuzalu-2023.'<br>&nbsp; &nbsp;c. In the Repo, basically, you &nbsp;use folders and Markdown to document everyone's contributions. So the &nbsp;folder can be named like:<br>&nbsp; &nbsp; &nbsp; - &lt;proposal-title&gt;:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - /main.md &nbsp;-&gt; this will contain subsections with the details like &nbsp;Title, Problem statement, Proof that it's being worked on (this could be &nbsp;images/videos etc.).<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- /contribution<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- &nbsp;/&lt;contribution-title&gt;-&lt;contributor-username&gt;-&lt;date-of-contribution&gt;.md &nbsp;-&gt; this will contain markdown with the following sections: Title of &nbsp;contribution, Why you contributed, Proof of contribution, Additional &nbsp;Information, Link to other contributor usernames.<br>&nbsp; &nbsp;d. Now using &nbsp;Github books and some documentation tools, it can convert this &nbsp;contribution tracking history markdown files into a website with good &nbsp;UI/UX and search engine optimization.<br>&nbsp; &nbsp;e. Using Husky or CI/CD, it &nbsp;will make sure to deploy the documentation website whenever there is a &nbsp;push to the main repository.<br><br>2. Forking GitLab and Streamlining this process using this:<br>&nbsp; &nbsp; a. Basically fork Gitlab frontend, and its backend &nbsp;(https://gitlab.com/gitlab-org) and optimize for Contribution tracking &nbsp;and documenting rather than coding projects.<br><br>3. Using Open &nbsp;source, decentralized GitHub alternatives like https://radicle.xyz/, &nbsp;https://gogs.io/, &nbsp;https://www.fossil-scm.org/home/doc/trunk/www/index.wiki:<br>&nbsp; &nbsp;a. This &nbsp;can be a good way to build the MVP and the final project because it can &nbsp;be self-hosted and run by communities independently.<br><br><br><br>Impact:<br><br>1. &nbsp;Basically, anyone in the pop-up city and even outside can easily help &nbsp;with any ongoing proposals by simply opening a Pull Request.<br><br>2. &nbsp;Adding an LLM (Large Language Model) like Chat GPT to the markdown &nbsp;files' contributions can provide a really powerful way to query &nbsp;contributions. For example, a query like \"Who helped organize workshops &nbsp;related to web3 gaming?\"<br><br>3. This helps other pop-up cities see the impact someone created while attending previous pop-up cities.<br><br>4. &nbsp;Utilizing the API of repository managers like Github, Gitlab, or &nbsp;Radicle.xyz, it can provide push notifications to platforms like &nbsp;Telegram, WhatsApp, Slack, etc. Additionally, it can allow people to &nbsp;create their own front ends.<br><br> \"",
    image:
      "https://www.viaprize.org/api/image/campaign_detail_large/campaign/8f/c8/5c/FD9812E4-6270-11EE-A1D0-5D65CE8206F8-image-0af0e5e22d1e561a5adb1b25ed6df63c7bf5511323ad3e4a490e631a6269d83a.png",
    link: "https://www.viaprize.org/campaign/157/github-inspired-platform-but-for-public-good-contribution",
  },
  {
    title: "ViaPrize ZK Proposal Voting: Self Generated Secrets",

    description:
      "<p><strong>The problem:</strong></p><p>We developed an MVP for a voting app. It uses zero knowledge proofs to avoid anyone knowing which address is voting what.</p><p>The problem is that in order to simplify the system in the first iteration, we simply generated a bunch of identities that we gave to the participants.</p><p>That is a problem, because if we generate the identities(aka. secrets) of the members, those are not actually secret anymore, and that is a trust point in the system.</p><br><strong>Objective:</strong><br><p>The goal with this proposal is to improve the system so everyone can generate their own identities (i.e. secrets) so the system is trustless. Each member owns their own secret and then submit their commitment to the organization with their personal details. The organization would check that this person had not been added yet to the group of members, and then add it.</p><p>Bottom line, the organization always has the power to add and remove members, but doesn't know the secrets of the members.</p><br><strong>Potential Approach:</strong><br><p>We want to improve the system in a way so that secrets keep private. Users would generate their commitments and submit those, with some piece of information that identifies them, to the organization. That would enable the organizers to verify that no one gets included more than once, but would not know which address each person is using.</p><p>By doing that, members can later on use the system while keeping their identities totally private.&nbsp;</p><br>",
    image:
      "https://www.viaprize.org/api/image/campaign_detail_large/campaign/9d/0d/40/DB7847E2-63FB-11EE-BC9D-5E65CE8206F8-image-71b4def270799dc4832f7f5264e7b42dac304ae20ff11abca1339dd99f2f4e72.jpg",
    link: "https://www.viaprize.org/campaign/169/viaprize-zk-proposal-voting-self-generated-secrets",
  },
  {
    title: "Democratic Retro PGF with Impact Certs",

    description:
      "Problem statement: How do we award residents for contributions in a flexible way? <br>Ideally there's a do-ocracy in which contributions are recognized and rewarded and it's more fluid for residents to jump in and help with organizing things themselves.<br><br>Context:<br>During Zuzalu, the Hypercerts team and residents told everyone to create a hypercert representing some way they've contributed to the community over the last week. We had a pool of funds awarded to the contributors after voting. This was all done quite manually and could be made easier with a platform.&nbsp;<br><br>Solution: <br>Make a platform in which someone may launch a retro PGF (retroactive public goods funding) round in which they add funding into a smart contract, any community member can participate by adding a title, tags, and pictures to a hypercert (kinda like an NFT playing card, see hypercerts.org) of some sort of community contribution they've done within the last x number of days, then community members may vote on those contributions/add kudos. Then according to the percentage of votes a contribution received, the grantee receives that percentage of the funds held in the smart contract at the end of the voting deadline. ie: Someone's contributions receive 10% of the votes and so it receives 10% of the funds. <br>Perhaps it's also good for someone to be able to nominate someone else and add their wallet address and contribution for them.",
    image:
      "https://www.viaprize.org/api/image/campaign_detail_large/campaign/9d/0d/40/4E623164-63F2-11EE-B78B-5E65CE8206F8-image-71b4def270799dc4832f7f5264e7b42dac304ae20ff11abca1339dd99f2f4e72.jpg",
    link: "https://www.viaprize.org/campaign/164/democratic-retro-pgf-with-impact-certs",
  },
  {
    title: "Anonymous Credit Scoring System For Communities",

    description:
      "<strong>Problem Statement:</strong><br><p>Create a comprehensive credit scoring system tailored for event participants, allowing for the anonymous allocation of points (both positive and negative) by peers, considering factors such as contributions, behavior, helpfulness, and overall engagement during events. This system should foster transparency and fairness in evaluating participant involvement.<br><br><strong>Objective:</strong></p><p>Leveraging this credit scoring mechanism as a pivotal indicator for the selection of individuals in subsequent events. By prioritizing participants with higher credit scores, we aim to enhance event quality and inclusivity by including those who consistently exhibit active and positive contributions, ultimately benefiting the event community and its objectives.</p><strong>Potential Approach:</strong><br>The current proposed approach:<br>- Register IDs of the possible participants in a system queued for consideration.<br>- Use a pool (could be a SC) and utilize ZK to have p2p credit sending/receiving system for both positive/negative points with anonymity<br>- Limit the number of points using RLNs (Rate Limiting Nullifiers) to prevent spamming of points<br>- Later, participants can prove the number of points they have in the next event application to enhance their acceptance rate (if the point balance is good enough)<br>- Have a buffer for newcomers selection, or let highly rate folks (with a lot of points) recommend other newcomers",
    link: "https://www.viaprize.org/campaign/165/anonymous-credit-scoring-system-for-communities",
    image:
      "https://www.viaprize.org/api/image/campaign_detail_large/campaign/7f/48/e7/E193466A-63F4-11EE-A916-5E65CE8206F8-image-f83d3fcd75550403da21ea39dfa8609736916a115475e1b65807ae53d976aea5.png",
  },
  {
    link: "https://www.viaprize.org/campaign/170/github-plagiarism-tracker-anti-fraud-hackathon-submissions",
    title: "Github Plagiarism Tracker: Anti Fraud Hackathon Submissions",
    image:
      "https://www.viaprize.org/api/image/campaign_detail_large/campaign/9d/0d/40/2A1A3952-63FF-11EE-807D-5D65CE8206F8-image-71b4def270799dc4832f7f5264e7b42dac304ae20ff11abca1339dd99f2f4e72.jpghttps://www.viaprize.org/api/image/campaign_detail_large/campaign/9d/0d/40/2A1A3952-63FF-11EE-807D-5D65CE8206F8-image-71b4def270799dc4832f7f5264e7b42dac304ae20ff11abca1339dd99f2f4e72.jpg",

    description:
      '<strong>Problem:<br></strong>Hackathons should be a competition of meritocracy. Prizes are awarded to those who submit projects with the best implementation. However, hackathons sometimes receive submissions with significant pre-built work and it makes the competition unfair for those who start from a blank repository.<br><br><strong>Objective:</strong><br>This proposal is to create a system that will flag projects that have a significant amount of changes in a single commit, a codebase with significant resemblance to a pre-existing project, and blatant shilling of personal projects.<strong><br></strong><strong><br>Potential Approach:</strong><br>To create a fair hackathon, there should be rules in place in addition to a technical flagging system. First, when a hackathon is announced, we should explicit state the following disqualifiers: &nbsp;<br>- projects that shill a current company/startup<br>- pre-built projects are not allowed<br>- projects with a significant amount of changes in a single commit.<br><br>Next, the hackathon platform will adopt a plugin that pre-analyzes repositories. Each hackathon URL is passed through the plugin where each commit is assessed whether it is too large to be "human" written. We encourage small and frequent commits.&nbsp;',
  },
  {
    image:
      "https://www.viaprize.org/api/image/campaign_detail_large/campaign/f7/eb/61/D88AB1FE-633E-11EE-9980-5E65CE8206F8-image-da4201a1d0595cf36c8bc3e51d6db5dd72b73c9ec1ed77982a28d0b69d3310a3.png",
    link: "https://www.viaprize.org/campaign/160/decentralized-sport-prediction-market-using-smart-contracts",
    title: "Decentralized Sport Prediction Market using Smart Contracts",

    description:
      "<h3>The Problem Statement:</h3><ul><li>Traditional prediction markets lack transparency, are centralized, and are susceptible to fraud, hindering trust and participation.</li></ul><h3>Objective:</h3><ul><li>Develop a decentralized global prediction market leveraging smart contracts, revolutionizing prediction methods across diverse domains such as finance and entertainment</li></ul><h3>Potential Approach:</h3><ul><li>Utilize blockchain and smart contracts to ensure transparency and security, streamlining bet creation, secure transactions, and accurate outcomes.</li><li>Integrate an oracle system to fetch real-time data from reputable sources, guaranteeing precise predictions and enhancing result reliability.</li></ul><h3>Scope:</h3><ul><li>Create a transparent, secure, and accessible platform for predictive betting</li><li>Extend the platform's functionality to cover predictions providing insights into various domains like finance, entertainment, sports and more</li><li>Implementation of this decentralized prediction market in pop-up cities like Hack Zuzalu and Zanzibar will foster innovation, attracting developers and enthusiasts to engage in creating novel applications and predictive tools. This influx of talent and creativity will contribute to economic growth and knowledge sharing within these communities, amplifying their technological prowess.</li></ul>",
  },
];

function hmtlToText(text) {
  var strippedHtml = text.replace(/<[^>]+>/g, "");
  return strippedHtml;
}

const VotingComponent = () => {
  const [raceOver, setRaceOver] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(
    localStorage.getItem("submit") ?? false
  );
  const [commitments, setCommitments] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const soundUrl = "/glug-a.mp3";
  const group_id = process.env.REACT_APP_GROUP_ID;
  const params = new URLSearchParams(window.location.search);
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    const load = async () => {
      const semaphoreData = new SemaphoreEthers(process.env.REACT_APP_RPC, {
        address: process.env.REACT_APP_CONTRACT,
      });
      const commitments = await semaphoreData.getGroupMembers(group_id);
      setCommitments(commitments);
      setIsLoading(false);
    };
    load();
  }, [group_id]);

  const [playbackRate, setPlaybackRate] = React.useState(0.75);

  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });

  const sendVote = (index, voteType) => {
    const updatedCandidates = [...stateCandidates];
    if (
      voteType === "up" &&
      totalVotes < maxTotalVotes &&
      updatedCandidates[index].votes < maxVotesPerCandidate
    ) {
      setPlaybackRate(playbackRate + 0.1);
      play();
      updatedCandidates[index].votes = updatedCandidates[index].votes + 2;
      setTotalVotes(totalVotes + 2);
    } else if (voteType === "down" && updatedCandidates[index].votes > 0) {
      setPlaybackRate(playbackRate - 0.1);
      play();
      updatedCandidates[index].votes = updatedCandidates[index].votes - 2;
      setTotalVotes(totalVotes - 2);
    }

    setCandidates(updatedCandidates);
  };

  const openDetails = (project_id) => {
    console.log(project_id);
    setSelectedProject(project_id);
    setShowProjectDetails(true);
  };

  const [stateCandidates, setCandidates] = useState([]);

  useEffect(() => {
    const updatedCandidates = candidates.map((candidate) => ({
      ...candidate,
      votes: 0,
    }));
    setCandidates(updatedCandidates);
    console.log(stateCandidates);
  }, []);

  const endRace = (candidates) => {
    setRaceOver(true);
    // Additional logic for the race being over
  };

  const generateIdentity = () => {
    // TODO
    // 1. Add this identity to the group, whether directly to the smart contract
    //      or through the relayer.
    //      If through the relayer (so that the user does not spend gas), there needs
    //      to be an endpoint on the relayer to do this.
    // 2. Extend this so that the identity is generated from a message.
    //      The message can be the user's public wallet key.
    //      The user can sign that message with their private key (via metamask, etc.)
    //      Then the signed message can be used to generate the identity below.
    //      This allows the user to "log in" to the zkvoting app, because now the
    //      user can recover their identity even if they leave the page.
    const identity = new Identity();
    console.log("user generated identity: ", identity);
    setIdentity(identity);
  }

  const onSubmit = async (userIdentity) => {
    const choices = {};
    stateCandidates.forEach((candidate, index) => {
      if (candidate.votes > 0)
        choices[index] = candidate.votes;
    });
    console.log(choices);
    let encodedSignal = encodeSignal(choices);
    console.log("encodedSignal", encodedSignal);
    const group = new Group(group_id, 16, commitments);

    const fullProof = await generateProof(
      userIdentity,
      group,
      group.root,
      encodedSignal,
      {
        wasmFilePath: "./semaphore.wasm",
        zkeyFilePath: "./semaphore.zkey"
      }
    )
    console.log("fullProof", fullProof);

    const data = {
      group_id: group_id.toString(),
      merkle_tree_root: fullProof.merkleTreeRoot,
      signal: fullProof.signal,
      identity_nullifier: fullProof.nullifierHash,
      externalNullifier: fullProof.externalNullifier,
      proof: JSON.stringify(fullProof.proof),
    }
    console.log("data", data);

    await fetch("https://zkvoting-relayer.vercel.app/api/relayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <>
      {/*
        * Create an identity locally using a user's wallet.
        * The user will sign a message containing their wallet address.
        * This allows them to recover their identity in the future so long
        * as they have their wallet private key.
        */}
      {identity === null &&
          <div
            style={{
              display: "relative",
              fontFamily: "Arial, sans-serif",
              color: "black",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            <button onClick={generateIdentity}>
                Create your voter identity!
            </button>
          </div>
      }
      <div
        style={{
          display: "relative",
          fontFamily: "Arial, sans-serif",
          color: "black",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        {identity !== null &&
            <div>
                <p style={{padding: "0px 20px"}}>
                    Your voter identity: {identity._commitment.toString()}
                </p>
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
            </div>
        }

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
                  borderRight: "none",
                  minWidth: "100%",
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
                  <a
                    style={{
                      overflowWrap: "break-word",
                      wordWrap: "break-word",
                      hyphens: "auto",
                      wordBreak: "break-all",
                      paddingRight: "10px",
                    }}
                    href={candidate.link}
                  >
                    {candidate.link}
                  </a>
                  <Paragraph>
                    <div>
                      {hmtlToText(candidate.description).slice(0, 55) + "..."}
                    </div>
                    <span
                      onClick={() => {
                        console.log("clicked");
                        openDetails(index);
                      }}
                    >
                      Read more
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
                    }}
                  >
                    max
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {
          !isDisabled ? (
            ((maxTotalVotes === totalVotes)) ?
              (
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
                  <>
                    <p>you can submit your votes now</p>
                    <button
                      onClick={() => onSubmit(identity)}
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
                  </>
                </div>
              ) : null) : (<div>
                Thanks for voting!
              </div>)}
      </div>
      {showProjectDetails ? (
        <Modal
          onClose={() => setShowProjectDetails(false)}
          project={candidates[selectedProject]}
        />
      ) : null}
    </>
  );
};

export default VotingComponent;
