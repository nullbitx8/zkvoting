import './App.css';
import { Box, Heading } from "theme-ui";
import Grid from './compnents/grid';
import Vote from './compnents/vote';

function App() {
  return (
    <div>
      <Heading sx={{textAlign:"center"}} >
        The greates zk-voting app ever
      </Heading>
      <Vote/>
      <Grid/>
    </div>
  );
}

export default App;
