var app = getApp();
var Utils = require("../../../utils/utils.js");

Page({
    data : {
        movieid : "",
        movieTitle : "",
        movie : {}
    },

    onLoad: function (options){

        var movieid = options.movieid;
        var movieTitle = options.movieTitle;
        wx.setNavigationBarTitle({
            title: this.data.movieTitle
        });

        var dataUrl = app.globalData.dataBase + "/v2/movie/subject/" + movieid;
        Utils.http(dataUrl, this.ProcessDetailData);
        wx.showNavigationBarLoading();
    },

    ProcessDetailData : function (movieData){
        if ( !movieData ){
            return;
        };

        var director = {
            avatar : "",
            name : "",
            id : ""
        };

        if (movieData.directors[0] != null ){
            if (movieData.directors[0].avatars != null ){
                director.avatar = movieData.directors[0].avatars.large;
            };
            director.name = movieData.directors[0].name;
            director.id = movieData.directors[0].id;
        };

        var movie = {
            movieImg: movieData.images ? movieData.images.large : "",
            country: movieData.countries[0],
            title: movieData.title,
            originalTitle: movieData.original_title,
            wishCount: movieData.wish_count,
            commentCount: movieData.comments_count,
            year: movieData.year,
            generes: movieData.genres,
            stars: movieData.rating.stars,
            score: movieData.rating.average,
            director: director,
            casts: Utils.convertToCastString(movieData.casts),
            castsInfo: Utils.convertToCastInfos(movieData.casts),
            summary: movieData.summary,
        }
        
        this.setData({
            movie: movie
        });
        wx.hideNavigationBarLoading();
    },

    onReady : function (){
        wx.setNavigationBarTitle({
            title: this.data.movieTitle
        });
    },

    // 图片预览
    previewImageTap : function (event){

        var dataSrc = event.currentTarget.dataset.src;
        wx.previewImage({
            current: dataSrc,
            urls: [dataSrc]
        });
    }
})