import { useState } from 'react';
import './App.css';
import LineChart from './LineChart';
import {capital} from "./data/capital"

function App() {
  const [capitalData, setcapitalData] = useState(
    {
      labels: capital.map((data) => data.date),
      datasets: [
        {
          label: "Capital",
          data: capital.map((data) => data.capital)
        }
      ]
    }
  );

  return (
    <div className="">
      <LineChart capitalData={capitalData} />
    </div>
  );
}

export default App;
