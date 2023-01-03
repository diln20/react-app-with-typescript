import  { useEffect, useState,useRef } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import { Sub, SubsRenponseFromApi } from './types';
import axios from 'axios';

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)
  const divRef= useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSubs = (): Promise<SubsRenponseFromApi>=>{
      return axios.get("http://localhost:3001/subs").then(res => res.data)
    }

    const mapFromApiToSubs = (apiResponse: SubsRenponseFromApi): 
      Array<Sub> => {
      return apiResponse.map((subFromApi) => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description,
        } = subFromApi;
        return {
          nick,
          subMonths,
          avatar,
          description,
        };
      });
    }

    fetchSubs()
      .then(mapFromApiToSubs)
      .then(setSubs)
    
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub])
    setNewSubsNumber(newSubsNumber + 1)
  }
  

  return (
    <div className="App" ref={divRef}>
      <h1>Subs: {subs.length}</h1>
      <List subs={subs} />

      <Form onNewSub={handleNewSub}></Form>
    </div>
  );
}

export default App;
