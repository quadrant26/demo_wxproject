var PostData = require("../../../data/posts-data.js");

Page({
    data: {
        isPlayingMusic : false
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
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                // 切换收藏状态
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                that.showToastCollected(postsCollected, postCollected);
            },
        })
    },

    showToastCollected: function (postsCollected, postCollected){
        // 存储数据状态
        wx.setStorageSync("posts_collected", postsCollected);
        this.setData({
            collected: postCollected
        });

        // 消息提示框
        wx.showToast({
            title: postCollected ? '收藏成功！' : "已取消收藏！",
            icon: "success",
            duration: 2000
        });
    },

    showModalCollected: function (postsCollected, postCollected){
        // 存储数据状态
        wx.setStorageSync("posts_collected", postsCollected);
        this.setData({
            collected: postCollected
        });

        // 微信模态弹窗
        wx.showModal({
            title : "收藏",
            content: postCollected ? "收藏该文章？" : "取消收藏？",
            showCancel : true,
            cancelText : "取消",
            cancelColor : "#000",
            confirmText : "确定",
            confirmColor: "#3CC51F",
            success : function (res){
                console.log(res);
            },
            fail : function (){},
            complete : function (){}
        });
    },

    onShareTap : function (event){
        var itemList = [
            "分享到朋友圈",
            "分享给朋友",
            "分享给QQ好友",
            "分享到QQ空间",
        ];

        wx.showActionSheet({
            itemList: itemList,
            itemColor : "#000",
            success: function (res){
                console.log(res);
                // res.cancel           点击了取消按钮
                // res.tapIndex         点击了分享详情的第几个按钮 下标从 0 开始
                if(res.cancel){
                    // 用户取消了分享
                    wx.showModal({
                        content: '是否取消分享',
                    })
                }else{
                    wx.showModal({
                        title: "用户 " + itemList[res.tapIndex],
                        content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
                    })
                };
            }
        })
    }
})