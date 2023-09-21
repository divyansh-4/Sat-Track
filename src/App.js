import './App.css';
import SatellitePosition from './components/SatellitePosition';
const ISS_TLE =
  `1 25544U 98067A   23261.37754304  .00014387  00000-0  26521-3 0  9999
   2 25544  51.6416 226.9153 0005862  31.7166 102.3637 15.49379141416241`;
function App() {
  return (
    <div className="App">

      <SatellitePosition TLE={ISS_TLE}/>
    </div>
  );
}

export default App;
