let newsList = [];
const apiKey = "6d2c1467bedb46a5a41bfd03f84933b0";

const loadNews = async(status) => {
    let urlApiKey = "";
    if (status == "firstTime" || status == "searchByKeyword") {
        urlApiKey = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=publishedAt&apiKey=${apiKey}&page=1`
    } else if (status == "category") {
        urlApiKey = `https://newsapi.org/v2/top-headlines?q=${keyword}&category=${category}&apiKey=${apiKey}&page=${pageNo}`
    }
    console.log(urlApiKey, "bsahjcdhjsbcdhjbc")
    let data = await fetch(urlApiKey);
    let result = await data.json();
    console.log(result)
    newsList = result.articles;
    showSourceList();
    render(newsList);
    console.log(newsList)
}

// How to search by keyword.

let keyword = "vietnam";

const searchByKeyword = () => {
    keyword = document.getElementById("keywordArea").value;
    loadNews("searchByKeyword");
}

// How to search by category.

let category = "general";

const searchByCategory = () => {
    category = document.getElementById("category").value;
    loadNews("category");
}

// How to search by sources.

const showSourceList = () => {
    let sourcenames = newsList.map(item => item.source.name);
    let sourceObject = {};
    for (let i = 0; i < sourcenames.length; i++) {
        let sourcename = sourcenames[i]
        if (sourceObject[sourcename] == null) {
            sourceObject[sourcename] = 1;
        } else {
            sourceObject[sourcename]++;
        }
    }
    let sourceList = Object.keys(sourceObject);
    console.log(sourceObject)
    let html = sourceList.map(item => `<input type="checkbox" value="${item}" onchange="searchBySource(event)" class="search-part"/>${item} : ${sourceObject[item]}`);
    document.getElementById("sourceArea").innerHTML = html;
}

let searchBySource = (event) => {
    if (event.target.checked == true) {
        let source = event.target.value;
        let filteredList = newsList.filter(item => item.source.name === source);
        render(filteredList);
    }

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

loadNews("firstTime");

let pageNo = 2;
let totalNews = 20;

const loadMoreNews = async() => {
    let urlApiKey = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=publishedAt&apiKey=${apiKey}&page=${pageNo}`
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