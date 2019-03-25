/**
 * 交易大厅界面 布局
 * 2019-03-15 15:50
 * by liulifu 
 */

import React from 'react';

import Summary from './Summary';

import Symbols from './Symbols';
import AssetPan  from './Asset';
import AccountPan from './Account';


import KlineCharts from './Kline/Kline';
import TradePan from './TradePan';

import TradeHistory from './TradeHistory';
import OrderBook from './OrderBook';

import OrderList from './Orderlist';

import styles from './index.less';



class Market extends React.Component{
    render(){
        return(<div style={{height:1200}}>
            {/* 顶部摘要信息 */}
            <Summary/>
            {/* content */}
            <div className={styles.marketMainContainer}>
                {/* 左边面板 */}
                <div style={{width:300,height:500}}>
                    <Symbols/>
                    <AssetPan/>
                    <AccountPan/>
                </div>
                {/* 中部面板 */}
                <div style={{width:640,marginLeft:10}}>
                    <KlineCharts/>
                    <TradePan/>
                </div>
                {/* 右部面板 */}
                <div style={{width:300,marginLeft:10,height:500}}>
                    <TradeHistory/>
                    <OrderBook/>
                </div>
            </div>

            {/* 委托订单等信息 */}
            <div>
                <OrderList/>
            </div>

        </div>)
    }
}

export default Market;