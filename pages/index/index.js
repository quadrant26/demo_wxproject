// pages/index/index.js
Page({
    data : {
        avatarUrl : "",
        nickName : "",
    },
    onLoad : function (){
        var UserInfo = wx.getStorageSync("userInfo");
        this.setData(UserInfo);
    },
    onReady: function () {
        console.log(13);
    },
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