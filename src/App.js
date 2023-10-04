import './App.css';
import { Box, Heading } from "theme-ui";
import Vote from './compnents/vote';

function App() {
  return (
    <Box>
      <Heading sx={{textAlign:"center"}} >
        The greates zk-voting app ever
      </Heading>
      <Vote/>
    </Box>
  );
}

export default App;
