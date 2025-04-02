import "./App.css";
import { Widget } from "@components/Widget/Widget";
import CleanLayout from "@layouts/CleanLayout";
import { AppProvider } from "./AppProvider";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <CleanLayout>
          <Widget />
        </CleanLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
