let express = require('express')
let app = express()
let route = express.Router()

app.use(express.json());

let articlesLeftCol = [];
let articlesRightCol = [];
let articlesCenterCol = [];
let originalContent = [];

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
    let link = "http://localhost:3000/populist/" + Number(originalContent.length)
    article.link = link

    if (column === "Right") {
        articlesRightCol.push(article)
    }
    if (column === "Center") {
        articlesCenterCol.push(article)
    }
    if (column === "Left") {
        articlesLeftCol.push(article)
    }
    originalContent.push(content)

    res.send(JSON.stringify({ success: true }));
})

app.post("/deleteAllNews", (req, res) => {
    articlesRightCol = []
    articlesCenterCol = []
    articlesLeftCol = []
    originalContent = []

    res.send(JSON.stringify({ success: true }));
})

removeOriginalArticle = (articleToRemoveIdx) => {
    console.log("test", articleToRemoveIdx)

    // ---reset articlesLeftCol
    articlesLeftColTemp = []

    articlesLeftCol.forEach((article) => {
        if (article.link.includes("populist")) {
            let articleIdxNumber = article.link.search("populist")
            articleIdxNumber = articleIdxNumber + 9
            let articleIdx = Number(article.link.substr(articleIdxNumber))

            if (articleIdx > articleToRemoveIdx) {
                startOfArticle = article.link.substring(0, articleIdxNumber)
                let number = Number(articleIdx) - 1
                newArticle = startOfArticle + number
                article.link = newArticle
            }

        }
        articlesLeftColTemp.push(article)
    })
    // ---reset articlesRightCol
    articlesRightColTemp = []

    articlesRightCol.forEach((article) => {
        if (article.link.includes("populist")) {
            let articleIdxNumber = article.link.search("populist")
            articleIdxNumber = articleIdxNumber + 9
            let articleIdx = Number(article.link.substr(articleIdxNumber))

            if (articleIdx > articleToRemoveIdx) {
                startOfArticle = article.link.substring(0, articleIdxNumber)
                let number = Number(articleIdxNumber) - 1
                newArticle = startOfArticle + number
                article.link = newArticle
            }

        }
        articlesRightColTemp.push(article)
    })

    // ---reset articlesCenterCol
    articlesCenterColTemp = []

    articlesCenterCol.forEach((article) => {
        if (article.link.includes("populist")) {
            let articleIdxNumber = article.link.search("populist")
            articleIdxNumber = articleIdxNumber + 9
            let articleIdx = Number(article.link.substr(articleIdxNumber))

            if (articleIdx > articleToRemoveIdx) {
                startOfArticle = article.link.substring(0, articleIdxNumber)
                let number = Number(articleIdxNumber) - 1
                newArticle = startOfArticle + number
                article.link = newArticle
            }

        }
        articlesCenterColTemp.push(article)
    })



    articlesLeftCol = articlesLeftColTemp
    articlesRightCol = articlesRightColTemp
    articlesCenterCol = articlesCenterColTemp

    originalContent.splice(articleToRemoveIdx, 1)


}

app.post("/deleteOneNews", (req, res) => {
    let idx = req.body.idx
    let colName = req.body.colName

    if (colName === "articlesLeftCol") {
        if (articlesLeftCol[idx].link.includes("populist")) {
            let articleToRemoveIdxNumber = articlesLeftCol[idx].link.search("populist")
            articleToRemoveIdxNumber = articleToRemoveIdxNumber + 9
            let articleToRemoveIdx = Number(articlesLeftCol[idx].link.substr(articleToRemoveIdxNumber))
            removeOriginalArticle(articleToRemoveIdx)

        }

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

app.get("/originalArticle/:idx", (req, res) => {
    let idx = JSON.parse(req.params.idx);
    let content = originalContent[idx]

    let sideContent = []

    articlesLeftCol.forEach((article) => {
        if (article.original === false) {
            sideContent.push(article)
        }
    })
    articlesCenterCol.forEach((article) => {
        if (article.original === false) {
            sideContent.push(article)
        }
    })
    articlesRightCol.forEach((article) => {
        if (article.original === false) {
            sideContent.push(article)
        }
    })

    res.send(
        JSON.stringify({
            success: true,
            content,
            sideContent
        }))
})



app.all('/*', (req, res, next) => { // needed for react router
    res.sendFile(__dirname + '/public/index.html');
})


app.listen(4000, '0.0.0.0', () => { console.log("Server running on port 4000") })