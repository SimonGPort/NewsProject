import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      articlesRightCol: [],
      articlesCenterCol: [],
      articlesLeftCol: [],
    };
  }

  componentDidMount() {
    this.fetchArticles()
  }

  fetchArticles = async () => {
    let response = await fetch("/articles")
    let body = await response.text();
    body = JSON.parse(body);

    if (body.success) {
      this.setState({ articlesLeftCol: body.articlesLeftCol, articlesCenterCol: body.articlesCenterCol, articlesRightCol: body.articlesRightCol })
    }

    console.log("body:", body)
  }


  render = () => {
    let col1 = this.state.articlesLeftCol.map((article, idx) => {
      return <li key={idx} class="list"><a class="articleTitle" href={article.link} >{article.title}</a>{article.pic && (<div class="picContainer"><img class="picture" src={article.pic} /></div>)}</li>
    })
    let col2 = this.state.articlesCenterCol.map((article, idx) => {
      return <li key={idx} class="list"><a class="articleTitle" href={article.link} >{article.title}</a>{article.pic && (<div class="picContainer"><img class="picture" src={article.pic} /></div>)}</li>
    })

    let col3 = this.state.articlesRightCol.map((article, idx) => {
      return <li key={idx} class="list"><a class="articleTitle" href={article.link} >{article.title}</a>{article.pic && (<div class="picContainer"><img class="picture" src={article.pic} /></div>)}</li>
    })

    return (
      <>
        <div id="header">
          <img src="https://populist.press/wp-content/uploads/2021/01/FULL-logo-large-7.png" alt="The Populist" />
        </div>
        <div id="body">

          <div class="mainGrid">
            <div
              class="articlesCol"
              style={{ height: this.state.articlesLeftCol.length === 0 ? "0px" : "" }}
            >
              <ul>{col1}</ul>
            </div>
            <div class="articlesCol" style={{ height: this.state.articlesCenterCol.length === 0 ? "0px" : "" }}>
              <ul>{col2}</ul>
            </div>
            <div class="articlesColRight">
              <ul>{col3}</ul>
            </div>
          </div>

        </div>
      </>
    );
  }
}

export default MainPage;
