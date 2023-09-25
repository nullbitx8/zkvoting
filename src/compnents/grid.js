import { useState } from "react";
import { Flex, Box, Input, Paragraph, Select, Button } from "theme-ui";
import { encodeSignal } from "../lib";

const Grid = () => {

   /// { project_id: value: [0,5,10]   }
   const [choices, setChoices] = useState({});

   const setChoice = (project_id, value) => {
        setChoices({...choices, [project_id]: value})
   }

  const projects = [
    {
      title: "cool project",
      project_url: "............",
      project_id: 1,
    },
    {
      title: "cool project 1",
      project_url: "............",
      project_id: 2,
    },
    {
      title: "cool project 2",
      project_url: "............",
      project_id: 3,
    },
    {
      title: "cool project 3",
      project_url: "............",
      project_id: 4,
    },
    {
      title: "cool project 4",
      project_url: "............",
      project_id: 5,
    },
  ];

  return (
    <Flex sx={{ mt: [5] }}>
      {projects.map(({ title, project_url, project_id }) => {
        return (
          <Project
            title={title}
            project_url={project_url}
            project_id={project_id}
            setChoice={setChoice}
          />
        );
      })}

      <br/>
      <Button onClick={()=>{
        let encodedSignal = encodeSignal(choices);
        console.log("encoded Signal is", encodedSignal)

      }} >Submit</Button>
    </Flex>
  );
};

const Project = ({ title, project_url, project_id, setChoice }) => {
  return (
    <Box sx={{ mx: [2] }}>
      <Paragraph>{title}</Paragraph>
      <Paragraph>{project_url}</Paragraph>
      <Select defaultValue={0} onChange={(e)=>{
        setChoice(project_id, e.target.value)
      }} >
        <option>0</option>
        <option>5</option>
        <option>10</option>
      </Select>
    </Box>
  );
};

export default Grid;
