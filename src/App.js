import logo from './logo.svg';
import './App.css';
import { Box, Heading } from 'theme-ui';
import Grid from './compnents/grid';

function App() {
  return (
    <Box>
      <Heading sx={{textAlign:"center"}} >
        The greates zk-voting app ever
        </Heading>
        <Grid/>
    </Box>
  );
}

export default App;
