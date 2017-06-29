// pages/movies/more-movie/more-movie.js
var Utils = require("../../../utils/utils.js");
var app = getApp();

console.log(Utils);

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

        this.setData({
            movies: movies
        });

        console.log(movies);
    }

})