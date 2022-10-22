//瀑布流函数
function waterfalls(father, son) {
    //一、父盒子定位
    //1.1 获取内外层容器标签
    var outContainer = document.getElementById(father)
    var innerContainer = outContainer.getElementsByClassName(son)

    var boxWidth = innerContainer[0].offsetWidth + 40 //1.2 盒子宽度------------后面+40是通过css给box设置的左右两边的margin
    var screenWidth = document.body.clientWidth//1.3 当前屏幕宽度
    var columns = parseInt(screenWidth / boxWidth) //1.4 列数
    //1.5 父盒子居中，给父盒子设置宽度
    outContainer.style.width = columns * boxWidth + "px"
    outContainer.style.margin = "0 auto 20px"

    //二、子盒子定位（从第二行开始）
    //2.1 定义变量
    //盒子高度、盒子高度数组、最矮盒子高度、最矮盒子高度的索引
    var boxHeight, boxHeightArray = [],
        minBoxHeight, minIndex
    //2.2 遍历所有的盒子
    for (let i = 0; i < innerContainer.length; i++) {

        boxHeight = innerContainer[i].offsetHeight + parseInt(getStyle(innerContainer[0], "margin-bottom")) //盒子高度-----------后面+20是通过css给box设置的下边margin
        //2.3 判断是否是第一行
        if (i < columns) {
            boxHeightArray.push(boxHeight) //2.4 盒子高度存进数组
        } else {
            //2.5 剩余行做定位
            minBoxHeight = boxHeightArray[findIndex(boxHeightArray)] //2.6 取出数组中最矮盒子的高度
            minIndex = findIndex(boxHeightArray) //2.7 取出最矮盒子再数组中的索引
            //2.8 剩余盒子的定位（第二行开始）
            innerContainer[i].style.position = "absolute"
            innerContainer[i].style.left = minIndex * boxWidth + "px"
            innerContainer[i].style.top = minBoxHeight + 80 + "px" //这里+80是我将标题“热门评论”移进来放在了第一行，所以要加上标题的高度及上下margin
            boxHeightArray[minIndex] += boxHeight //2.9 更新高度
        }
    }
    /* 原理是瀑布流布局用的是absolute定位，而父级元素是relative定位，
       无法撑开整个父级元素的高度，脱离了应有的文档流，
       所以我直接为父级元素在循环结束设置高度=最高的盒子的高度+最后一个盒子的offsetHeight
    */
    /* 新加的！！！！作用是想要给父级元素撑开高度，以便后期布局，见代码255行*/
    var maxBoxHeight = parseInt(//获取最后一个元素的top值
        innerContainer[innerContainer.length - 1].style.top
    )

    var lastBoxHeight = innerContainer[innerContainer.length - 1].offsetHeight
        + parseInt(
            getStyle(innerContainer[innerContainer.length - 1], "margin-bottom")
        )//获取最后一个元素的offsetHeight和其margin-bottom

    outContainer.style.height = maxBoxHeight + lastBoxHeight + "px"

    // alert(parseInt(getStyle(innerContainer[innerContainer.length - 1], "margin-bottom")))
}