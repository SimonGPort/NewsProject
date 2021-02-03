import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class Mail extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      error: false
    };
  }

  submit = async () => {

    if (this.state.name === "" || this.state.email === "") {
      this.setState({ error: true })
      return
    }

    let user = {
      name: this.state.name,
      email: this.state.email
    }

    let response = await fetch("/mailUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        user
      ),
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      alert("You are now register to our mail")
      this.props.history.push("/")
    }

  }



  render = () => {
    let form = { margin: "auto", width: "500px", height: "300px", padding: "20px" }
    let input = { borderRadius: "3px", padding: "10px", display: "block", margin: "10px 0", width: "100%" }
    let text = { fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif", display: "block", margin: "10px 0" }
    let textError = { color: "red", fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif", display: "block", margin: "10px 0" }
    let button = {
      backgroundColor: "#000000",
      borderColor: "#000000",
      borderRadius: "4px",
      borderWidth: "0px",
      color: "#FFFFFF",
      padding: "12px 18px 12px 18px",
      cursor: "pointer"
    }


    return (

      <div style={form}>
        {this.state.error && <label style={textError}>Empty field</label>}
        <label style={text}>First Name</label>
        <input style={input} placeholder={"Please enter your first name"} onChange={(evt) => {
          this.setState({ name: evt.target.value })
        }} />
        <label style={text}>Email</label>
        <input style={input} placeholder={"Please enter your email address"} onChange={(evt) => {
          this.setState({ email: evt.target.value })
        }} />
        <button style={button} onClick={() => { this.submit() }}>Submit</button>
      </div>


    );
  }
}

export default withRouter(Mail)