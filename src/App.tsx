import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TVChartContainer from "./components";
import { subscribingInstrumentRequest } from "./services/candleHandler";

function App() {
  useEffect(() => {
    const subscribingInstrumentRequestCall = async () => {
      subscribingInstrumentRequest();
    };
    subscribingInstrumentRequestCall();
  }, []);
  return (
    <div className="App">
      <TVChartContainer />
    </div>
  );
}

export default App;
