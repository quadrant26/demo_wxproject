var Utils = require("../../utils/utils.js");
var app = getApp();
Page({

    data: {
        inTheaters : {},
        comingSoon : {},
        top250 : {},
        searchPanelShow : false,
        containerShow : true,
        searchResult : {},
        value : ""
    },

    onLoad: function (options) {
        var database = app.globalData.dataBase;

        // 正在热映
        var inTheatersUrl = database + "/v2/movie/in_theaters" + "?start=0&count=3";
        // 即将上映
        var comingSoonUrl = database + "/v2/movie/coming_soon" + "?start=0&count=3";
        // Top250
        var top250Url = database + "/v2/movie/top250" + "?start=0&count=3";

        // 根据时间戳来获取数据 防止 key 锁定
        var nowTime = Date.now();
        var oldTime = wx.getStorageSync("oldtime");
        
        // 获取新数据的条件是
        // 缓存中的 时间戳不存在
        // 或者 现在的时间和缓存中的时间间隔为 30s 以上
        if (!oldTime || (oldTime && (nowTime - oldTime) >= 30000) ){
            
            this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映"); 
            this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
            this.getMovieListData(top250Url, "top250", "Top250");
            wx.showNavigationBarLoading();
            // 将最新的时间戳保存起来
            wx.setStorageSync("oldtime", nowTime);
        }else{
            // 不请求新数据, 直接从缓存中进行读取数据的操作
            var inTheaters_data = wx.getStorageSync("inTheaters");
            var comingSoon_data = wx.getStorageSync("comingSoon");
            var top250_data = wx.getStorageSync("top250");

            wx.showNavigationBarLoading();
            this.processDoubanData(inTheaters_data, "inTheaters", "正在热映");
            this.processDoubanData(comingSoon_data, "comingSoon", "即将上映");
            this.processDoubanData(top250_data, "top250", "Top250");
        };
        // 获取各类数据
        //this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        //this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        //this.getMovieListData(top250Url, "top250", "Top250");
    },

    onMoreTap : function (event){
        // 查看更多
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category
        });
    },

    onCanelImgTap : function (event){
        // 点击清空搜索框的内容
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            searchResult : {},
            value : ""
        })
    },

    onBindFocus : function (event){
        // 输入框得到焦点事件
        this.setData({
            containerShow : false,
            searchPanelShow : true
        })
    },

    onBindBlur : function (event){
        // 输入框失去焦点事件
        var value = event.detail.value;
        this.data.value = value;
        if( value !== "" ){
            var dataUrl = app.globalData.dataBase + "/v2/movie/search?q=" + value;
            this.getMovieListData(dataUrl, "searchResult", "");
            wx.showNavigationBarLoading();
        }else{
            this.setData({
                containerShow: true,
                searchPanelShow: false,
                searchResult: {},
                value : ""
            })
        };
    },

    onMovieDetailTap : function (event){
        // 点击查看电影详情
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?movieid=' + movieId,
        });
    },

    getMovieListData: function (url, settedKey, categoryTitle){
        var that = this;

        wx.request({
            url: url,
            methd: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "json"
            },
            success: function (res) {
                that.processDoubanData(res.data, settedKey, categoryTitle);
                wx.setStorageSync(settedKey, res.data);
            },
            fail: function (error) {
                // fail
                console.log(error)
            }
        });

    },

    processDoubanData: function (moviedata, settedKey, categoryTitle){

        var movies = [];

        for (var index in moviedata.subjects){
            var subject = moviedata.subjects[index];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            };

            var temp = {
                stars: Utils.convertToStarsArray(subject.rating.stars),
                title : title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId : subject.id
            };
            movies.push(temp);
        };

        var readyData = {};
        readyData[settedKey] = {
            categoryTitle: categoryTitle,
            movies: movies
        };
        this.setData(readyData);
        wx.hideNavigationBarLoading();
    }

})