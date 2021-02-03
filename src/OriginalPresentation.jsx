import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import ReactPlayer from "react-player"

class OriginalPresentation extends Component {
  constructor() {
    super();
    this.state = {
      contents: [],
      sideContents: []
    };
  }

  componentDidMount() {
    this.fetchMainOriginalArticle()
  }



  fetchMainOriginalArticle = async () => {
    let response = await fetch(`/originalArticle/${this.props.numero}`)
    let body = await response.text();
    body = JSON.parse(body);

    if (body.success) {
      this.setState({ contents: body.content, sideContents: body.sideContent })
    }
  }

  renderContent = () => {
    let value = this.state.contents.map((content, idx) => {
      let result = ""

      if (content.mode === "txt") {
        result = <div>
          <p
            style={{
              fontSize: `${content.txtSize}`, fontStyle: `${content.txtStyle}`, height: "100%",
              width: "100%",
            }}
          >{content.text}
          </p>

        </div >

      }

      if (content.mode === "img") {
        let imgSrc = content.url
        result = <div style={{
          margin: "20px 0 20px 0",
          height: "360px",
          display: "flex"
        }}>

          <div style={{
            height: "100%",
            width: "100%",
            // display: "flex",
            // justifyContent: "center"
          }}>
            <img src={imgSrc} style={{
              height: "360px",
              objectFit: "cover",
              overflow: "hidden"
            }} />
          </div>
        </div >

      }

      if (content.mode === "youtube") {
        let YTSrc = content.url
        result = <div style={{
          margin: "20px 0 20px 0",
          height: "360px",
          display: "flex"
        }}>

          <div style={{
            height: "100%",
            width: "100%",
            // display: "flex",
            // justifyContent: "center"
          }}>
            <ReactPlayer
              controls={true}
              url={YTSrc}
            />
          </div>

        </div >

      }


      return result
    })

    return value
  }


  renderSideContent = () => {
    let value = this.state.sideContents.map((article, idx) => {
      return <li key={idx} class="list"><a class="articleTitle" href={article.link} >{article.title}</a>{article.pic && (<div class="picContainer"><img class="picture" src={article.pic} /></div>)}</li>
    })

    return value
  }


  render = () => {

    return (
      <div>
        <div style={{
          position: "absolute",
          margin: "10px",
          left: "0",
          cursor: "pointer"
        }}
          onMouseOver={() => {
            let text = document.getElementById("mailText")
            text.style.color = "red"
          }}
          onMouseOut={() => {
            let text = document.getElementById("mailText")
            text.style.color = "black"
          }}
        >
          <a href={"/mail"} style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", justifyContent: "center" }}><img src="../email.svg" style={{ width: "25px" }} /></div>
            <div id="mailText">Join our mailing list</div>
          </a>
        </div>
        <div style={{
          position: "absolute",
          margin: "10px",
          right: "0"
        }}>
          <a href={"https://www.facebook.com/wearepopulists/"} > <img src="../fbLogo.png" style={{ width: "40px", marginRight: "15px", cursor: "pointer" }} /></a>
          <a href={"https://gab.com/thePopulist"} ><img src="../gabLogo.png" style={{ width: "40px", cursor: "pointer" }} /></a>
        </div>
        <div id="header">
          <img src="https://populist.press/wp-content/uploads/2021/01/FULL-logo-large-7.png" alt="The Populist" />
        </div>
        <div class="originalPresentationContainer">
          <div
            style={{
              margin: "0 40px 0 40px",
              display: "grid",
              gridTemplateColumns: this.state.sideContents.length > 0 ? "80% 20%" : "100%",
              width: "75%",
            }}
          >
            <div>{this.renderContent()}</div>
            <div>
              <ul>{this.renderSideContent()}</ul>
            </div>
          </div>
        </div >
      </div>
    );
  }
}

export default OriginalPresentation;
