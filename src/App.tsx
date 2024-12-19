import "./App.css";
import web3 from "./web3";
import { useEffect } from "react";
// import Web3 from "web3";

// window.ethereum.request({
//   method: "eth_requestAccounts",
// });

function App() {
  useEffect(() => {
    web3.eth.getAccounts().then(console.log);
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
