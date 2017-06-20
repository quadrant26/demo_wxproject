# demo_wxproject  微信小程序

1. 开发环境

    微信开发者工具 v0.17.172600

2. 文件目录

    | -- images  图片目录

    | -- pages   页面

    | -- app.js

    | -- app.json

    | -- app.wxss

    |

2. 功能实现

    a. 入口欢迎页 /pages/index/index

    b. post /pages/post/post

3. Page()

    data        Object            页面的初始数据

    生命周期

        onLoad          生命周期函数--监听页面加载

        onReady         生命周期函数--监听页面初次渲染完成

        onShow          生命周期函数--监听页面显示

        onHide          生命周期函数--监听页面隐藏

        onUnload        页面卸载

        onPullDownRefresh  下拉刷新

        onShareAppMessage   用户转发

    Page.prototype.setData()    
        setData 函数用于将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值。

4. 视图层

    1. 数据绑定

        基础  {{ content }}

        属性 需要在双引号之内     "item-{{id}}"

        控制属性    wx:if="{{condition}}"

        关键字 checked="{{false}}"

    2. 列表渲染

        wx:for

            <view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
                {{idx}}: {{itemName.message}}
            </view>

            <block wx:for="{{[1, 2, 3]}}">
                <view> {{index}}: </view>
                <view> {{item}} </view>
            </block>

    3. 条件渲染

        wx:if

            <view wx:if="{{condition}}"> True </view>

            <view wx:if="{{length > 5}}"> 1 </view>
            <view wx:elif="{{length > 2}}"> 2 </view>
            <view wx:else> 3 </view>

        block wx:if

            <block wx:if="{{true}}">
