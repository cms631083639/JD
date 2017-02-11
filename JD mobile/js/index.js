/**
 * Created by cms on 2017/2/8.
 */

$(function () {
// 1.先获取banner
    var banner = document.querySelector(".jd_banner");
// 2.获取banner的宽度
    var width = banner.offsetWidth;
// 3.获取需要进行轮播的图片
    var boxImg = banner.querySelector("ul:first-child");
// 4.获取需要进行轮播的焦点
    var boxDot = banner.querySelector("ul:last-child");
    // 设置当前图片对应点的样式
    function setIndicator(obj,index) {
        // 1.将焦点的样式全部清除
        var indicator = obj.querySelectorAll("li");
        for (var i = 0; i < indicator.length; i++) {
            indicator[i].className = "";
            // indicator[i].classList.remove("active");
        }
        // 2.在设置对应焦点的样式
        // 2.1.防止定时器未启动时向右拉动的索引越界
        if (index < 1) {
            index = 1;
        }
        // 2.2.防止向左频繁连续拉动导致的右边索引越界
        if (index > indicator.length) {
            index = indicator.length;
        }
        indicator[index-1].className = "active";
    }

// 5.开启定时器,实现自动轮播
    var index = 1;
    var timer = setInterval(function () {
        // 5.1.索引值+1
        index++;
        // 5.2.先设置过渡效果
        boxImg.style.webkitTransition = "all .2s";
        boxImg.style.transition = "all .2s";
        // 5.3.进行图片的偏移
        boxImg.style.webkitTransform = "translateX(" + (-width * index) + "px)";
        boxImg.style.transform = "translateX(" + (-width * index) + "px)";
    }, 2000);
// 6.监听transition过渡结束事件
    boxImg.addEventListener("webkitTransitionEnd", function () {
        if (index == (boxImg.children.length - 1)) {
            index = 1;
        }
        if (index == 0) {
            index = (boxImg.children.length - 2);
        }
        boxImg.style.webkitTransition = "none";
        boxImg.style.transition = "none";
        boxImg.style.webkitTransform = "translateX(" + (-width * index) + "px)";
        boxImg.style.transform = "translateX(" + (-width * index) + "px)";
        // 对应焦点进行轮播
        setIndicator(boxDot, index);
    });
// 7.添加手势事件
    var startX = 0, moveX = 0, distance = 0;
    boxImg.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    boxImg.addEventListener("touchmove", function (e) {
        // 记录手指滑动的坐标，计算出相对于原始位置的偏移值
        moveX = e.touches[0].clientX;
        distance = moveX - startX;
        // 删除过渡效果
        boxImg.style.webkitTransition = "none";
        boxImg.style.transition = "none";
        // 设置偏移
        boxImg.style.webkitTransform = "translateX(" + (-index * width + distance) + "px)";
        boxImg.style.transform = "translateX(" + (-index * width + distance) + "px)";
    });
    boxImg.addEventListener("touchend", function (e) {
        // 判断滑动距离是否大于1/3，是则对应翻页，否则吸附回去
        if (Math.abs(distance) > (width / 5)) {
            // 判断拖动的方向
            if (distance > 0) {
                index--;
            } else {
                index++;
            }
        }
        // 开启过渡效果
        boxImg.style.webkitTransition = "all .2s";
        boxImg.style.transition = "all .2s";
        // 设置偏移
        boxImg.style.webkitTransform = "translateX(" + (-index * width) + "px)";
        boxImg.style.transform = "translateX(" + (-index * width) + "px)";
        // 重新开始定时器
        timer = setInterval(function () {
            // 5.1.索引值+1
            index++;
            // 5.2.先设置过渡效果
            boxImg.style.webkitTransition = "all .2s";
            boxImg.style.transition = "all .2s";
            // 5.3.进行图片的偏移
            boxImg.style.webkitTransform = "translateX(" + (-width * index) + "px)";
            boxImg.style.transform = "translateX(" + (-width * index) + "px)";
        }, 2000);
    });
});

