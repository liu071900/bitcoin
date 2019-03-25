var config    =   {
    //supported_resolutions:["1", "3", "5", "15", "45", "60", "120", "180","240","1D","1W","1M","12M"],
    
    supported_resolutions:["1", "5", "15", "30", "60", "240", "1D","1W","1M"],
    "supports_search": true,//是否支持搜索
    "supports_group_request": false,//是否支持搜索或品种解析
    "supports_marks": false,
    "supports_timescale_marks":false,
    "exchanges": [{ //交易所数组
        "value": "",
        "name": "All Exchanges",
        "desc": ""
    }],
    "symbolsTypes": [],
 
};
const DEFAULT_COIN      =   "EURUSD.";
const exchanges         =   ["EURUSD.","GBPUSD.","USDJPY."];
const POST_URL_QUERY    =   "*********";
const WS_URL_SUBSCRIBE  =   "*********";
//https://zlq4863947.gitbooks.io/tradingview/book/JS-Api.html#getbarssymbolinfo-resolution-from-to-onhistorycallback-onerrorcallback-firstdatarequest
const history = {};
const leftData = {};
let globalInterval=15;
let Datafeeds = {
 
    //此方法旨在提供填充配置数据的对象
    onReady: function (callback) {
        console.log('=====onReady running')
        setTimeout(function () {
            callback(config);
        }, 0);
    },
 
    //提供一个匹配用户搜索的商品列表
    searchSymbols: function (userInput, exchange, symbolType, onResultReadyCallback) {
 
 
        let match_datas =   [];
        exchanges.map(el=>{
            if(el.includes(userInput)){
                match_datas.push({
                    "symbol"        :   el,
                    "full_name"     :   el,
                    "description"   :   '',
                });
            }
        });
        console.log(userInput);
        console.log(exchange);
        console.log(match_datas);
        // onResultReadyCallback([{
        //     "symbol": "AAA",        // <商品缩写名>
        //     "full_name":"aaa",      //<商品全称 -- 例: BTCE:BTCUSD>(这个是传入值）
        //     "description":"AAA",    //  <商品描述>
        //     "exchange": "ABC",      //<交易所名>
        //     "ticker":"",            //<商品代码, 可选
        //     "type": ""
        // }]);
        onResultReadyCallback(match_datas);
    },
    //通过商品名称解析商品信息(SymbolInfo)。
    resolveSymbol: function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        console.log('======resolveSymbol running');
        let symbol_stub = {
            "name"          : symbolName,       //商品名称。您的用户将看到它(作为一个字符串)
            "ticker"        : symbolName,       //它是您的商品体系中此商品的唯一标识符
            "description"   : symbolName ,      //描述
            "type"          : 'stock',        //仪表的可选类型:stock, index, forex, futures, bitcoin, expression, spread, cfd
            "session"       : "24x7",           //商品交易时间(7*24小时)
            "timezone"      : "UTC",  //时区
            "exchange"      :  symbolName,     //listed_exchange 现在，这两个字段都为某个交易所的略称
            //minmov(最小波动), pricescale(价格精度), minmove2, fractional(分数)
            "minmov"        : 1,
            "pricescale"    : 100000,
            "has_intraday"  : true,//布尔值显示商品是否具有日内（分钟）历史数据
            "intraday_multipliers": config.supported_resolutions,//这是一个包含日内分辨率(分钟单位)的数组
            "volume_precision": 8,    //整数显示此商品的成交量数字的小数位。0表示只显示整数。1表示保留小数位的1个数字字符
            "data_status"   : "streaming",//数据状态(streaming(实时),endofday(已收盘),pulsed(脉冲),delayed_streaming(延迟流动中))
        };
        setTimeout(function () {
            onSymbolResolvedCallback(symbol_stub);
        },0);
    },
    //通过日期范围获取历史K线数据。图表库希望通过onHistoryCallback仅一次调用，接收所有的请求历史。而不是被多次调用。
    getBars:function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest){
      
        let params  =   {
            BrokerID    : xxx,
            Account     : "xxxxx",
            Symbol      : symbolInfo.name,
            From        : to+86400,#就这，困扰我很久的代码
            Count       : 2000,
            TimeFrame   : globalInterval
        };
        console.log("params = "+JSON.stringify(params));
        $.ajax({
            type: 'post',
            url :   POST_URL_QUERY,
            data:   JSON.stringify(params),
            dataType: 'json',
            success:function(res){
                let data = res.Bars.Bars;
                let bars = {};
                if(data.length>1){
                    bars = data.map(el => {
                        return {
                            time: el.Time * 1000, //TradingView requires bar time in ms
                            low: el.Low,
                            high: el.High,
                            open: el.Open,
                            close: el.Close,
                            //volume: el.Volume
                        }
                    });
                    if(firstDataRequest){
                        history[symbolInfo.name] = bars[bars.length - 1];
                    }
                   // console.table (data);
                    onHistoryCallback(bars, {noData: false});
                }else{
                    onHistoryCallback(bars, {noData: true})
                }
            }
        });
    },
    //订阅K线数据
    subscribeBars: function(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback){
        console.log('=====subscribeBars runnning')
        stream.subscribeBars(symbolInfo,resolution,onRealtimeCallback,subscribeUID,onResetCacheNeededCallback);
    },
    //取消订阅K线数据
    unsubscribeBars:function(subscriberUID){
        console.log('=====unsubscribeBars running')
        stream.unsubscribeBars(subscriberUID)
    },
    //图表库在它要请求一些历史数据的时候会调用这个函数，让你能够覆盖所需的历史深度
    calculateHistoryDepth:function (resolution, resolutionBack, intervalBack){
        //optional
        console.log('=====calculateHistoryDepth running');
        // while optional, this makes sure we request 24 hours of minute data at a time
        // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
        // if(resolution < 60){
        //     return {resolutionBack: 'D', intervalBack: resolution};
        // }else{
        //     return {resolutionBack: 'M', intervalBack: intervalBack};
        // }
        let _resolution = resolution;
        if (_resolution.includes('D')) {
            // 1 day in minutes === 1440
            _resolution = 1440;
        } else if (_resolution.includes('W')) {
            // 1 week in minutes === 10080
            _resolution = 10080;
        } else if(_resolution.includes('M')){
            _resolution  =   43200;
        }
        globalInterval  =   parseInt(_resolution);
        return undefined;
    },
    //图书馆调用这个函数来获得可见的K线范围的标记。 图表预期每调用一次getMarks就会调用一次onDataCallback。
    getMarks: function(symbolInfo, startDate, endDate, onDataCallback, resolution){
        //optional
        console.log('=====getMarks running')
    },
    //图表库调用此函数获取可见K线范围的时间刻度标记。图表预期您每个调用getTimescaleMarks会调用一次onDataCallback。
    getTimescaleMarks: function(symbolInfo, startDate, endDate, onDataCallback, resolution){
        //optional
        console.log('=====getTimeScaleMarks running')
    },
    //当图表需要知道服务器时间时，如果配置标志supports_time设置为true，则调用此函数
    getServerTime: function(cb)  {
        console.log('=====getServerTime running')
    }
};
TradingView.onready(function(){
    const widgetOptions = {
        debug           : false,
        interval        : globalInterval,     //Interval of bars plotting. Possible values are: 1, 3, 5, 15, 30, 60, 120, 180, 240 Interval in minutes
        symbol          : DEFAULT_COIN, //代码股票
        container_id    : 'tv_chart_container',//页面容器
        library_path    : "/home/js/module/charting_library/",//类库目录
        locale          : "zh",
        width           : '1065px',
        height          :'730px',
        autosize        : false,
        fullscreen      : false,     //全屏
       // timeframe       : config.supported_resolutions,
        disabled_features: [
            "use_localstorage_for_settings",
            "volume_force_overlay",
            "header_compare",
            //"header_symbol_search",
            //"header_resolutions",
            "header_interval_dialog_button",
            //"show_interval_dialog_on_key_press",
            "caption_buttons_text_if_possible",
            "header_undo_redo",
            "header_screenshot",
            "header_chart_type",
            "display_market_stauts",
            "study_templates",
            "left_toolbar",
          //  "go_to_date",
            "items_favoriting",
            "header_indicators",
            "header_fullscreen_button",
            "header_settings",
            "header_saveload",
            "volume_force_overlay",
            "create_volume_indicator_by_default",
            "create_volume_indicator_by_default_once"
        ],
        enabled_features: [
            "dont_show_boolean_study_arguments",
            "move_logo_to_main_pane",
            "hide_last_na_study_output",
            "legend_context_menu"
        ],
        //drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } , { name: "Trend Angle", grayed: true }] },//工具
        // //绘图覆盖
        // overrides: {
        //     "paneProperties.background": "#131722",
        //     "paneProperties.vertGridProperties.color": "#363c4e",
        //     "paneProperties.horzGridProperties.color": "#363c4e",
        //     "symbolWatermarkProperties.transparency": 90,
        //     "scalesProperties.textColor" : "#AAA",
        //     "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
        //     "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
        // },
        //https://zlq4863947.gitbooks.io/tradingview/book/Studies-Overrides.html
        //为新创建的指标设置默认样式和输入值
        studies_overrides: {
            // "volume.volume.color.0": "#00FFFF",
            // "volume.volume.color.1": "#0000FF",
            // "volume.volume.transparency": 70,
            // "volume.volume ma.color": "#FF0000",
            // "volume.volume ma.transparency": 30,
            // "volume.volume ma.linewidth": 5,
            // "volume.show ma": true,
            "bollinger bands.median.color": "#33FF88",
            "bollinger bands.upper.linewidth": 7
        },
        //List of time frames visible in timeframes picker at the bottom of the chart.
        //https://zlq4863947.gitbooks.io/tradingview/book/Time-Frames.html
        time_frames: [
            { text: "1MN", resolution: "1M", description: "1月" },
            { text: "1w", resolution: "1W" },//ok
            { text: "1d", resolution: "1D" },//ok
            { text: "4h", resolution: "240" },//ok
            { text: "1h", resolution: "60" },//ok
            { text: "30m", resolution: "30" },
            { text: "15m", resolution: "15" },
            { text: "5m", resolution: "5" },
            { text: "1m", resolution: "1" }
        ],
        //"1", "5", "15", "30", "60", "240", "1D","1W","1M"],
        charts_storage_url          : 'http://saveload.tradingview.com',
        charts_storage_api_version  : "1.1",
        client_id                   : 'tradingview.com',
        user_id                     : 'public_user',
        // favorites: {
        //     intervals: ["1D", "3D", "3W", "W", "M"],
        //     chartTypes: ["Area", "Line"]
        // },
       // symbol_search_request_delay : 1000,//在商品搜索按下键后请求之前，以毫秒为单位延迟。
     //   auto_save_delay             :  5000,//延迟秒数等待 onAutoSaveNeeded 可以被再次调用
        toolbar_bg                  : '#f4f7f9',//工具栏背景色
        datafeed                    : Datafeeds, // our datafeed object
    };
    var widget = window.tvWidget = new TradingView.widget(widgetOptions);
    widget.onChartReady(function() {
        // 现在可以调用其他widget的方法了
        $("body").delegate(".click-symbol","click",function(){
            console.log("======= click = "+$(this).data("name"));
            //使图表更改商品。 新商品的数据到达后调用回调。
            widget.activeChart().setSymbol($(this).data("name"),() => console.log('new symbol data has arrived: '));
        });
 
        // widget.activeChart().symbolInterval(function(res){
        //     console.log("@@@@@@@@@@@@@@@@@");
        //     console.log(res);
        //
        // })
        /**
         *   //使图表更改分辨率。 新分辨率的数据到达后调用回调。
         widget.activeChart().setResolution($(this).data("name"),() => console.log('new symbol data has arrived: '));
         */
    });
});
 
