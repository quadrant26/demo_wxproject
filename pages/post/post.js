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
    }
})
