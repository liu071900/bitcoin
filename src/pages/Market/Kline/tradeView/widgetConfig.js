

function widgetConfigFoctory(datafeed,CONTAINER_ID,debug =true,width=900,height=600,locale='zh')
{

    let WIDGET_CONFIG = {
        //商品,必须填写
       symbol:"AAPL",
        //必填，5 代表分钟的K线
        interval:'D',
        //设置图表的初始时间范围
       // timeframe:'1D',
        //id属性为指定要包含widget的DOM元素id。
        container_id:CONTAINER_ID,
        //JavaScript对象的实现接口 JS API 以反馈图表及数据。
        datafeed: datafeed,

        //图表的初始时区
        timezone:"Asia/Shanghai",
        //
        debug:debug,
        library_path:"/",
        width:640,
        height:330,
        style: "1",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "save_image": false,
        "is_hidden_study": false,
        "studies": [
            "Volume@tv-basicstudies",
            "ROC@tv-basicstudies",
            "StochasticRSI@tv-basicstudies",
            "MASimple@tv-basicstudies"        
        ],
        "disabled_features": [
            "save_chart_properties_to_local_storage",
            "volume_force_overlay",
            "header_widget_dom_node",
            "scales_context_menu"
        ],
        "enabled_features": [ "study_templates"],
        "show_popup_button": false,
        "popup_width": "1000",
        "popup_height": "650",
        studies_overrides: {
            "volume.volume.color.0": "#00FFFF",
            "volume.volume.color.1": "#0000FF",
            "volume.volume.transparency": 70,
            "volume.volume ma.color": "#FF0000",
            "volume.volume ma.transparency": 30,
            "volume.volume ma.linewidth": 5,
            "volume.show ma": true,
            "bollinger bands.median.color": "#33FF88",
            "bollinger bands.upper.linewidth": 7
        },
        //布尔值显示图表是否占用窗口中所有可用的空间。
        //fullscreen:true,
        autosize:false,
        //在商品搜索按下键后请求之前，以毫秒为单位延迟。
        //symbol_search_request_delay:500,
        //工具栏背景颜色
        toolbar_bg:'#ffffff',
        locale:locale,
        supports_timescale_marks:false,

    }
    return WIDGET_CONFIG;
}

export default widgetConfigFoctory;