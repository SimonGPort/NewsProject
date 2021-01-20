import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import { Route, BrowserRouter, Link } from "react-router-dom";
import MainPage from "./MainPage.jsx";
import CreationRepost from "./CreationRepost.jsx";
import Delete from "./Delete.jsx";
import Original from "./Original.jsx"

class App extends Component {



  renderMainPage = () => {
    return <MainPage />;
  };

  creationRepost = () => {
    return <CreationRepost />;
  };

  delete = () => {
    return <Delete />;
  };
  original = () => {
    return <Original />;
  };

  render = () => {

    return (
      <BrowserRouter>
        <Route path="/" exact={true} render={this.renderMainPage} />
        <Route path="/creation" exact={true} render={this.creationRepost} />
        <Route path="/delete" exact={true} render={this.delete} />
        <Route path="/original" exact={true} render={this.original} />
      </BrowserRouter>

    );
  }
}

export default App;
