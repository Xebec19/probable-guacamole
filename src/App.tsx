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
  const [players, setPlayers] = useState<string[]>([]);
  const [balance, setBalance] = useState<string>("");
  const [value, setValue] = useState<string>("");

  async function fetchPlayers() {
    const playersList = (await lottery.methods.getPlayers().call()) as string[];
    setPlayers(playersList);
  }

  async function getBalance() {
    const bal = (await web3.eth.getBalance(lottery.options.address!)) + "";
    setBalance(bal);
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    // this.setState({ message: "A winner has been picked!" });
  };

  useEffect(() => {
    async function fetchAccount() {
      web3.eth.getAccounts().then(console.log);
      const managerAddr = await lottery.methods.manager().call();
      setManager(managerAddr + "");
    }

    fetchAccount();
    fetchPlayers();
    getBalance();
  }, []);

  return (
    <div className="prose lg:prose-xl">
      <h1>Lottery Contract</h1>
      <h1>This contract is managed by {manager}</h1>
      <h2>
        There are currently {players.length} players entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ether!
      </h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="value">Enter a value in ether</label>
        <input
          type="text"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
