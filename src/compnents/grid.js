import { useEffect, useMemo, useState } from "react";
import { Flex, Box, Paragraph, Select, Button, Alert, Close } from "theme-ui";
import { encodeSignal } from "../lib";
import { ProjectsRepository } from "../repositories/projects_repository";
import { SemaphoreEthers } from "@semaphore-protocol/data";
import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { generateProof } from "@semaphore-protocol/proof";
import 'dotenv/config';

const Grid = () => {
  /// { project_id: value: [0,5,10]   }
  const [choices, setChoices] = useState({});
  const [projects, setProjects] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const group_id = process.env.REACT_APP_GROUP_ID;
  const params = new URLSearchParams(window.location.search)
  const secret = params.get('s')
  const [pointsLeft, setPointsLeft] = useState(50);
  const [alertBool, setAlertBool] = useState(false);
  const points = 50;

  useEffect(() => {
    const load = async () => {
      const projects = await ProjectsRepository.projects();
      setProjects(projects);
    }
    load()
  }, [])

  useEffect(() => {
    const load = async () => {
      const semaphoreData = new SemaphoreEthers(process.env.REACT_APP_RPC, {
        address: process.env.REACT_APP_CONTRACT
      })
      const commitments = await semaphoreData.getGroupMembers(group_id);
      setCommitments(commitments);
      setIsLoading(false);
    }
    load()
  }, [group_id])

  const setChoice = (project_id, value) => {
    let total = 0;
    let tempChoices = { ...choices, [project_id]: value }

    Object.keys(tempChoices).forEach((key) => {
      total = total + parseInt(tempChoices[key])
    });
    console.log('=------', total);
    setChoices({ ...choices, [project_id]: value })
    setPointsLeft(points - total);
  }

  const allowSubmit = useMemo(() => {
    return !isLoading && Object.keys(choices).length > 0
  }, [choices, isLoading])

  const onSubmit = async () => {
    if (pointsLeft === 0) {
      let encodedSignal = encodeSignal(choices);

      const group = new Group(group_id, 16, commitments);
      const identity = new Identity(secret);

      const fullProof = await generateProof(
        identity,
        group,
        group.root,
        encodedSignal,
        {
          wasmFilePath: "./semaphore.wasm",
          zkeyFilePath: "./semaphore.zkey"
        }
      )

      const data = {
        group_id: group_id.toString(),
        merkle_tree_root: fullProof.merkleTreeRoot,
        signal: fullProof.signal,
        identity_nullifier: fullProof.nullifierHash,
        externalNullifier: fullProof.externalNullifier,
        proof: JSON.stringify(fullProof.proof),
      }

      await fetch("https://zkvoting-relayer.vercel.app/api/relayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      setAlertBool(true);
    }
  }

  return (
    <>
      <Paragraph> Points Left: {pointsLeft}</Paragraph>
      {
        alertBool
          ?
          <Alert>
            Must use exactly 50 points
            <Close ml="auto" mr={-2} onClick={() => { setAlertBool(false) }} />
          </Alert>
          : ''
      }
      <Flex sx={{ mt: [5] }}>
        {projects.map(({ title, project_url, project_id }, index) => {
          return (
            <Project
              key={index}
              title={title}
              project_url={project_url}
              project_id={project_id}
              setChoice={setChoice}
            />
          );
        })}
      </Flex>
      {
        allowSubmit
          ? <Flex sx={{ mt: [5] }}>
            <Button onClick={() => {
              onSubmit();
            }}>Submit</Button>
          </Flex>
          : null
      }
    </>
  );
};

const Project = ({ title, project_url, project_id, setChoice }) => {
  return (
    <Box sx={{ mx: [2] }}>
      <Paragraph>{title}</Paragraph>
      <Paragraph>{project_url}</Paragraph>
      <Select defaultValue={0} onChange={(e) => {
        setChoice(project_id, e.target.value)
      }}>
        <option>0</option>
        <option>5</option>
        <option>10</option>
      </Select>
    </Box>
  );
};

export default Grid;
