var Utils = require("../../utils/utils.js");

Page({

    data: {
        inTheaters : {},
        comingSoon : {},
        top250 : {}
    },

    onLoad: function (options) {
        var database = "https://api.douban.com";

        // 正在热映
        var inTheatersUrl = database + "/v2/movie/in_theaters" + "?start=0&count=3";
        // 即将上映
        var comingSoonUrl = database + "/v2/movie/coming_soon" + "?start=0&count=3";
        // Top250
        var top250Url = database + "/v2/movie/top250" + "?start=0&count=3";

        // 获取各类数据
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        // this.getMovieListData(inTheatersUrl, "comingSoon", "即将上映");
        // this.getMovieListData(inTheatersUrl, "top250", "Top250");
    },

    getMovieListData: function (url, settedKey, categoryTitle){
        var that = this;

        wx.request({
            url : url,
            methd: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header : {
                "Content-Type" : "json"
            },
            success : function (res){
                that.processDoubanData(res.data, settedKey, categoryTitle);
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
        this.setData(readyData)

        // console.log(readyData[settedKey].categoryTitle);
    }

})