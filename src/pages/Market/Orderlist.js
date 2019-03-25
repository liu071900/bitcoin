/**
 * 委托单列表 面板
 * creat at 2019-03-07 10:29
 * by liulifu 
 */
import React from 'react';
import {Icon,Tooltip,Switch} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import TabNav from '@/components/Kcex/TabNav';
import styles from './index.less';
class OrderList extends React.Component{
    
    renderThumb({ style, ...props }){
        const thumbStyle = {
          width: 3,
          backgroundColor: 'rgba(100, 100, 100,0.4)',
          right: '-3px',
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    }

    render(){
        let items = [{
            key:'currentHold',
            text:'持有仓位'
        },{
            key:'currentOrder',
            text:'当前委托'
        },{
            key:'historyOrder',
            text:'历史委托'
        },{
            key:'historyRecord',
            text:'成交记录'
        }];

        let datas=[{
            symbol:'BTC当月·多',
            vol:'200/200',
            avgPrice:'3875.05',
            holdPrice:'3875.05',
            baozhengjin:5555,
            weishixianyinkui:'+0.1270 / 50%',
            yishixianyinkui:'-0.0270',
        }]
       return(<div style={{backgroundColor:'#ffffff',height:300,marginTop:10}}>
            <div className={styles.titleHead}>
                <TabNav items={items} defaultKey='currentHold'/>
            </div>

            <div>
                {/* 当前委托 */}
                <div>
                    <ul className={styles.ulTableList}>
                        <li className={styles.tableHead} >
                            <span style={{width:80}}>合约</span>
                            <span style={{width:75}}>可平/仓位(张)</span>
                            <span style={{width:80}}>开仓均价(USD)</span>
                            <span style={{width:80}}>持仓均价(USD)</span>
                            <span style={{width:90}}>持仓保证金(BTC)</span>
                            <span style={{width:150}}>未实现盈亏(BTC)/回报率%</span>
                            <span style={{width:90}}>已实现盈亏(BTC)</span>
                            <span style={{width:190}}>平仓</span>
                        </li>
                    </ul>
                    <Scrollbars
                    style={{ width: '100%', height: 300, corsur: 'pointer' }}
                    renderThumbVertical={this.renderThumb}>
                        <div>

                            <ul className={styles.ulTableList} style={{fontSize:12}}>
                                {datas.map((item, index) => {
                                    let {symbol,vol,avgPrice,holdPrice,baozhengjin,weishixianyinkui,yishixianyinkui} = item;
                                    return <li key={index} style={{height:40,lineHeight:'40px',position:'relative'}} >
                                        <span style={{width:80}}>{symbol}</span>
                                        <span style={{width:75}}>{vol}</span>
                                        <span style={{width:80}}>{avgPrice}</span>
                                        <span style={{width:80}}>{holdPrice}</span>
                                        <span style={{width:90}}>{baozhengjin}</span>
                                        <span style={{width:150}}>{weishixianyinkui}</span>
                                        <span style={{width:90}}>{yishixianyinkui}</span>
                                        <span style={{width:190}}>
                                            <a style={{width:'60px',height:24,display:'inline-block',lineHeight:'24px',marginRight:2,backgroundColor:'#F5F6FA'}}>限价平仓</a>
                                            <a style={{width:'60px',height:24,display:'inline-block',lineHeight:'24px',marginRight:2,backgroundColor:'#F5F6FA'}}>市价平仓</a>
                                            <a style={{width:'60px',height:24,display:'inline-block',lineHeight:'24px',marginRight:2,backgroundColor: '#F5F6FA'}}>市价全平</a>
                                        </span>
                                    </li>
                                })}
                            </ul>
                            
                        </div>
                    </Scrollbars>

                </div>
            </div>

       </div>)
    }
}

export default OrderList;