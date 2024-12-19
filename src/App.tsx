import "./App.css";
import web3 from "./web3";
import { useEffect, useState } from "react";
import lottery from "./lottery";
import Web3 from "web3";

window.ethereum.request({
  method: "eth_requestAccounts",
});

function App() {
  const [manager, setManager] = useState<string>("");

  useEffect(() => {
    async function fetchAccount() {
      web3.eth.getAccounts().then(console.log);
      const managerAddr = await lottery.methods.manager().call();
      setManager(managerAddr + "");
    }

    fetchAccount();
  }, []);

  return (
    <div className="prose lg:prose-xl">
      <h1>Lottery Contract</h1>
      <h1>This contract is managed by {manager}</h1>
    </div>
  );
}

export default App;
