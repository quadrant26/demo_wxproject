var PostData = require("../../../data/posts-data.js");

Page({
    data: {
        
    },
    onLoad: function (options) {

        var id = options.id;
        this.data.currentPostId = id;
        var postdate = PostData.postList[id];
        this.setData({
            postdate: postdate
        });

        // 获取收藏状态
        var posts_collected = wx.getStorageSync("posts_collected");
        console.log(posts_collected);
        if (posts_collected ){
            var collected = posts_collected[id];
            this.setData({
                collected: collected
            });
        }else{
            var posts_collected = {};
            posts_collected[id] = false;
            wx.setStorageSync("posts_collected", posts_collected);
        }
    },

    onCollectionTap : function (event){
        // var that = this;
        // wx.getStorage({
        //     key: 'posts_collected',
        //     success: function(res) {
        //         var posts_collected = res.data;
        //         var post_collected = posts_collected[that.data.currentPostId];
        //         post_collected = !post_collected;

        //         console.log(post_collected);
        //     },
        // })

        this.getPostCollectedSyc();
    },

    getPostCollectedSyc : function (event){
        var postsCollected = wx.getStorageSync("posts_collected");
        var postCollected = postsCollected[this.data.currentPostId];
        console.log(postCollected);
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        wx.setStorageSync("posts_collected", postsCollected)
        this.setData({
            collected: postCollected
        })
    }
})