import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import ReactPlayer from "react-player"

class OriginalPresentation extends Component {
  constructor() {
    super();
    this.state = {
      contents: []
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
      this.setState({ contents: body.content })
    }
  }

  // ici
  renderContent = () => {
    let value = this.state.contents.map((content, idx) => {
      let result = ""

      if (content.mode === "txt") {
        result = <div style={{
          margin: "20px",
          height: "150px",
          display: "flex"
        }}>
          <p
            style={{
              fontSize: `${content.txtSize}`, fontStyle: `${content.txtStyle}`, height: "100%",
              width: "100%",
              resize: "none"
            }}

          // value={content.text} 
          >{content.text}
          </p>

        </div >

      }

      // if (content.mode === "img") {
      //   let imgSrc = content.url
      //   result = <div style={{
      //     margin: "20px",
      //     height: "360px",
      //     display: "flex"
      //   }}>

      //     <div style={{
      //       height: "100%",
      //       width: "100%",
      //       display: "flex",
      //       justifyContent: "center"
      //     }}>
      //       <img src={imgSrc} style={{
      //         height: "360px",
      //         width: "360px",
      //         objectFit: "cover"
      //       }} />
      //     </div>
      //   </div >

      // }

      // if (content.mode === "youtube") {
      //   let YTSrc = content.url
      //   result = <div style={{
      //     margin: "20px",
      //     height: "360px",
      //     display: "flex"
      //   }}>

      //     <div style={{
      //       height: "100%",
      //       width: "100%",
      //       display: "flex",
      //       justifyContent: "center"
      //     }}>
      //       <ReactPlayer
      //         url={YTSrc}
      //       />
      //     </div>

      //   </div >

      // }


      return result
    })

    return value
  }


  render = () => {

    return (
      <div>
        <div id="header">
          <img src="https://populist.press/wp-content/uploads/2021/01/FULL-logo-large-7.png" alt="The Populist" />
        </div>
        <div>
          {this.renderContent()}
        </div >
      </div>
    );
  }
}

export default OriginalPresentation;
