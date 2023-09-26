import {useEffect, useState} from "react";
import {Flex, Box, Paragraph, Select, Button} from "theme-ui";
import {encodeSignal} from "../lib";
import {ProjectsRepository} from "../repositories/projects_repository";

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

  const onSubmit = () => {
    // encode signal
    let encodedSignal = encodeSignal(choices);
    console.log("encoded Signal is", encodedSignal)

    // TODO : generate proof and call `verifyProof` on semaphore
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
