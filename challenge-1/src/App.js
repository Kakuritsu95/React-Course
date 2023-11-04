import "./App.css";
import Badge from "./components/Badge";
import Card from "./components/Card";
import Summary from "./components/Summary";
import "./App.css";
function App() {
  return (
    <Card>
      <img src={process.env.PUBLIC_URL + "/pontikis.jpg"} alt="pontikis" />
      <div className="data">
        <Summary name="Thodoris Anesat" summary="Kalhspera eimai kalos" />
        <div className="skill-list">
          <Badge bgColor="blue" text="HTML-CSS" emoji="😀" />
          <Badge bgColor="red" text="JavaScript" emoji="😺" />
          <Badge bgColor="yellow" text="React" emoji="💩" />
          <Badge bgColor="purple" text="LOL" emoji="👾" />
          <Badge bgColor="cyan" text="ligo apex" emoji="👺" />
        </div>
      </div>
    </Card>
  );
}

export default App;
