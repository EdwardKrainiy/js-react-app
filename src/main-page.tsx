import "./styles/main.css";
import "./styles/main.scss";
import { Component } from "react";
import imgSmall from "images/testSmall.png";
import imgCamera from "images/camera.svg";
import someTypeScript from "./someTypeScript";
import style from "./styles/main.module.css";

interface AppProps {
  nothing: boolean;
}

interface AppState {
  title: string;
}

export default class MainPage extends Component<AppProps, AppState> {
  ["constructor"]: typeof MainPage;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
    };
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <div>
        <div className="test-block">
          <h2 className={style.mainTitle}>{this.state.title}</h2>
        </div>
        <div className={["test-block", style.background].join(" ")}>
          <h2>Test-block for assets-module (previous url-loader)</h2>
          <img src={imgSmall} alt="smallImage" />
        </div>
        {/*  or it can be
                    <img src='/src/images/testSmall.png' alt="smallImage"></img>
                  */}
        <div className={["test-block", style.svgBackground].join(" ")}>
          <h2>Test-block for assets-module (svg-url-loader)</h2>
          <img src={imgCamera} alt="small_SVG_Image" />
        </div>
      </div>
    );
  }
}
