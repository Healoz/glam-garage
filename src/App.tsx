import React, { useState } from 'react';
import './assets/App.css';

// define object shape
interface Data {
  name: string;
  age: number;
  numbers: number[];
}

function App() {

  const [data, setData] = useState<Data>({
    name: 'Brian',
    age: 0,
    numbers: [3, 5, 6, 7, 10],
  });

  return (
    <div className="App">
      <h1>{data.name}</h1>
      <p>Age: {data.age}</p>
      <ul>
        {data.numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
