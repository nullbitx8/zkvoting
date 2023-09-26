import { useState } from 'react';
import './App.css';
import detectEthereumProvider from "@metamask/detect-provider"
import { Box, Heading, Button } from "theme-ui";
import Grid from './compnents/grid';

function App() {
  // const [_logs, setLogs] = useState<string>("")
  // const [_step, setStep] = useState<number>(1)
  // const [_identity, setIdentity] = useState<Identity>()
  // const [_signer, setSigner] = useState<Signer>()
  // const [_contract, setContract] = useState<Contract>()
  // const [_ercContract, setErcContract] = useState<Contract>()
  const [currentAccount, setCurrentAccount] = useState();
  // const [_event, setEvent] = useState<any>()
  const [loading, setLoading] = useState(false);


  const connectWallet = async () => {
    setLoading(true)
    try {
      const ethereum = await detectEthereumProvider();

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);

      console.log("Connected", accounts[0]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  return (
    <Box>
      <Button mt={5} onClick={connectWallet} isLoading={loading}>Connect Wallet</Button>
      {currentAccount ? <p>🟢  { currentAccount }</p> : <p>🔴  no wallet connected </p>}
      <Heading sx={{textAlign:"center"}} >
        The greates zk-voting app ever
      </Heading>
      <Grid/>
    </Box>
  );
}

export default App;
