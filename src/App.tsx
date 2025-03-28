import { ConnectButton } from "@components/ConnectButton/ConnectButton";
import "./App.css";
import { Widget } from "@components/Widget/Widget";
import CleanLayout from "@layouts/CleanLayout";
import { AppProvider } from "./AppProvider";
import { ConnectButton } from "./components/ConnectButton/ConnectButton";

function App() {
  return (
    <AppProvider>
      <CleanLayout>
        <Widget />
      </CleanLayout>
    </AppProvider>
  );
}

export default App;
