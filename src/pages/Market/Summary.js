/**
 * 交易大厅 顶部显示合约摘要信息的面板
 * 2019-03-15 15:50
 * by liulifu 
 */
import React from 'react';

import TrendNumber from '@/components/Kcex/TrendNumber';

import {trueVariable} from '@/utils/utils';

import styles from './index.less';

class Summary extends React.Component{

    render(){
        let {symbol,latestPrice,indexPrice,changePoint,changePercent,high,low,volumSheet,volumCost, stockSheet,stockValue} = this.props;
        // 初始化
        symbol = trueVariable(symbol,'BTC0222·当周合约');
        latestPrice = trueVariable(latestPrice);
        changePoint = trueVariable(changePoint);
        changePercent = trueVariable(changePercent);
        let deliveryDt = 25;
        let changeColor = '#999999';

        changePercent>0?(changeColor='#25B36A'):(changeColor='#F25C48');

        return(<div style={{display:'flex'}} className={styles.summary}>

            {/* 合约名称和合约交割日期 */}
            <div style={{height:60,lineHeight:'60px'}}>
                <span style={{color:'#333333',fontSize:18,fontWeight:600}}>{symbol}</span>
                <span style={{color:'#999999',fontSize:12,paddingLeft:10}}>{`距离交割还有${deliveryDt}天`}</span>
            </div>

            <div>
                <table style={{height:'80%',position:'relative',top:5,marginLeft:20}}>
                    <tbody>
                        <tr style={{fontSize:12,color:'#999999'}}>
                            <td style={{width:50}}>最新价</td>
                            <td style={{width:50}}>指数价</td>
                            <td style={{width:100}}>24h涨跌</td>
                            <td style={{width:60}}>24h最高价</td>
                            <td style={{width:60}}>24h最低价</td>
                            <td style={{width:160}}>24h成交量</td>
                            <td style={{width:160}}>持仓量</td>
                        </tr>
                        
                        <tr>
                            <td><TrendNumber value={latestPrice}/></td>
                            <td><span>{indexPrice}</span></td>
                            <td style={{color:changeColor}}>
                                <span style={{width:46,display:'inline-block'}}>{changePoint}</span>
                                <span style={{width:50,display:'inline-block'}}>{changePercent}</span>
                            </td>
                            <td>{high}</td>
                            <td>{low}</td>
                            <td style={{fontSize:12}}>
                                <span>{`${volumSheet} 张`}</span>
                                <span>{`≈ ${volumSheet} BTC`}</span>
                            </td>
                            <td style={{fontSize:12}}>
                                <span>{`${stockSheet} 张`}</span>
                                <span>{`≈ ${stockValue} BTC`}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>)
    }
}

export default Summary;