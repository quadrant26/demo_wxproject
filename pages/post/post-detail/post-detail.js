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
        // this.getPostCollectedSyc();
        this.getPostsCollectedAsy();
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
    },

    getPostsCollectedAsy : function (event){
        var that = this;
        wx.getStorage({
            key: 'posts_collected',
            success: function(res) {
                console.log(res);
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                // 切换收藏状态
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                // 存储数据状态
                wx.setStorageSync("posts_collected", postsCollected);
                that.setData({
                    collected: postCollected
                })
            },
        })
    }
})