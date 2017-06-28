var PostData = require("../../data/posts-data.js");

Page({
    data: {},
    onLoad: function () {

        this.setData({
            postList: PostData.postList
        });

        console.log("页面加载完成");
    },

    onPostTap: function (event) {

        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId
        });
    },

    onSwiperTap : function (event){

        // target 和 currentTarget
        // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
        // target这里指的是image，而currentTarget指的是swiper

        var postId = event.target.dataset.postid;
        console.log(postId);

        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,
        })
    }
})
