import "./Home.css";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div>
      <div className="game-selection-container">
        <Sidebar />
        <div className="game-container"></div>
      </div>
    </div>
  );
};

export default Home;
