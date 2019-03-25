/**
 * 最新成交面板
 * 2019-03-07 10:28
 * by liulifu 
 */
import React from 'react';
import {Icon,Tooltip,Switch} from 'antd';
import styles from './index.less';

class TradeHistory extends React.Component{

    render(){
        const history=[{
            price:3822.07,
            qty:500,
            time:'17:00:00',
            side:1

        },
        {
            price:3822.07,
            qty:500,
            time:'17:00:00',
            side:2

        },
        {
            price:3822.07,
            qty:500,
            time:'17:00:00',
            side:1
        },
        ]


       return(<div style={{backgroundColor:'#ffffff',height:400}}>
           <div className={styles.titleHead}>最新成交</div>

           <ul className={styles.ulTableList}>
                    <li className={styles.tableHead}>
                        <span style={{width:70}}>价格(USD)</span>
                        <span style={{width:60}}>数量(张)</span>
                        <span style={{width:70}}>时间</span>
                    </li>
            </ul>

            <ul className={styles.ulTableList} style={{fontSize:12}}>
                    {
                        history.map((item,index)=>{
                            let {price,qty,time,side} = item;
                            return<li key={index} style={{height:30,lineHeight:'30px'}} >
                                        <span style={{width:70}}>{price}</span>
                                        <span style={{width:60}}>{qty}</span>
                                        <span style={{width:70}}>{time}</span>
                                    </li>
                        })
                    }
            </ul>
       </div>)
    }
}

export default TradeHistory;