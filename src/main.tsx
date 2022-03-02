import React, { Component } from "react";
import ReactDOM from "react-dom";
import RoutesComponent from "./components/routes/RoutesComponent";

class Main extends Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    alert(`Error ${error.message} was catched. Stack trace: ${error.stack}`);
    console.error(error, info);
    window.location.href = "/home";
  }

  render() {
    return <RoutesComponent />;
  }
}

ReactDOM.render(<Main />, document.getElementById("app"));
