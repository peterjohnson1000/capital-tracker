import { useState, useEffect } from 'react';
import './App.css';
import LineChart from './LineChart';
import {capital} from "./data/capital"

function App() {
  const [capitalData, setCapitalData] = useState({
    labels: [],
    datasets: [
      {
        label: "Capital",
        data: []
      }
    ]
  });

  const [ncapitalData, nsetcapitalData] = useState(
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

  useEffect(() => {
    // Fetch the formatted data from the API or Lambda function
    const fetchData = async () => {
      try {
        const response = await fetch('https://srq54buuybkdxmt45guraiwhrm0dexyn.lambda-url.ap-south-1.on.aws/');
        const jsonData = await response.json();

        setCapitalData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(capitalData);

  return (
    <div className="flex justify-center items-center">
      <div className="w-[700px]">
        <LineChart capitalData={capitalData} />
        <LineChart capitalData={ncapitalData} />
        <p>The below chart is just for verification</p>
      </div>
    </div>
  );
}

export default App;
