/**
 * 交易面板
 * 2019-03-07 10:18
 * by liulifu 
 */
import React from 'react';
//import { InputNumber } from 'antd';
import { Button} from 'antd';

import TabNav from '@/components/Kcex/TabNav';
import styles from './index.less';
import InputNumberItem from '@/components/Kcex/InputNumberItem';
import { Tooltip,Input,Switch } from 'antd';



class TradePan extends React.Component{
    onInput(v){
        console.log(v)
    }

    render(){
        let items = [{
            key:'kai',
            text:'开仓'
        },{
            key:'ping',
            text:'平仓'
        }]

       return(<div style={{backgroundColor:'#ffffff',height:370,marginTop:10}}>
                <div className={styles.titleHead}>
                    <TabNav items={items} defaultKey='kai'/>
                </div>
                 
                <div>
                    <div>
                        <div style={{fontSize:14,color:'#333333',fontWeight:600}}>BTC0222·当周</div>
                        <div style={{fontSize:12,color:'#999999'}}>
                            <span>可用余额:</span>
                            <span>0 BTC</span>
                            <button style={{float:'right'}}>资金划转</button>
                        </div>
                    </div>

                    {/* 开仓面板 */}
                    <div style={{display:'flex',width:'100%'}}>
                        {/* 买入做多 */}
                        <div style={{width:'50%',paddingLeft:20}}>
                            <InputNumberItem lable='买入价' hasSuffix={true}/>
                                    
                            <InputNumberItem lable='买入量'/>

                            <div style={{display:'flex',justifyContent:'space-between',width:290,marginTop:10}}>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>25%</button>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>50%</button>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>75%</button>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>100%</button>
                            </div>
                                
                            <div style={{fontSize:12,marginTop:12,width:290}}>
                                <span style={{color:'#BBBBBB'}}>≈ 0 BTC</span>
                                <span style={{float:'right',color:"#25B36A"}}>可开多：3,600 张</span>
                            </div>
                            <div style={{marginTop:12}}>
                                <Button 
                                loading = {false}
                                style={{backgroundColor:'#25B36A',color:'#ffffff',width:290,height:32,fontSize:12}}>买入做多(看涨)</Button>
                            </div>
                        </div>

                        {/* 开仓做空面板  */}
                        <div style={{width:'50%',paddingLeft:10}}>
                            <InputNumberItem lable='买入价'/>
                                    
                            <InputNumberItem lable='买入量'/>

                            <div style={{display:'flex',justifyContent:'space-between',width:290,marginTop:10}}>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>25%</button>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>50%</button>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>75%</button>
                                    <button className='kcex-borderBtn' style={{width:60,height:24}}>100%</button>
                            </div>
                                
                            <div style={{fontSize:12,marginTop:12,width:290}}>
                                <span style={{color:'#BBBBBB'}}>≈ 0 BTC</span>
                                <span style={{float:'right',color:"#25B36A"}}>可开多：3,600 张</span>
                            </div>

                            <div style={{marginTop:12}}>
                                <Button 
                                loading = {false}
                                style={{backgroundColor:'#F25C48',color:'#ffffff',width:290,height:32,fontSize:12}}>卖出做空（看跌）</Button>
                            </div>

                        </div>

                    </div>

                    
                </div>
                
       </div>)
    }

}

export default TradePan;