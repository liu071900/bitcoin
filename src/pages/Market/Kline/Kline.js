/**
 * K线图深度图相关
 * 2019-03-07 10:18
 * by liulifu 
 */
import React, { Component } from 'react';
import TradingViewWidget from './tradeView/index';

class KlineCharts extends React.Component{

    render(){
       return(<div style={{backgroundColor:'#ffffff',height:400}}>
           <TradingViewWidget />
       </div>)
    }
}

export default KlineCharts;