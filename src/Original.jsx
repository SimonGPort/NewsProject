import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

class Original extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      urlPicTitle: "",
      consoleSelection: "",
      txtSize: "16",
      txtStyle: "normal",
      url: "",
      content: [],
      textContent: []
    };
  }

  send = () => {
    console.log("send")

  }

  insertInContent = () => {

    if (this.state.consoleSelection === "") {
      return
    }

    let object = {
      mode: this.state.consoleSelection,
      txtSize: this.state.txtSize + "px",
      txtStyle: this.state.txtStyle,
    }
    let content = [...this.state.content]
    content.push(object)
    this.setState({ content })
  }
  // ici
  renderContent = () => {
    let value = this.state.content.map((content, idx) => {
      let result = ""

      if (content.mode === "txt") {
        result = <div style={{
          margin: "20px",
          height: "150px",
          display: "flex"
        }}>
          <textarea
            style={{
              fontSize: `${content.txtSize}`, fontStyle: `${content.txtStyle}`, height: "100%",
              width: "100%",
              resize: "none"
            }}
            onChange={(evt) => {
              let textContentTemp = [...this.state.textContent]
              textContentTemp[idx] = evt.target.value
              this.setState({ textContent: textContentTemp })
            }}

            value={this.state.textContent[idx]} />
          <div style={{ display: "flex", width: "45px" }}>
            <img class="deleteIcon" src="red-x.png" onClick={() => {
              let textContentTemp = [...this.state.textContent]
              textContentTemp.splice(idx, 1)
              let content = [...this.state.content]
              content.splice(idx, 1)
              this.setState({ textContent: textContentTemp, content })
            }} />
            {idx !== 0 && <img class="deleteIcon" src="arrowUp.png" onClick={() => {
              let textContentTemp = [...this.state.textContent]
              let saveTextContent = textContentTemp[idx]
              textContentTemp.splice(idx, 1)
              textContentTemp.splice(idx - 1, 0, saveTextContent)

              let content = [...this.state.content]
              let saveContent = content[idx]
              content.splice(idx, 1)
              content.splice(idx - 1, 0, saveContent)
              this.setState({ textContent: textContentTemp, content })
            }} />}

            <img class="deleteIcon" src="arrowDown.png" onClick={() => {
              let textContentTemp = [...this.state.textContent]
              let saveTextContent = textContentTemp[idx]
              textContentTemp.splice(idx, 1)
              textContentTemp.splice(idx + 1, 0, saveTextContent)

              let content = [...this.state.content]
              let saveContent = content[idx]
              content.splice(idx, 1)
              content.splice(idx + 1, 0, saveContent)
              this.setState({ textContent: textContentTemp, content })
            }} />
          </div>
        </div >




      }


      return result
    })

    return value
  }



  render = () => {

    return (
      <div>
        <div class="repostHeader">
          Original Creation
      </div>
        <div id="OriginalBody">
          <div class="repostSection" >
            <div class="repostDescription">Title</div><input class="repostInput" value={this.state.title} onChange={(evt) => {
              this.setState({ title: evt.target.value })
            }} />
          </div>
          <div class="repostSection" >
            <div class="repostDescription">Picture Url</div><input class="repostInput" value={this.state.urlPicTitle} onChange={(evt) => {
              this.setState({ urlPicTitle: evt.target.value })
            }} />
          </div>


          <div style={{ display: "flex", alignItems: "center" }}>
            <button style={{ margin: "15px" }} onClick={() => {
              this.send()
            }}>Send</button>
          </div>

          <div class="console">
            <div class="addLogoContainer">
              <img src="add_logo.jpg" class="addIcon" onClick={() => {
                this.insertInContent()
              }} />
            </div>
            <div class="consoleSection">
              <div style={{ marginRight: "40px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px"
                }}>
                  <button onClick={() => { this.setState({ consoleSelection: "txt" }) }} style={{ backgroundColor: this.state.consoleSelection === "txt" ? "yellow" : "" }}>Txt</button>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "10px" }}>Size<input type="number" style={{ width: "30px" }} placeholder="16" min="1" max="50" onChange={(evt) => {
                    this.setState({ txtSize: evt.target.value })
                  }} value={this.state.txtSize} /></div>
                  <div>Style

                  <select id="items" onChange={(evt) => {
                      this.setState({ txtStyle: evt.target.value })
                    }}
                      value={this.state.txtStyle}>
                      <option value="normal">Normal</option>
                      <option value="italic">Italic</option>
                      <option value="oblique">Oblique</option>
                    </select>



                  </div>

                </div>

              </div>



              <div style={{ width: "700px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}>

                  <button style={{ marginRight: "10px", backgroundColor: this.state.consoleSelection === "img" ? "yellow" : "" }} onClick={() => { this.setState({ consoleSelection: "img" }) }}>Img</button>
                  <button style={{ marginLeft: "10px", backgroundColor: this.state.consoleSelection === "youtube" ? "yellow" : "" }} onClick={() => { this.setState({ consoleSelection: "youtube" }) }}>Youtube</button>

                </div>
                <div >
                  <div style={{ display: "flex" }}>Url<input style={{ width: "100%" }} value={this.state.url} onChange={(evt) => {
                    this.setState({ url: evt.target.value })
                  }} /></div>


                </div>

              </div>




            </div>



          </div>
          <div id="pageContent">
            {this.renderContent()}
          </div>

        </div>

      </div >

    );
  }
}

export default Original;
