var API = 'https://gnews.io/api/v4/top-headlines?token=0fc0fa7098f4c3f0954a5892ba2cbad9';
var searchApi = 'https://gnews.io/api/v4/search?q=example&token=0fc0fa7098f4c3f0954a5892ba2cbad9';

var btn = document.querySelector('#btn');
var searchInput = document.querySelector('.input-search');
var inputBtn = document.querySelector('#search');



// Hàm bắt đầu 
function start() {
    getApi(renderNews);
}

start();


// funtion
// Hàm gọi Api
function getApi(callback) {
    fetch(API)
        .then(function (response) {
            return response.json()
        })
        .then(callback);
}
// Hàm render
function renderNews(items) {
    var listNew = document.querySelector('#list-new');
    var htmls = items.articles.map(function (item) {
        return `<li>
            <img src="${item.image}"/>
            <div class="content">
                <a href="${item.url}" target="_blank">
                    <h3>${item.title}</h3>
                </a>
                <p class="time">${item.publishedAt}</p>
                <p>${item.content}</p>
            </div>
        </li>`
    });
    listNew.innerHTML = htmls.join('');
}
// Hàm ẩn hiện nút search
btn.onclick = function() {
    searchInput.classList.toggle('active')
};
inputBtn.onblur = function() {
    searchInput.classList.remove('active')
};
inputBtn.onkeyup = function(e) {
    
    if (e.which == 13 || e.which == 27) {
        searchInput.classList.remove('active')
    };
}
// Hàm load window
// Hàm bấm Enter để tìm
inputBtn.onkeyup = function(e) {
    
    if (e.which == 13) {
        var inputValue = e.target.value.toLowerCase();
        searchInput.classList.remove('active');

        // Hàm tìm kiếm theo title 
            function search() {
                fetch(`https://gnews.io/api/v4/search?q=${inputValue}&token=0fc0fa7098f4c3f0954a5892ba2cbad9`)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function renderNewsSearch(items) {
                        var listNew = document.querySelector('#list-new');
                        
                        
                        var htmls = items.articles.map(function (item) {
                                return `<li>
                                <img src="${item.image}"/>
                                <div class="content">
                                    <a href="${item.url}" target="_blank">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p class="time">${item.publishedAt}</p>
                                    <p>${item.content}</p>
                                </div>
                            </li>`
                            }
                        );
                        listNew.innerHTML = htmls.join('');
                    });
            }
        search();
    };
}

