const container = document.getElementById("container"); //评论区的容器
const banner = document.getElementById("banner"); //更多评论的容器
const commentBox = document.getElementsByClassName("commentBox"); //如英语所示：每一个评论的盒子，拿来装头像，评论，昵称和日期这4个元素
const commentBox1 = document.getElementsByClassName("commentBox1");
const moreButton = document.getElementById("more"); //获取更多评论的元素

var index = 1; //加载更多评论的次数
var value = 20; //初始的值
var limitValue; //对应接口的limit值，意为一次取出多少条数据，默认为20
var everyIndex = 0;

// 获取数据
async function getData(id, limit) {
    const response = await fetch(
        "https://netease-cloud-music-api-zeta-plum.vercel.app/comment/music?id=" +
        id +
        "&limit=" +
        limit
    );
    const data = await response.json();
    // console.log(data);

    hotComments = data.hotComments;
    comments = data.comments;

    // alert("现有评论条数：" + comments.length);
    bbb();
    aaa();

    waterfalls("container", "commentBox");
    waterfalls("banner", "commentBox1");
}

// 更多评论
moreButton.onclick = () => {
    index++;
    everyIndex = index * value - 20;
    limitValue = index * value;
    // alert("理论上取出评论的条数:" + limitValue);
    getData(26508240, limitValue);
};

//页面加载时，就调用接口数据
window.onload = function () {
    getData(26508240, 20); //梵高先生的id
};
//当页面尺寸发生变化时，触发瀑布流函数，实现响应式
window.onresize = function () {
    waterfalls("container", "commentBox");
    waterfalls("banner", "commentBox1");
};


function aaa() {
    addClassName(comments, banner, "commentBox1");
    create4BasicElements(comments, commentBox1);
    createElementsBy2ComementBox(commentBox1);
    injectionDataBy2ComementBox(comments, commentBox1);
}
function bbb() {
    /* 1.1 */ addClassName(hotComments, container, "commentBox");
    /* 1.2 */ create4BasicElements(hotComments, commentBox);
    /* 1.3 */ createElementsBy2ComementBox(commentBox);
    /* 1.4 */ injectionDataBy2ComementBox(hotComments, commentBox);
}
