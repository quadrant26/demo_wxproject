// pages/movies/more-movie/more-movie.js
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
        console.log(options);
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
        this.data.requestUrl = dataUrl;

    },

})