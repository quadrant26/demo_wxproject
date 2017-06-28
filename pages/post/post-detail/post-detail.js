var PostData = require("../../../data/posts-data.js");
var app = getApp();
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
        };

        // 音乐播放控制
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === id ){
            this.setData({
                isPlayingMusic : true
            });
        };
        // 总开关和播放控制
        this.setMusicMonitor();
    },

    setMusicMonitor : function (event){
        var that = this;
        // 监听音乐播放
        wx.onBackgroundAudioPlay(function (event){
            var pages = getCurrentPages();
            var currentPage = pages[pages.length-1];

            if (currentPage.data.currentPostId === that.data.currentPostId ){
                // 打开多个post-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
                // 当前页面的postid，只处理当前页面的音乐播放。
                if (app.globalData.g_currentMusicPostId === that.data.currentPostId){
                    // 播放当前页面音乐才改变图标
                    that.setData({
                        isPlayingMusic : true
                    })
                };
            }
            app.globalData.g_isPlayingMusic = true;
        });

        // 监听音乐暂停
        wx.onBackgroundAudioPause(function (event) {
            var pages = getCurrentPages();
            var currentPage = pages[pages.length - 1];

            if (currentPage.data.currentPostId === that.data.currentPostId) {
                if (app.globalData.g_currentMusicPostId === that.data.currentPostId) {
                    that.setData({
                        isPlayingMusic: false
                    })
                };
            };
            app.globalData.g_isPlayingMusic = false;
        });

        // 监听音乐停止
        wx.onBackgroundAudioStop(function (event) {
            that.setData({
                isPlayingMusic : false
            });
            app.globalData.g_isPlayingMusic = false;
            // app.globalData.g_currentMusicPostId = null;
        });
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
    },

    onMusicTap : function (event){

        var that = this;
        // 播放与暂停状态
        var isPlayingMusic = that.data.isPlayingMusic;
        // 每个 item 的音乐设置
        var id = that.data.currentPostId;
        var postData = PostData.postList[id];

        if (isPlayingMusic ){
            // 暂停播放
            wx.pauseBackgroundAudio();
            that.setData({
                isPlayingMusic: false
            });
        }else{
            // 播放音乐
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            });
            that.setData({
                isPlayingMusic: true
            });
        };
    }
})
