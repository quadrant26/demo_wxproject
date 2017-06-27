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

        声明周期函数 接受一个 json 参数 可以获取信息

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

    4. 事件

        bindtap             绑定一个事件处理函数

            <view id="tapTest" data-hi="WeChat" bindtap="tapName"> Click me! </view>
            Page({
              tapName: function(event) {
                console.log(event)
              }
            })

            获取 data-hi 数据 在 event 对象中 currentTarget.dataset 中

            event.currentTarget.dataset

        事件绑定

            key 以bind或catch开头，然后跟上事件的类型，如bindtap, catchtouchstart
            value 是一个字符串，需要在对应的 Page 中定义同名的函数。不然当触发事件的时候会报错。

            bind事件绑定不会阻止冒泡事件向上冒泡，
            catch事件绑定可以阻止冒泡事件向上冒泡。

5. 路由

    navigateTo, redirectTo 只能打开非 tabBar 页面。
    switchTab 只能打开 tabBar 页面。
    reLaunch 可以打开任意页面。
    页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
    调用页面路由带的参数可以在目标页面的onLoad中获取。

        打开新页面    wx.navigateTo ||  <navigator open-type="navigateTo"/>

        页面重定向    wx.redirectTo ||  <navigator open-type="redirectTo"/>

        页面返回      wx.navigateBack || <navigator open-type="navigateBack"> || 用户按左上角返回按钮

        Tab 切换      wx.switchTab ||  <navigator open-type="switchTab"/> || 用户切换 Tab

        重启动        wx.reLaunch  ||  <navigator open-type="reLaunch"/>

6. 导入

    import

        import可以在该文件中使用目标文件定义的template

        css 导入

            @import "css file path"

        模版导入

            <import src="template file path" />

    include

        <!-- index.wxml -->
        <include src="header.wxml"/>
        <view> body </view>
        <include src="footer.wxml"/>

        <!-- header.wxml -->
        <view> header </view>

        <!-- footer.wxml -->
        <view> footer </view>

7. 模版

    声明一个模版

        <template name="templateName">
            ...
        </template>

    使用模版

        <import src="template file path" />
        <template is="templateName" data=""></template>

8. storage

    wx.getStorage

        wx.getStorage({
            key : val,
            success : function (data){},           // 接口调用的回调函数, success返回参数说明  data	String	key对应的内容
            fail : function (){},                  // 接口调用失败的回调函数 （可选）
            complete : function (){},              // 接口调用结束的回调函数（调用成功、失败都会执行） （可选）
        })

    wx.getStorageSync

        wx.getStorageSync(key)                    // 从本地缓存中同步获取指定 key 对应的内容

    wx.setStorage

        wx.getStorage({
            key : val,
            data : Object/String
            success : function (data){},           // 接口调用成功的回调函数 （可选）
            fail : cb,                            // 接口调用失败的回调函数 （可选）
            complete : cb,                        // 接口调用结束的回调函数（调用成功、失败都会执行）（可选）
        })

    wx.setStorageSync

        wx.setStorageSync(KEY,DATA)                    // 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

    wx.getStorageInfo()

        wx.getStorageInfo({
            success : function (){},
            fail : function (){},                  // 接口调用失败的回调函数 （可选）
            complete : function (){},              // 接口调用结束的回调函数（调用成功、失败都会执行） （可选）
        })

    wx.getStorageInfoSync()

        wx.getStorageInfoSync()                     // 同步获取当前storage的相关信息

    wx.removeStorage

        wx.removeStorage(Object)

    removeStorageSync()

        removeStorageSync(KEY)                      // 从本地缓存中同步移除指定 key

    wx.clearStorage

        wx.clearStorage()                           // 清理本地数据缓存

    wx.clearStorageSync

        wx.clearStorageSync()                       // 同步清理本地数据缓存

9. 交互

    wx.showToast(OBJECT)    // 显示消息提示框

    wx.showLoading(OBJECT)  // 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框

    wx.hideToast()          // 隐藏消息提示框

    wx.wx.hideLoading()     // 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框

    wx.showModal(OBJECT)    // ​显示模态弹窗

    wx.showActionSheet(OBJECT)      // ​显示操作菜单


Queation

    1. 收藏状态

        默认第一次加载是没有 收藏状态需要手动创建一个 Storage, 并存储到 Storage 中
        页面在加载的时候从 Storage 取得状态， 因为文章列表是多个，所以在 data 里面存储了该文章的 收藏状态。
        对收藏进行改变时 Storage 里面的数据状态也要改变，同时也要改变 data collected 的数据状态，以便进行数据绑定
        Storage 返回是一个 Object， 所以每个文章对应的 id 或者是 postid 都不一样，需要根据 id或 postid 获取状态

        Storage 操作的几种方法( 设置，获取， 删除 和 清空 )， 同步和异步操作 
