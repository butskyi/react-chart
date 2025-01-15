import { Route } from 'react-router-dom';
import './App.css';
import Chart from './Components/CodeDirectory/1/465326-1';
//

import { Routes } from 'react-router-dom';


function App() {
  return (
    <div >
      <Routes>
        <Route index element={<Chart />} />
      </Routes>
      {/* <Greeting name="John" />*/}
    </div>
  );
}

export default App;
