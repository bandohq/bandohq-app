import "./App.css";
import { AppProvider } from "./AppProvider";
import { ConnectButton } from "./components/ConnectButton/ConnectButton";
import { Widget } from "./components/Widget/Widget";

function App() {
  return (
    <AppProvider>
      <h1>Bando Widget dApp</h1>
      <ConnectButton />
      <Widget />
    </AppProvider>
  );
}

export default App;
