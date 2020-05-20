let newsList = [];
const apiKey = "6d2c1467bedb46a5a41bfd03f84933b0";

const loadNews = async() => {
    let urlApiKey = `https://newsapi.org/v2/everything?q=movie&sortBy=publishedAt&apiKey=${apiKey}&page=1`
    let data = await fetch(urlApiKey)
    let result = await data.json();
    newsList = result.articles;
    render(newsList);
}

const render = (list) => {
    let newsHtml = list.reduce((preVal, item) => {
        return preVal +=
            `<div id="news">
                <div id="contentsArea">
                    <h2>${item.title}</h2>
                    <h6>${item.source.name}</h6>
                    <p class="text-muted">${item.description}</p>
                    <div>${publicTime(item.publishedAt)}</div>
                    <a href="${item.url}">Read more</a>
                </div>
                <a target="_blank" href="${item.urlToImage}">
                    <img src="${item.urlToImage}" width="300px" />
                </a>
            </div>\n`;
    }, "");

    document.getElementById("newsArea").innerHTML += newsHtml;
}

function publicTime(time) {
    let newTime = time.toString().split("").splice(0, 10).join("")
    let newTime1 = newTime.replace("-", "")
    let newTime2 = newTime1.replace("-", "")
    return moment(newTime2, "YYYYMMDD").fromNow()
}

loadNews();

let pageNo = 2;
let totalNews = 20;

const loadMoreNews = async() => {
    let urlApiKey = `https://newsapi.org/v2/everything?q=movie&sortBy=publishedAt&apiKey=${apiKey}&page=${pageNo}`
    let data = await fetch(urlApiKey)
    let result = await data.json();
    let list = result.articles;

    if (list.length > 0) {
        if (pageNo < 5) {
            render(list);
            pageNo++;
            totalNews += list.length;

            for (const news of list) {
                newsList.push(news);
            }
            document.getElementById("totalNews").innerHTML = `Total news: ${totalNews}`;
        }
    }
}