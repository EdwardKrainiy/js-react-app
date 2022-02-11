import { Component } from "react";
import ReactDOM from "react-dom";
import RoutesComponent from "src/components/routes/RoutesComponent";

class Main extends Component {
  render() {
    return <RoutesComponent />;
  }
}

ReactDOM.render(<Main />, document.getElementById("app"));
