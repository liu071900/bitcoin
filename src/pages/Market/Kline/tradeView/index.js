/**
 * @brief：K线图和深度图相关
 * @auth:liulifu
 * 
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import widgetConfigFoctory from './widgetConfig';

import { UDFCompatibleDatafeed } from './datafeed/udf-compatible-datafeed.js';
import classNames from 'classnames';
import styles from './chart.less';
import DataFeed from './datafeed/index';
import { LocalCache } from '@/utils/cache';
import {connect} from 'dva';

import DeepChart from './DeepChart';//深度图组件

//K线图容器组件id
const CONTAINER_ID = 'tradingview-widget';

const XYcolor = '#778094';

// @connect(({ market, user, order }) => ({
//   symbol: market.symbol,
//   //价格精度
//   pricePrecision: market.pricePrecision,
//   //数量精度
//   qtyPrecision: market.qtyPrecision,
// }))
export default class TradingViewWidget extends Component {
  containerId = `${CONTAINER_ID}-${Math.random()}`;

  constructor(props) {
    super(props);
    const cache = new LocalCache();
    let klineType = cache.getKey('market', 'kline.type', 's');
    let klineInterval = cache.getKey('market', 'kline.interval', 1);
    let minutesValue,hoursValue =null;
    if (klineType === 'm') {
      minutesValue = klineInterval;
    } else if (klineType === 'h') {
      hoursValue = klineInterval;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }
    //技术指标线，MA均线。
    this.studies = [];
    this.state = {
      loaded: false,
      map: 1,
      time: '1D',
      chartType: 1,// 1.k线图 2.深度图
      interval: klineInterval,
      intervalType: klineType,//
      minutesValue: minutesValue,
      hoursValue: hoursValue,
      minutesToggleUp: false,
      hoursToggleUp: false,
    };
  }

  componentWillReceiveProps(nprops){
    let {symbol,pricePrecision,qtyPrecision} = nprops;
    this.changeSymbol(symbol,pricePrecision,qtyPrecision)
  }


  //根据 周期类型(type)，周期值(v) 转换为tradingview的interval
  toTradeingViewInterval(type,v){
    if(type==='s'){
      return '1'
    }else if(type==='m'){
      return v.toString()
    }else if(type==='h'){
      return (Number(v) *60).toString()
    }else if(type==='d'){
      return v+'D'
    }else if(type==='w'){
      return v+'W'
    }else if(type==='M'){
      return v+'M'
    }
  } 

  changeSymbol(symbol,pricePrecision,qtyPrecision){
    if(!this.widget || !this.datafeed)return;
    const cache = new LocalCache();
    let klineType = cache.getKey('market', 'kline.type', 's');
    let klineInterval = cache.getKey('market', 'kline.interval', 1);
    let interval = this.toTradeingViewInterval(klineType,klineInterval);
    this.datafeed.setSymbol(symbol,Math.pow(10,pricePrecision),qtyPrecision);
    this.widget.setSymbol(symbol,interval);
  }

  changeInterval(type, v){    
    //
    const cache = new LocalCache();
    cache.setKey('market', 'kline.type', type);
    cache.setKey('market', 'kline.interval', v);
    if(!this.widget)return;
    //1.修改选项卡相关
    if (type === 's') {
      //线形图
      this.widget.chart().setResolution('1');
      this.widget.chart().setChartType(3);
      //this.widget.chart().removeAllStudies();
      this.setState({ minutesValue: null, hoursValue: null });
    } else if (type === 'm') {
      //设置为K线图
      //this.widget.setSymbol(symbol,v);
      this.widget.chart().setChartType(1);
      this.widget.chart().setResolution(v.toString());
      this.widget.chart().resetData();
      this.setState({ minutesValue: v, hoursValue: null });
      //显示设置面板
      //this.widget.chart().executeActionById('insertIndicator');
    } else if (type === 'h') {
      this.widget.chart().setChartType(1);
      this.widget.chart().setResolution((v*60).toString());
      this.setState({ hoursValue: v, minutesValue: null });
    } else if(type==='d'){
      this.widget.chart().setChartType(1);
      this.widget.chart().setResolution((v+'D').toString());
      this.setState({ hoursValue: null, minutesValue: null });
    }
    this.setState({
      intervalType: type,
      interval: v,
      hoursToggleUp: false,
      minutesToggleUp: false,
    });

  }

  changeToggle(type) {
    if (type === 'h') {
      this.setState({ hoursToggleUp: !this.state.hoursToggleUp, minutesToggleUp: false });
    } else {
      this.setState({ minutesToggleUp: !this.state.minutesToggleUp, hoursToggleUp: false });
    }
  }


  startKline = () => {
    //从缓存中获取symbol
    const cache = new LocalCache();
    let symbol = cache.getKey('market', 'symbol', 'BTC/USDT');
    let klineType = cache.getKey('market', 'kline.type', 's');
    let klineInterval = cache.getKey('market', 'kline.interval', 1);
    let pricePrecision = cache.getKey('market', 'symbol.pricePrecision', 8);
    let qtyPrecision = cache.getKey('market', 'symbol.qtyPrecision', 3);

    let interval = this.toTradeingViewInterval(klineType,klineInterval);
    console.log('=============!!!!!!!!!!==============')
    console.log(interval,klineType,klineInterval)
    const TradingView = window.TradingView;
    const tradeView = document.getElementById(this.containerId);

    let bgColor = '#ffffff';

    //symbol, timezone = 'Asia/Shanghai', pricescale = 1000
    const datafeed = new DataFeed(symbol,Math.pow(10,pricePrecision),qtyPrecision);

    this.datafeed = datafeed;
    if (!tradeView) return;

    const widget = new TradingView.widget({
      disabled_features: [
        'volume_force_overlay',
        'hide_left_toolbar_by_default',
        'go_to_date',
        'use_localstorage_for_settings',
        'save_chart_properties_to_local_storage',
        'header_widget',
        'main_series_scale_menu',
        'adaptive_logo',
        'show_logo_on_all_charts',
        'display_market_status',
        'timeframes_toolbar',
        'chart_property_page_background',
      ],
      toolbar_bg: 'transparent',
      library_path: '/',
      //custom_css_url: '/override.css',
      width: '100%',
      height: '100%',

      timezone: 'Asia/Shanghai',
      //symbol
      symbol: symbol,
      // ...marketCode ? { symbol: marketCode } : {},
      interval: interval,
      
      container_id: this.containerId,
      overrides: {
        //----------------------paneProperties--------------------------------
        //是否默认展开均线的提示信息
        'paneProperties.legendProperties.showLegend': false,
        //图标背景颜色
        'paneProperties.background': bgColor,
        //网格线的颜色
        'paneProperties.vertGridProperties.color': '#f0f0f0',
        'paneProperties.horzGridProperties.color': '#f0f0f0',
        //十字线的颜色
        'paneProperties.crossHairProperties.color': '#989898',
        //K线图 边距
        'paneProperties.topMargin': '20',
        'paneProperties.bottomMargin': '20',
        //-----------------------scalesProperties-------------------------------
        //显示左边的 缩略价格
        'scalesProperties.showLeftScale': false,
        //轴线的颜色
        'scalesProperties.lineColor': '#F0F0F0', //#F0F0F0
        //右侧显示价格的文字颜色
        'scalesProperties.textColor': '#999999',
        //-----------volume的大小 large,medium,small,tiny
        volumePaneSize: 'small',

        //----------k线种类
        'mainSeriesProperties.style': 1,

        //---------面积图样式覆盖 ，
        'mainSeriesProperties.areaStyle.color1': 'rgba(0,0,0,0.1)', // "#3278DD",
        'mainSeriesProperties.areaStyle.color2': '#ffffff', // "#3278DD",
        'mainSeriesProperties.areaStyle.linecolor': '#9194a4',

        //------------------------k线图样式覆盖
        //涨蜡烛 内部颜色
        'mainSeriesProperties.candleStyle.upColor': '#25B36A',
        'mainSeriesProperties.candleStyle.borderUpColor': '#25B36A',
        'mainSeriesProperties.candleStyle.wickUpColor': '#25B36A',
        'mainSeriesProperties.candleStyle.downColor': '#F25C48',
        'mainSeriesProperties.candleStyle.borderColor': '#F25C48',
        'mainSeriesProperties.candleStyle.borderDownColor': '#F25C48',
        'mainSeriesProperties.candleStyle.wickDownColor': '#F25C48',
        // 'compare.plot.color': '#000000',
        // 'volume.volume.color.0': '#25B36A',
        // 'volume.volume.color.1': '#F25C48',
        // 'volume.volume.transparency': 75,
        // 'volume.options.showStudyArguments': false,
      },
      studies_overrides: {
        'compare.plot.color': '#000000',
        'volume.volume.color.0': '#F25C48',
        'volume.volume.color.1': '#25B36A',
        'volume.volume.transparency': 75,
        // 'volume.options.showStudyArguments': false,
      },

      loading_screen: { backgroundColor: bgColor },

      datafeed: datafeed,
      locale: 'zh',
    });
    try {
      widget.onChartReady(() => {
        if (widget) {
          this.widget = widget;
          // this.ApplayPromiseList.forEach(item => item())

          // this.changeState({ loaded: true })

          //this.widget.chart().executeActionById('drawingToolbarAction')

          //添加均线
          this.widget.chart().dataReady(() => {
            this.studies.push(
              this.widget.chart().createStudy('Moving Average', false, false, [7, 'close'], null, {
                'Plot.color': '#f4a605',
              })
              // .createStudy('Moving Average', false, false, [7, 'close', 0], null, {
              //   'Plot.color': '#f4a605',
              // })
            );
            this.studies.push(
              this.widget.chart().createStudy('Moving Average', false, false, [25, 'close'], null, {
                'Plot.color': '#ea06f2',
              })
              // .createStudy('Moving Average', true, false, [30, 'close', 0], null, {
              //   'Plot.color': '#ea06f2',
              // })
            );
            this.studies.push(
              this.widget.chart().createStudy('Moving Average', false, false, [60, 'close'], null, {
                'Plot.color': 'rgb(37, 179, 106)',
              })
              // createStudy('Moving Average', true, false, [60, 'close', 0], null, {
              //   'Plot.color': 'rgb(37, 179, 106)',
              // })
            );
          })

          //切换到分时图
          //this.widget.chart().setChartType(3);
          // //隐藏marks
          // this.widget.chart().clearMarks();
          // //隐藏均线图
          // this.studies.forEach(id => {
          //   //console.log(this.widget.chart().getStudyById(id).setVisible(false))
          //   // this.widget.chart().getStudyById(id).setUserEditEnabled(false)
          //   //this.widget.chart().setEntityVisibility(id, false)
          // });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  startDeepChart = () => {
    // ReactDOM.render(DeepChart(),document.getElementById('kcex-deepChart'))
    // var deepchart = new DeepChart('kcex-deepChart',640,360)
    // deepchart.setUp('price','amount');
    // deepchart.render()
  };

  componentDidMount() {
    this.startKline();
    this.startDeepChart();
  }

  render() {
    return (
      <div>
        {/* 图标工具栏 */}
        <div
          style={{
            height: 40,
            width: '100%',
            padding: '8px 8px 8px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#F5F5F5',
            boxShadow: 'inset 0 -1px 0 0 #E6E6E6',
          }}
        >
          {/* K线图切换选项卡 */}

          <ul
            className={classNames({
              [styles.listItems]: true,
              [styles.listItemsHide]: this.state.chartType === 2,
            })}
          >
            {/* 分时按钮 */}
            <li
              className={classNames({
                [styles.listItem]: true,
                [styles.listItemActive]: this.state.intervalType === 's',
              })}
              onClick={this.changeInterval.bind(this, 's', 60)}
            >
              <span className="span-padding4">分时</span>
            </li>

            {/* 分钟按钮 */}
            <li
              className={classNames({
                [styles.listItem]: true,
                [styles.kToggle]: true,
                [styles.kToggleUp]: this.state.minutesToggleUp,
                [styles.listItemActive]: this.state.intervalType === 'm',
              })}
              onClick={this.changeToggle.bind(this, 'm')}
              style={{ position: 'relative' }}
            >
              <span className="span-padding4" style={{ marginRight: 7 }}>
                {this.state.minutesValue ? `${this.state.minutesValue}分钟` : '分钟'}
              </span>
              {this.state.minutesToggleUp ? (
                <ul className={styles.listSelect}>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'm', 1)}
                  >
                    <span className="span-padding4">1分</span>
                  </li>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'm', 3)}
                  >
                    <span className="span-padding4">3分</span>
                  </li>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'm', 5)}
                  >
                    <span className="span-padding4">5分</span>
                  </li>

                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'm', 15)}
                  >
                    <span className="span-padding4">15分</span>
                  </li>

                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'm', 30)}
                  >
                    <span className="span-padding4">30分</span>
                  </li>
                </ul>
              ) : null}
            </li>
            {/* 小时按钮 */}
            <li
              className={classNames({
                [styles.listItem]: true,
                [styles.kToggle]: true,
                [styles.kToggleUp]: this.state.hoursToggleUp,
                [styles.listItemActive]: this.state.intervalType === 'h',
              })}
              onClick={this.changeToggle.bind(this, 'h')}
              style={{ position: 'relative' }}
            >
              <span className="span-padding4" style={{ marginRight: 7 }}>
                {this.state.hoursValue ? `${this.state.hoursValue}小时` : '小时'}
              </span>

              {this.state.hoursToggleUp ? (
                <ul className={styles.listSelect}>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'h', 1)}
                  >
                    <span className="span-padding4">1小时</span>
                  </li>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'h', 2)}
                  >
                    <span className="span-padding4">2小时</span>
                  </li>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'h', 4)}
                  >
                    <span className="span-padding4">4小时</span>
                  </li>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'h', 6)}
                  >
                    <span className="span-padding4">6小时</span>
                  </li>
                  <li
                    className={styles.listOptions}
                    onClick={this.changeInterval.bind(this, 'h', 12)}
                  >
                    <span className="span-padding4">12小时</span>
                  </li>
                </ul>
              ) : null}
            </li>
            {/* 日k */}
            <li
              className={classNames({
                [styles.listItem]: true,
                [styles.listItemActive]: this.state.intervalType === 'd',
              })}
              onClick={this.changeInterval.bind(this, 'd', 1)}
            >
              <span className="span-padding4">日线</span>
            </li>

            {/* 周k */}
            <li
              className={classNames({
                [styles.listItem]: true,
                [styles.listItemActive]: this.state.intervalType === 'w',
              })}
              onClick={this.changeInterval.bind(this, 'w', 1)}
            >
              <span className="span-padding4">周线</span>
            </li>

            {/* 月k */}
            <li
              className={classNames({
                [styles.listItem]: true,
                [styles.listItemActive]: this.state.intervalType === 'M',
              })}
              onClick={this.changeInterval.bind(this, 'M', 1)}
            >
              <span className="span-padding4">月线</span>
            </li>
          </ul>
          {/* 图表类型切换 */}
          <ul className={classNames({ [styles.listItems]: true })}>
            <li
              onClick={() => {
                this.setState({ chartType: 1 });
              }}
              className={classNames({
                [styles.listItem]: true,
                [styles.listItemActive]: this.state.chartType === 1,
              })}
            >
              <span className="span-padding4">TradingView</span>
            </li>
            <li
              onClick={() => {
                this.setState({ chartType: 2 });
              }}
              className={classNames({
                [styles.listItem]: true,
                [styles.listItemActive]: this.state.chartType === 2,
              })}
              style={{ marginLeft: 4 }}
            >
              <span className="span-padding4">深度图</span>
            </li>
          </ul>
        </div>

        {/* 图表部分 */}
        <div className={styles.chartArea}>
          <article
            id={this.containerId}
            className={classNames({ [styles.chartActive]: this.state.chartType === 1 })}
          />

          <article
            id="kcex-deepChart"
            className={classNames({ [styles.chartActive]: this.state.chartType === 2 })}
          >
            <DeepChart />
          </article>
        </div>
      </div>
    );
  }
}
