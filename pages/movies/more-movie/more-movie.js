// pages/movies/more-movie/more-movie.js
var Utils = require("../../../utils/utils.js");
var app = getApp();

Page({

    data: {
        navigateTitle : "",
        requestUrl : "",
        movies : {},
        totalCount : 0,
        isEmpty : true
    },
    onLoad: function (options) {

        var category = options.category;
        var database = app.globalData.dataBase;
        this.data.navigateTitle = category;
        
        var dataUrl = "";
        switch (category){
            case "正在热映":
                dataUrl = database + "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = database + "/v2/movie/coming_soon";
                break;
            case "Top250":
                dataUrl = database + "/v2/movie/top250";
                break;
        };

        wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        });
        this.setData({
            requestUrl: dataUrl
        });
        // this.data.requestUrl = dataUrl;
        var moreTime = wx.getStorageSync("moretime");
        var nowTime = Date.now();
        
        if (!moreTime || (moreTime && (nowTime - moreTime >= 1500000) )){
            Utils.http(dataUrl, this.processDoubanData);
            wx.setStorageSync("moretime", nowTime)
        }else{
            var data_douban = wx.getStorageSync("moredata");
            this.processDoubanData(data_douban);
        };
    },

    onPullDownRefresh : function (event){
        // 下拉刷新页面
        // 属性进行恢复到默认
        var dataUrl = this.data.requestUrl + "?start=0&count=20";
        this.data.movies = {};
        this.data.totalCount = 0;
        this.data.isEmpty = true;
        Utils.http(dataUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    onScrollLower : function (event){
        // 上拉加载更多内容
        var dataUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
        Utils.http(dataUrl, this.processDoubanData);
        // 在导航条显示加载动画
        wx.showNavigationBarLoading();
    },

    onReachBottom : function (event){
        // 页面滑动到底部触发加载更多内容
        var dataUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
        Utils.http(dataUrl, this.processDoubanData);
        // 在导航条显示加载动画
        wx.showNavigationBarLoading();
    },

    onMovieDetailTap : function (event){
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?movieid=' + movieId,
        });
    },

    processDoubanData: function (moviedata) {
        
        wx.setStorageSync("moredata", moviedata);
        var movies = [];
        for (var index in moviedata.subjects) {
            var subject = moviedata.subjects[index];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            };

            var temp = {
                stars: Utils.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            };
            movies.push(temp);
        };
        // 设置加载更多时 数据动态
        var totalMovies = {};

        if (!this.data.isEmpty ){
            // 加载更多时数组连接
            totalMovies = this.data.movies.concat(movies);
        }else{
            totalMovies = movies;
            this.data.isEmpty = false;
        };


        this.data.totalCount += 20;
        this.setData({
            movies: totalMovies
        });

        // 在导航条关闭加载动画
        wx.hideNavigationBarLoading();
        // 停止下拉刷新
        wx.stopPullDownRefresh();
    }

})