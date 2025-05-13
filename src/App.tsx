import "./App.css";
import { Widget } from "@components/Widget/Widget";
import CleanLayout from "@layouts/CleanLayout";
import { AppProvider } from "./AppProvider";
import { ThemeProvider } from './context/ThemeContext';
import * as Sentry from "@sentry/react";
import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";

Sentry.init({
  dsn: "https://24644db236e19c7aa4974451d9cc5101@o4506577784602624.ingest.us.sentry.io/4509209195905024",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    Sentry.captureConsoleIntegration({
      levels: ["error", "log"],
    }),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


function App() {
  /**
   * We use this only for initilalizing a farcaster frame
   * see more: 
   * https://miniapps.farcaster.xyz/docs/guides/loading#calling-ready
  **/
  const loadPage = async () => {
    await sdk.actions.ready();
  };

  useEffect(() => {
    loadPage();
  }, []);
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
