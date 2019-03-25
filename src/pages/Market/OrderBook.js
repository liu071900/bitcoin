/**
 * 订单薄 面板
 * creat at 2019-03-07 10:29
 * by liulifu 
 */
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import {Icon,Tooltip,Switch} from 'antd';
import styles from './index.less';

class OrderBook extends React.Component{

    renderThumb({ style, ...props }) {
        const thumbStyle = {
          width: 3,
          backgroundColor: 'rgba(100, 100, 100,0.4)',
          right: '-3px',
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    }

    render(){
        const bids=[{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},]
        const asks=[{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},{price:38822,qty:200,total:200},]

       return(<div style={{backgroundColor:'#ffffff',height:370,marginTop:10}}>
            <div className={styles.titleHead} >

                <span>
                    <span style={{fontSize:14,color:'#333333',fontWeight:600}}>最新价</span>
                    <span>25.05</span>
                </span>

                <span>
                    <span style={{fontSize:14,color:'#333333',fontWeight:600}}>指数价</span>
                    <span>25.05</span>
                </span>

                <span style={{float:'right',paddingRight:10}}>
                    复位
                </span>
            </div>

            <ul className={styles.ulTableList}>
                    <li className={styles.tableHead}>
                        <span style={{width:70}}>价格(USD)</span>
                        <span style={{width:60}}>数量(张)</span>
                        <span style={{width:70}}>累计(张)</span>
                    </li>
            </ul>
            <Scrollbars
            style={{ width: '100%', height: 300, corsur: 'pointer' }}
            renderThumbVertical={this.renderThumb}>
                <div>

                    <ul className={styles.ulTableList} style={{fontSize:12}}>
                        {bids.map((item, index) => {
                            let {price,qty,total} = item;
                            return <li key={index} style={{height:20,lineHeight:'20px',position:'relative'}} >
                                <span style={{width:70,color:'#F25C48'}}>{price}</span>
                                <span style={{width:60}}>{qty}</span>
                                <span style={{width:70}}>{total}</span>
                                <span style={{width:'100%',position:'absolute',backgroundColor:'rgb(242, 92, 72)',opacity:0.08,pointerEvents:'none',right:0,top:1,height:18}}>
                                </span>
                            </li>
                        })}
                    </ul>
                    <div style={{height:1,backgroundColor:'#E6E6E6',margin:'4px 0 4px 0'}}></div>
                    <ul className={styles.ulTableList} style={{fontSize:12}}>
                        {asks.map((item, index) => {
                            let {price,qty,total} = item;
                            return <li key={index} style={{height:20,lineHeight:'20px',position:'relative'}} >
                                <span style={{width:70,color:'#25B36A'}}>{price}</span>
                                <span style={{width:60}}>{qty}</span>
                                <span style={{width:70}}>{total}</span>
                                <span style={{width:'100%',position:'absolute',backgroundColor:'rgb(37, 179, 106)',opacity:0.08,pointerEvents:'none',right:0,top:1,height:18}}>
                                </span>
                            </li>
                        })}
                    </ul>
                </div>
          </Scrollbars>
       </div>)
    }
}

export default OrderBook;