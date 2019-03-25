/**
 * 合约品种列表 
 * 2019-03-06 
 * by liulifu 
 */
import React from 'react';
import styles from './index.less';

import SortIcon from '@/components/Kcex/SortIcon';

class Symbols extends React.Component{
    render(){
        const symbolList=[{
            name:'BTC222.当周',
            price:'3998.20',
            change:0.94
        },{
            name:'BTC222.当月',
            price:'3998.20',
            change:-0.94
        },{
            name:'ETH222.当周',
            price:'3998.20',
            change:-0.94
        },
        ]
        return(<div style={{height:260,backgroundColor:'#ffffff'}}>
                <div className={styles.titleHead} style={{fontSize:14,fontWeight:600}}>合约信息</div>
                <ul className={styles.ulTableList}>
                    <li className={styles.tableHead}>
                        <span style={{width:90}}>合约</span>
                        <span style={{width:60}}><SortIcon text='最新价'/></span>
                        <span style={{width:60}}> <SortIcon text='涨跌幅'/></span>
                    </li>
                </ul>

                <ul className={styles.ulTableList}>
                    {
                        symbolList.map((item,index)=>{
                            let {name,price,change} = item;
                            
                            return<li key={name} style={{height:30,lineHeight:'30px'}} >
                                        <span style={{width:90}}>{name}</span>
                                        <span style={{width:60}}>{price}</span>
                                        <span style={{width:60}}>{change}</span>
                                    </li>
                        })
                    }
                </ul>
                
            </div>)
    }
}

export default Symbols;