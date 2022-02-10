// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// start-path is 'images' because we have an alias 'images' in webpack.common.js
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HelloWorld from "./helloworld-page";
import MainPage from "./main-page";

class AppContainer extends Component {
  render() {
    return (
      <StrictMode>
        <Router>
          <div>
            <head>
              <title>Hello world</title>
            </head>
            <nav>
              <Link to="/helloworld">Hello world page</Link>
            </nav>
            <Routes>
              <Route path="/" element={<MainPage nothing={false} />} />
              <Route path="/helloworld" element={<HelloWorld />} />
            </Routes>
          </div>
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
