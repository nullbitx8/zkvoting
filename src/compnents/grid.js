import {useEffect, useState} from "react";
import {Flex, Box, Paragraph, Select, Button} from "theme-ui";
import {encodeSignal} from "../lib";
import {ProjectsRepository} from "../repositories/projects_repository";
import {SemaphoreEthers} from "@semaphore-protocol/data";
import {Group} from "@semaphore-protocol/group";
import {Identity} from "@semaphore-protocol/identity";
import {generateProof} from "@semaphore-protocol/proof";

const Grid = () => {
  /// { project_id: value: [0,5,10]   }
  const [choices, setChoices] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const projects = await ProjectsRepository.projects();
      setProjects(projects);
    }
    load()
  }, [])

  const setChoice = (project_id, value) => {
    setChoices({...choices, [project_id]: value})
  }

  const onSubmit = async () => {
    // encode signal
    let encodedSignal = encodeSignal(choices);
    console.log("encoded Signal is", encodedSignal)

    const semaphoreData = new SemaphoreEthers(process.env.RPC, {
      address: process.env.CONTRACT
    })

    const group_id = process.env.GROUP_ID;
    const commitments = await semaphoreData.getGroupMembers(group_id.toString());
    const group = new Group(group_id.toString(), 16, commitments);
    const identity = new Identity(process.env.SECRET);
    const signal = "55913308326943162161974572271060082063423079659240540471751403101436616302030";

    const fullProof = await generateProof(
      identity,
      group,
      group.root,
      signal
    )

    const data = {
      group_id: group_id.toString(),
      merkle_tree_root: fullProof.merkleTreeRoot,
      signal: fullProof.signal,
      identity_nullifier: fullProof.nullifierHash,
      externalNullifier: fullProof.externalNullifier,
      proof: JSON.stringify(fullProof.proof),
    }

    const response = await fetch("https://zkvoting-relayer.vercel.app/api/relayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())

    console.log(response);
  }

  return (
    <>
      <Flex sx={{mt: [5]}}>
        {projects.map(({title, project_url, project_id}) => {
          return (
            <Project
              title={title}
              project_url={project_url}
              project_id={project_id}
              setChoice={setChoice}
            />
          );
        })}
      </Flex>
      <Flex sx={{mt: [5]}}>
        <Button onClick={onSubmit}>Submit</Button>
      </Flex>
    </>
  );
};

const Project = ({title, project_url, project_id, setChoice}) => {
  return (
    <Box sx={{mx: [2]}}>
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
