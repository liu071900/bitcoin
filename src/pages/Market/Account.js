/**
 * 显示用户的合约账户信息
 * 2019-03-06 17:35
 * by liulifu 
 */
import React from 'react';
import styles from './index.less';
import {Icon,Tooltip,Switch} from 'antd';

class AccountPan extends React.Component{

    render(){
       return(<div style={{marginTop:10,backgroundColor:'#ffffff',height:370}}>
           <div className={styles.titleHead}>
                <span style={{fontSize:14,fontWeight:600}}>
                    <span style={{marginRight:4}}>合约账户</span>
                    <Tooltip title="prompt text" >
                        <Icon type="exclamation-circle" style={{cursor:'pointer'}}/>
                    </Tooltip>
                </span>
                
                <span style={{float:'right',fontSize:12,color:'#999999',paddingRight:10}}>
                    <span style={{paddingRight:10}}>自动追加保证金</span>
                    <Switch size="small"/>
                </span>
          </div>

            
            
       </div>)
    }
}

export default AccountPan;