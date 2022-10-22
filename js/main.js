const container = document.getElementById("container") //评论区的容器
const banner = document.getElementById("banner")//更多评论的容器
const commentBox = document.getElementsByClassName("commentBox") //如英语所示：每一个评论的盒子，拿来装头像，评论，昵称和日期这4个元素
const commentBox1 = document.getElementsByClassName("commentBox1")
const moreButton = document.getElementById("more")//获取更多评论的元素

//创建元素
function createElements(fatherElement, needsElement) { //函数传参。传父级元素进去，和要添加的元素
    var needsElement = document.createElement(needsElement) //创建div元素(这个创建的是评论的div，之后还需要用户名，头像，日期)
    fatherElement.appendChild(needsElement) //添加到节点
}
// 获取数据
async function getData(id, limit) {
    const response = await fetch("https://netease-cloud-music-api-zeta-plum.vercel.app/comment/music?id="
        + id
        + "&limit=" + limit)
    const data = await response.json()
    console.log(data)

    hotComments = data.hotComments
    comments = data.comments

    //1操他媽的全都是循環創建，真几把麻烦TMD
    function godDamnFuckingCreate() {
        //1.1给刚刚新创建的div加上commentBox类名
        function addClassName(title, fatherElements, sonElementsName) {
            for (let i = 0; i < title.length; i++) {
                createElements(fatherElements, "div")//创建length个div
                if (getStyle(fatherElements.getElementsByTagName("div")[i], "class") == undefined) {

                    fatherElements.getElementsByTagName("div")[i].classList.add(sonElementsName)
                }
            }
        }
        /* =============================================== */
        //1.2创建4个div元素
        function create4BasicElements(title, fatherElements) {
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < title.length; i++) {
                    createElements(fatherElements[i], "div")
                }
            }
        }
        /* =============================================== */
        //1.3在上面创建的各个div元素中在各自创建图片，文本span标签，待会用来注入数据且方便css布局控制
        function createElementsBy2ComementBox(theBox) {
            for (let i = 0; i < theBox.length; i++) {
                createElements(theBox[i].getElementsByTagName("div")[0], "img")
                createElements(theBox[i].getElementsByTagName("div")[1], "p")
                createElements(theBox[i].getElementsByTagName("div")[2], "span")
                createElements(theBox[i].getElementsByTagName("div")[3], "span")
            }
        }
        /* ================================================ */
        //1.4给上一步的div元素里创建的img标签（头像）顺便注入数据
        var tempComments
        function injectionDataBy2ComementBox(title, tag) {
            for (let i = 0; i < title.length; i++) {
                tag[i].getElementsByTagName("div")[0].getElementsByTagName("img")[0].src = title[i].user.avatarUrl

                tempComments = title[i].content
                // alert(traditionalized(tempComments))
                tag[i].getElementsByTagName("div")[1].getElementsByTagName("p")[0].innerHTML = traditionalized(tempComments)
                tag[i].getElementsByTagName("div")[2].getElementsByTagName("span")[0].innerHTML = "-" + title[i].user.nickname
                tag[i].getElementsByTagName("div")[3].getElementsByTagName("span")[0].innerHTML = title[i].timeStr
            }
        }
        /* 1.1 */addClassName(hotComments, container, "commentBox")
        /* 1.2 */create4BasicElements(hotComments, commentBox)
        /* 1.3 */createElementsBy2ComementBox(commentBox)
        /* 1.4 */injectionDataBy2ComementBox(hotComments, commentBox)

        addClassName(comments, banner, "commentBox1")
        create4BasicElements(comments, commentBox1)
        createElementsBy2ComementBox(commentBox1)
        injectionDataBy2ComementBox(comments, commentBox1)
    }
    godDamnFuckingCreate()
    //瀑布流函数
    waterfalls("container", "commentBox")
    waterfalls("banner", "commentBox1")
}
// 更多评论
var limitValue = 20
moreButton.onclick = () => {
    limitValue += 20
    container.innerHTML="<h2 class="+"hotCommentsTittle"+">丨熱門評論</h2>"
    banner.innerHTML="<h2 class="+"commentsTittle"+">丨更多評論</h2>"
    getData(26508240, limitValue)
}

//页面加载时，就调用接口数据
window.onload = function () {
    getData(26508240, limitValue) //梵高先生的id
}
//当页面尺寸发生变化时，触发瀑布流函数，实现响应式
window.onresize = function () {
    waterfalls("container", "commentBox")
    waterfalls("banner", "commentBox1")
}