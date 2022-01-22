import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export default class App extends Component {
  constructor(){
    super();
  this.state = {
    progress:0
    }
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    });
  }
  render() {
    return (
      <>
        <Router>
        <Navbar />
        <LoadingBar
          color='#000000'
          progress={this.state.progress}
        />
        <Switch>
          <Route exact path="/"><News setprogress={this.setProgress} key="home"/></Route>
          <Route exact path="/business"><News setprogress={this.setProgress} key="business" category='business'/></Route>
          <Route exact path="/entertainment"><News setprogress={this.setProgress} key="entertainment" category='entertainment'/></Route>
          <Route exact path="/health"><News setprogress={this.setProgress} key="health" category='health'/></Route>
          <Route exact path="/science"><News setprogress={this.setProgress} key="science" category='science'/></Route>
          <Route exact path="/sports"><News setprogress={this.setProgress} key="sports" category='sports'/></Route>
          <Route exact path="/technology"><News setprogress={this.setProgress} key="technology" category='technology'/></Route>
        </Switch>
        </Router>
      </>
    );
  }
}