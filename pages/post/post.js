var PostData = require("../../data/posts-data.js");

Page({
  data: {},
  onLoad: function () {

    this.setData({
      postList: PostData.postList
    });

    console.log("页面加载完成");
  },
  onReady: function () {
    console.log("页面渲染完成");
  },
  onShow: function () {

  },
  onHide: function () {

  }
})