import { useState, useEffect } from 'react';
import './App.css';
import LineChart from './LineChart';

function App() {

  const [capital, setCapital] = useState('');
  const [date, setDate] = useState('');

  const [capitalData, setCapitalData] = useState({
    labels: [],
    datasets: [
      {
        label: "Capital",
        data: []
      }
    ]
  });

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

  // console.log(capitalData);

  const handleInputChange = (event) => {
    if (event.target.name === 'capital') {
      setCapital(event.target.value);
    } else if (event.target.name === 'date') {
      setDate(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object with the input data
    const inputData = {
      capital: parseFloat(capital),
      date: date
    };

    // Send the data to the Lambda function endpoint
    try {
      const response = await fetch('https://lj2i6dk2wn7v5pcczqdvusisia0mpzoh.lambda-url.ap-south-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });

      if (response.ok) {
        // Data successfully sent to DynamoDB
        console.log('Data successfully sent to DynamoDB');
        // Reset the input fields
        setCapital('');
        setDate('');
      } else {
        // Error sending data to DynamoDB
        console.error('Error sending data to DynamoDB');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <h1>Input Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Capital:
            <input type="number" name="capital" value={capital} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Date:
            <input type="text" name="date" value={date} onChange={handleInputChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="w-[700px]">
        <LineChart capitalData={capitalData} />
      </div>
    </div>
  );
}

export default App;
