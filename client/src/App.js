import { Tasks } from "./components";
import "./App.css";
import "./styles/global.scss";

function App() {
  console.log("HI");
  return (
    <div className="App">
      <h1 className="heading">YOUR TASK LIST</h1>
      <Tasks />
    </div>
  );
}

export default App;
