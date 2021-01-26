let express = require('express')
let app = express()
let route = express.Router()

app.use(express.json());

let articlesLeftCol = [];
let articlesRightCol = [];
let articlesCenterCol = [];

app.post("/newsSent", (req, res) => {

    let article = req.body.article
    let column = req.body.column

    if (column === "Right") {
        articlesRightCol.push(article)
    }
    if (column === "Center") {
        articlesCenterCol.push(article)
    }
    if (column === "Left") {
        articlesLeftCol.push(article)
    }

    res.send(JSON.stringify({ success: true }));

})

app.post("/originalNewsSent", (req, res) => {

    let article = req.body.article
    let column = req.body.column
    let content = req.body.content

    // A CONTINUER

    // if (column === "Right") {
    //     articlesRightCol.push(article)
    // }
    // if (column === "Center") {
    //     articlesCenterCol.push(article)
    // }
    // if (column === "Left") {
    //     articlesLeftCol.push(article)
    // }

    res.send(JSON.stringify({ success: true }));

})

app.post("/deleteAllNews", (req, res) => {
    articlesRightCol = []
    articlesCenterCol = []
    articlesLeftCol = []

    res.send(JSON.stringify({ success: true }));

})

app.post("/deleteOneNews", (req, res) => {
    console.log("TEST")
    console.log("ICI hello worl", req.body)
    let idx = req.body.idx
    let colName = req.body.colName

    if (colName === "articlesLeftCol") {
        articlesLeftCol.splice(idx, 1)
        res.send(JSON.stringify({ success: true }));
    }
    if (colName === "articlesRightCol") {
        articlesRightCol.splice(idx, 1)
        res.send(JSON.stringify({ success: true }));
    }
    if (colName === "articlesCenterCol") {
        articlesCenterCol.splice(idx, 1)
        res.send(JSON.stringify({ success: true }));
    }
    else { res.send(JSON.stringify({ success: false })); }



})

app.get("/articles", (req, res) => {
    res.send(
        JSON.stringify({
            success: true,
            articlesRightCol,
            articlesCenterCol,
            articlesLeftCol,
        }))
})

app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/public/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })