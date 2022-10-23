//1.1给刚刚新创建的div加上commentBox类名
function addClassName(title, fatherElements, sonElementsName) {
    // alert("index：" + everyIndex);
    // alert("长度：" + title.length);
    for (let i = everyIndex; i < title.length; i++) {
        createElements(fatherElements, "div"); //创建length个div
        fatherElements.children[i].classList.add(sonElementsName);
        /*
        他妈的
        搞了两天
        就是问题出现在这里
        因为之前一种用的是getElementsByTagName(tagName)
        它会获取父级元素下面的所有子元素
        包括孙元素（子元素内部相同标签名的元素）
        我1个commentBox里面放4个div方便用drid布局
        每一个div里面再放一个相同数据类型的标签（img, p...）
        然后tm这个语句还给那里面4个div给获取了
        。。。
        着这样一直乱下去了
        我的思路就是
        新加入的按钮点击的评论放在后面
        而我一开始的蠢办法就是全部清空
        但是用户观感上面
        会明显觉得突然全都没了
        然后再加载数据
        再显示出来
        这样太丑了
        我直接给循环的i使其等于上次的comment数据的length
        新的length就是全长!!!!
        然后完美解决
        还是dom操作不是很熟练
        */
    }
}
/* =============================================== */
//1.2创建4个div元素
function create4BasicElements(title, fatherElements) {
    for (let j = 0; j < 4; j++) {
        for (let i = everyIndex; i < title.length; i++) {
            createElements(fatherElements[i], "div");
        }
    }
}
/* =============================================== */
//1.3在上面创建的各个div元素中在各自创建图片，文本span标签，待会用来注入数据且方便css布局控制
function createElementsBy2ComementBox(theBox) {
    for (let i = everyIndex; i < theBox.length; i++) {
        createElements(theBox[i].getElementsByTagName("div")[0], "img");
        createElements(theBox[i].getElementsByTagName("div")[1], "p");
        createElements(theBox[i].getElementsByTagName("div")[2], "span");
        createElements(theBox[i].getElementsByTagName("div")[3], "span");
    }
}
/* ================================================ */
//1.4给上一步的div元素里创建的img标签（头像）顺便注入数据
var tempComments;
function injectionDataBy2ComementBox(title, tag) {
    for (let i = everyIndex; i < title.length; i++) {
        tag[i].getElementsByTagName("div")[0].getElementsByTagName("img")[0].src =
            title[i].user.avatarUrl;

        tempComments = title[i].content;
        // alert(traditionalized(tempComments))
        tag[i]
            .getElementsByTagName("div")[1]
            .getElementsByTagName("p")[0].innerHTML = traditionalized(tempComments);
        tag[i]
            .getElementsByTagName("div")[2]
            .getElementsByTagName("span")[0].innerHTML = "-" + title[i].user.nickname;
        tag[i]
            .getElementsByTagName("div")[3]
            .getElementsByTagName("span")[0].innerHTML = title[i].timeStr;
    }
    // // //瀑布流函数
    // waterfalls("container", "commentBox");
    // waterfalls("banner", "commentBox1");
}