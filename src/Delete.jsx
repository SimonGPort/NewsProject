import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

class Delete extends Component {
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

  delete = async (idx, colName) => {
    console.log("ICI", idx, colName)
    let response = await fetch("/deleteOneNews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { idx, colName }
      ),
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (body.success) {
      if (colName === "articlesLeftCol") {
        let articlesLeftCol = [...this.state.articlesLeftCol]
        articlesLeftCol.splice(idx, 1)
        this.setState({ articlesLeftCol })
      }
      if (colName === "articlesRightCol") {
        let articlesRightCol = [...this.state.articlesRightCol]
        articlesRightCol.splice(idx, 1)
        this.setState({ articlesRightCol })
      }
      if (colName === "articlesCenterCol") {
        let articlesCenterCol = [...this.state.articlesCenterCol]
        articlesCenterCol.splice(idx, 1)
        this.setState({ articlesCenterCol })
      }


    }
  }

  render = () => {
    let col1 = this.state.articlesLeftCol.map((article, idx) => {
      return <li key={idx} class="list"><img class="deleteIcon" src="red-x.png" onClick={() => { this.delete(idx, "articlesLeftCol") }} /> <a class="articleTitle"  >{article.title}</a>{article.pic && (<div class="picContainer"><img class="picture" src={article.pic} /></div>)}</li>
    })

    let col2 = this.state.articlesCenterCol.map((article, idx) => {
      return <li key={idx} class="list"><img class="deleteIcon" src="red-x.png" onClick={() => { this.delete(idx, "articlesCenterCol") }} /><a class="articleTitle"  >{article.title}</a>{article.pic && (<div class="picContainer"><img class="picture" src={article.pic} /></div>)}</li>
    })

    let col3 = this.state.articlesRightCol.map((article, idx) => {
      return <li key={idx} class="list"><img class="deleteIcon" src="red-x.png" onClick={() => { this.delete(idx, "articlesRightCol") }} /><a class="articleTitle" >{article.title}</a>{article.pic && (<div class="picContainer"><img class="picture" src={article.pic} /></div>)}</li>
    })

    return (
      <>
        <div id="header">
          <img src="https://populist.press/wp-content/uploads/2021/01/FULL-logo-large-7.png" alt="The Populist" />
        </div>
        <div id="body">

          <div class="mainGrid">
            <div class="articlesCol" style={{ height: this.state.articlesLeftCol.length === 0 ? "0px" : "" }}>
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

export default Delete;
