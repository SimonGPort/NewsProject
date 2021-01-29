import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

class CreationRepost extends Component {
  constructor() {
    super();
    this.state = {
      link: "",
      title: "",
      pic: "",
      col: "Left",
      destroyAllNewsOn: false
    };
  }

  send = async () => {
    if (this.state.title === "") { return }
    let articleToSend = {
      title: this.state.title,
      link: this.state.link,
      pic: this.state.pic,
      original: false
    }

    let response = await fetch("/newsSent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { column: this.state.col, article: articleToSend }
      ),
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      this.setState({ title: "", link: "", pic: "" })
      alert("the news is sent")
    }
  }


  destroyAllNews = async () => {
    let response = await fetch("/deleteAllNews", {
      method: "POST",
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      alert("All the news are reset")
    }
  }

  render = () => {

    return (
      <div>
        <div class="repostHeader">
          Repost Creation
      </div>

        <div>
          <div class="repostSection" >
            <div class="repostDescription">Title</div><input class="repostInput" value={this.state.title} onChange={(evt) => {
              this.setState({ title: evt.target.value })
            }} />
          </div>
          <div class="repostSection" >
            <div class="repostDescription">Link Url</div><input class="repostInput" value={this.state.link} onChange={(evt) => {
              this.setState({ link: evt.target.value })
            }} />
          </div>
          <div class="repostSection" >
            <div class="repostDescription">Picture Url</div><input class="repostInput" value={this.state.pic} onChange={(evt) => {
              this.setState({ pic: evt.target.value })
            }} />
          </div>
          <div class="repostSection" >
            <div class="repostDescription">Which column</div>
            <select
              onChange={(evt) => {
                this.setState({ col: evt.target.value })
              }}
              className="creation-event-scrollmenu"
            >
              <option>Left</option>
              <option>Center</option>
              <option>Right</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <button style={{ margin: "15px" }} onClick={() => {
              this.send()
            }}>Send</button>
            <button style={{ margin: "15px 5px 15px 15px" }} onClick={() => {
              if (this.state.destroyAllNewsOn) {
                this.destroyAllNews()
              }
            }}>Destroy all news</button>
            <input type="checkbox" onClick={(evt) => {
              this.setState({
                destroyAllNewsOn: evt.target.checked
              })
            }}></input>
          </div>

        </div>

      </div>

    );
  }
}

export default CreationRepost;
