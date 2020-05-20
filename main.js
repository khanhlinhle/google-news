let newsList = [];
const apiKey = "6d2c1467bedb46a5a41bfd03f84933b0";
const loadNews = async() => {
    let urlApiKey = `https://newsapi.org/v2/everything?q=movie&sortBy=publishedAt&apiKey=${apiKey}`
    let data = await fetch(urlApiKey)
    let result = await data.json();
    newsList = result.articles;
    console.log(newsList);
    render(newsList);
}

const render = (list) => {
    let newsHtml = list.map(item => `<div id="news">
    <div id="contentsArea">
        <h2 id="title">${item.title}</h2>
        <p class="text-muted" id="source">${item.description}</p>
        <div id="publishedAt">${publicTime(item.publishedAt)}</div>
        <a href="${item.url}">Read more</a>
    </div>
    <div id="imgArea">
        <img src="${item.urlToImage}" width="400px" />
    </div>
</div>`).join("")

    document.getElementById("newsArea").innerHTML = newsHtml;

}

function publicTime(time) {
    let newTime = time.toString().split("").splice(0, 10).join("")
    let newTime1 = newTime.replace("-", "")
    let newTime2 = newTime1.replace("-", "")
    return moment(newTime2, "YYYYMMDD").fromNow()
}

loadNews();