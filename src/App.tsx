import { useEffect, useState, useRef } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import { Sub } from "./types";
import { getAllSubs } from "./services/getAllSubs";

interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
}

function App() {
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);
  const divRef = useRef<HTMLDivElement>(null);
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  useEffect(() => {
    getAllSubs().then(setSubs);
  }, []);
  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
    setNewSubsNumber(newSubsNumber + 1);
  };

  return (
    <div className="App" ref={divRef}>
      <h1>Subs: {subs.length}</h1>
      <List subs={subs} />

      <Form onNewSub={handleNewSub}></Form>
    </div>
  );
}

export default App;
