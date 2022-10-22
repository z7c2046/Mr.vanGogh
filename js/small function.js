/* +++++++++++++++++++++++++++++++++++小函数 */
/* 可以传递一个「数组」类型的参数
作用是找到数组中的最小值
并且特别注意返回的是最小值的「下标」 */
function findIndex(arr) {
    var j = 0;
    for (i in arr) {
        if (arr[j] > arr[i])
            j = i
    }
    return j
}
/* 传递一个「数组」类型的参数，返回其最大值的「下标」 */
function findMaxIndex(arr) {
    var j = 0;
    for (i in arr) {
        if (arr[j] < arr[i])
            j = i
    }
    return j
}
/* 测试
var list = [1, 2, 55, 66, 4, 78, 3, 5, 8, 96, 7, 5];
findMaxIndex(list); */

/* 获取非行间样式，obj是对象，attr是值 */
function getStyle(obj, attr) {
    if (obj.currentStyle) { //针对ie获取非行间样式
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj, false)[attr] //针对非ie
    }
}
// getStyle(document.querySelector("hotCommentsTittle"), "margin")