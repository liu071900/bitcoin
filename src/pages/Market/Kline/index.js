/**
 * K线图深度图相关
 * 2019-03-07 10:18
 * by liulifu 
 */

import React, { Component } from 'react';
import TradingViewWidget from './tradeView/index';

class CandleChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TradingViewWidget />
      </div>
    );
  }
}

export default CandleChart;