let _subs  = [];
 
let stream = {
    subscribeBars: function(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) {
 
 
        let channelString   =   symbolInfo.name;
        let newSub          = {
            channelString,
            subscribeUID,
            resolution,
            lastBar: history[symbolInfo.name],
            listener: onRealtimeCallback,
        };
        _subs.push(newSub);
 
 
    },
    unsubscribeBars: function(uid) {
        #注意，这里要把之前订阅的清除掉
        console.log('=====unsubscribeBars uid  ='+uid);
        var subIndex = _subs.findIndex(e => e.subscribeUID === uid)
        if (subIndex === -1) {
            //console.log("No subscription found for ",uid)
            return
        }
        //var sub = _subs[subIndex]
        _subs.splice(subIndex, 1)
    }
};
 
let websocket=null;
let container_body  =   $(".container-body");
 
let SocketFeeds = {
    closesocket(){
        websocket.close();
    },
 
    startWebSocket:(wsUri,connectFunc)=>{
        websocket = new WebSocket(wsUri);
        websocket.onopen = function(evt) { SocketFeeds.onOpen(evt,connectFunc) };
        websocket.onclose = function(evt) { SocketFeeds.onClose(evt) };
        websocket.onmessage = function(evt) { SocketFeeds.onMessage(evt) };
        websocket.onerror = function(evt) { SocketFeeds.onError(evt) };
    },
 
    onOpen:(evt,sendFunc)=> {
        console.log(evt);
        console.log("连接成功，现在你可以发送信息啦！！！");
 
        sendFunc();
    },
 
    onClose:(evt)=>{
        console.log(evt);
        console.log("websocket连接已断开!!!");
        websocket.close();
    },
    onMessage:(evt)=>{
        let res =   JSON.parse(evt.data);
        //console.table(res.Quotes.Quote);
 
       // console.log(res);
        //可能有多个帐号
        res.Quotes.map(el=>{
            let list    =   el.Quote.List;
            if(!list){
                return;
            }
 
            //console.table(list);
            list.map(row => {
                let symbol      =   row.Symbol;
                let price       =   row.Bid;//是别人的接口给得price,全部是bid
                let ask         =   row.Ask;
                let lastTime    =   row.LastTime;
 
                leftData[symbol]={
                    "symbol" : symbol,
                    "bid"    : price,
                    "ask"    : ask
                };
 
                const sub       =   _subs.find(e => e.channelString === symbol);
 
                if(sub){
                    let oldLastBar      =   sub.lastBar;
                    let lastBarTime     =   oldLastBar.time/1000;
                    if(lastTime < (lastBarTime)){
                        return;
                    }
                    let resolution = sub.resolution;
                    if (resolution.includes('D')) {
                        // 1 day in minutes === 1440
                        resolution = 1440;
                    } else if (resolution.includes('W')) {
                        // 1 week in minutes === 10080
                        resolution = 10080;
                    } else if(resolution.includes('M')){
                        resolution  =   43200;
                    }
                    #这里，如果是15分钟的Bar，只要在这15分钟内，则进行累加。这里也被批了。哎
                    let second      = resolution * 60;//秒
                    let rounded     = Math.floor(lastTime / second) * second;
                    let lastBarSec  = lastBarTime ;
                    let _lastBar    = "";
                    if (rounded > lastBarSec) {
                        // create a new candle, use last close as open **PERSONAL CHOICE**
                      _lastBar = {
                            time: lastTime * 1000,
                            open: oldLastBar.close,
                            high: oldLastBar.close,
                            low: oldLastBar.close,
                            close: price,
                        };
                     } else {
                        // update lastBar candle!
                        if (price < oldLastBar.low) {
                            oldLastBar.low = price
                        } else if (price > oldLastBar.high) {
                            oldLastBar.high = price
                        }
 
                        oldLastBar.close   = price;
                        _lastBar = oldLastBar
                    }
                    sub.listener(_lastBar);
                    sub.lastBar =   _lastBar;
                }
            });
            if(leftData){
                let html    =   "";
                for (let key in leftData) {
                    let row = leftData[key];
                    html+='.....';
                }
                container_body.html(html);
            }
        });
       // SocketFeeds.closesocket();
    },
    onError:(evt)=>{
        console.log('发生错误: '+ evt.data);
    },
    sendMsg:(message)=>{
        if (message=='') {
            alert("请先填写发送信息");
            return false;
        }
        if (typeof websocket==="undefined"){
            alert("websocket还没有连接，或者连接失败，请检测");
            return false;
        }
        if (websocket.readyState==3) {
            alert("websocket已经关闭，请重新连接");
            return false;
        }
 
        console.log('你发送的信息:'+ message);
        websocket.send(message);
        return this;
    },
};
 
SocketFeeds.startWebSocket(WS_URL_SUBSCRIBE,connectSend);
function connectSend(){
    let list    =   [];
    exchanges.map(el => {
        list.push({
            Symbol:el
        })
    });
    SocketFeeds.sendMsg('{"BrokerID":1001, "Account": "110462", "Quote": {"List": '+JSON.stringify(list)+'}}');
}