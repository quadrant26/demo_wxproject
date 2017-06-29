// pages/index/index.js
Page({
    onTap: function () {

        // 可以返回上一页
        // wx.navigateTo({
        //   url: "/pages/post/post"
        // })

        wx.switchTab({
            url: "../post/post"
        });
    }
})