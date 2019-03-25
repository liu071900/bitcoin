/**
 * 显示用户的资产信息 
 * 2019-03-06 17：16
 * by liulifu 
 */
import React from 'react';
import styles from './index.less';
class AssetPan extends React.Component{
    render(){
       return(<div style={{marginTop:10,backgroundColor:'#ffffff',height:130}}>

           <div className={styles.titleHead}>
                <span style={{fontSize:14,fontWeight:600}}>我的资产</span>
                <span style={{fontSize:12,color:'#999999',float:'right',textDecoration:'underline',cursor:"pointer",paddingRight:10}}>13333 BTC</span>
           </div>

            <div style={{height:90,display:'flex',paddingTop:26}}>
                <div style={{width:'50%',paddingLeft:20}}>
                    <p style={{margin:0}}>钱包账户(BTC)</p>
                    <p style={{margin:0}}>60.0024</p>
                </div>
                <div style={{width:'50%'}}>
                    <p style={{margin:0}}>合约账户(BTC)</p>
                    <p style={{margin:0}}>160.0024</p>
                </div>
            </div>
       </div>)
    }
}

export default AssetPan;