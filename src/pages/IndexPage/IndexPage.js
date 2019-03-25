/**
 * 首页
 * 2019-03-19 15:23
 * by liulifu 
 */
import React from 'react';
import styles from './IndexPage.less';
import { Carousel } from 'antd';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';

import png1 from '@/assets/banner/list1.png';
import png2 from '@/assets/banner/list2.png';
import png3 from '@/assets/banner/list3.png';
import png4 from '@/assets/banner/list4.png';



const data = [
    {
      year: "1991",
      value: 15468
    },
    {
      year: "1992",
      value: 16100
    },
    {
      year: "1993",
      value: 15900
    },
    {
      year: "1994",
      value: 17409
    },
    {
      year: "1995",
      value: 17000
    },
    {
      year: "1996",
      value: 31056
    },
    {
      year: "1997",
      value: 31982
    },
    {
      year: "1998",
      value: 32040
    },
    {
      year: "1999",
      value: 33233
    }
  ];

class IndexPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activeKey:'BTC'
        }
    }

    switchNav(key){
        this.setState({
            activeKey:key
        })
    }
    render(){
        let {activeKey} = this.state;
        const cols = {
            value: {
              min: 1
            },
            year: {
              range: [0, 1]
            }
          };
       return(<div style={{backgroundColor:'#ffffff'}}>
            
            <div className={styles.content}>
                
                {/* 轮播图和宣传语相关 */}
                <div className={styles.banner} style={{paddingTop:30}}>
                    <div >
                        <p style={{fontSize:18,margin:0,height:25,lineHeight:'25px'}}>安全 稳定 专业</p>
                        <p style={{fontSize:32,margin:'4px 0 0 0',height:45,lineHeight:'45px'}}>全球首个聚合多家数字资产交易平台</p>
                    </div>

                    {/* 轮播图片 */}
                    <div style={{width:1200,marginTop:30}}>
                        <Carousel vertical adaptiveHeight={true}>
                            <div>
                                <div style={{display:'flex'}}>
                                        <div className={styles.bannerItem}>
                                            <a>
                                                <img src={png1} height='100%' width='100%'></img>
                                            </a>
                                        </div>
                                        <div className={styles.bannerItem}>
                                            <a>
                                                <img src={png2} height='100%' width='100%'></img>
                                            </a>
                                        </div>
                                        <div className={styles.bannerItem}>
                                            <a>
                                                <img src={png3} height='100%' width='100%'></img>
                                            </a>
                                        </div>
                                        <div className={styles.bannerItem}>
                                            <a>
                                                <img src={png4} height='100%' width='100%'></img>
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
                
                <div style={{marginTop:36,backgroundColor:'rgba(0,0,0,0.3)',userSelect:'none'}}>
                    <div style={{width:1200,margin:'0 auto',height:40,lineHeight:'40px'}}>

                        <span style={{color:'#649AEA',marginRight:20}}>公告</span>
                        <span style={{color:'rgba(255,255,255,0.60)',marginRight:10}}>KCEX关于调整币币交易币对最小精度的公告</span>
                        <span style={{color:'rgba(255,255,255,0.40)'}}>更多</span>
                    </div>
                </div>
            </div>

            {/* tab 选项切换 */}
            <div style={{height:40,lineHeight:'40px',backgroundColor:'#ffffff',boxShadow:'-1px 1px 5px 0px rgba(0, 0, 0, 0.1)'}}>
                    <ul className={styles.tabContainer} style={{width:160,margin:'0 auto'}}>
                      
                      <li className={`${styles.tabItem} ${activeKey==='BTC'?styles.activeTabItem:'' }`} 
                      onClick = {this.switchNav.bind(this,'BTC')}
                      style={{width:80,textAlign:'center'}}
                      >BTC</li>

                      <li className={`${styles.tabItem} ${activeKey==='ETH'?styles.activeTabItem:'' }`}
                      onClick = {this.switchNav.bind(this,'ETH')}
                      style={{width:80,textAlign:'center'}}
                      >ETH</li>
                      
                    </ul>
            </div>

            <div style={{background:'#ffffff',minHeight:500,marginTop:1,marginBottom:100}}>
                <div style={{width:1200,margin:'0 auto'}}>
                    
                    {/* BTC ETH 的摘要信息，涨跌 现货指数等 */}
                    <div style={{height:120,marginTop:30,display:'flex',justifyContent:'space-between'}}>
                            {/* 指数价格 */}
                            <div className={styles.card}>
                                    <div className={styles.description}>
                                        <div style={{marginTop:10,fontSize:16,color:'#333333',fontWeight:600}}>BTC指数</div>
                                        <div style={{marginTop:10,fontSize:24,color:'#00B662',fontWeight:600}}>$ 3,857.70</div>
                                        <div style={{marginTop:10,fontSize:12}}>
                                            <span style={{backgroundColor:'#00B662',color:'#ffffff',padding:'0 8px 0 8px',height:20,lineHeight:'20px',display:'inline-block'}}>
                                                +0.24%
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.chart}>
                                        <Chart height={52} data={data} scale={cols} width={282} padding={[0,0,0,0]}>
                                            <Geom type="area" position="year*value"  color='#F9F9F9'/>
                                            <Geom type="line" position="year*value"  color='#e9e9f0' style={{
                                            lineWidth:1}}/>
                                        </Chart>
                                    </div>
                            </div>
                            {/* BTC0222·当周最新成交价 */}
                            <div className={styles.card}>
                                    <div className={styles.description}>
                                        <div style={{marginTop:10,fontSize:16,color:'#333333',fontWeight:600}}>BTC0222·当周最新成交价</div>
                                        <div style={{marginTop:10,fontSize:24,color:'#00B662',fontWeight:600}}>$ 3,857.70</div>
                                        <div style={{marginTop:10,fontSize:12,}}>
                                            <span style={{backgroundColor:'#00B662',color:'#ffffff',padding:'0 8px 0 8px',height:20,lineHeight:'20px',display:'inline-block'}}>
                                                +0.24%
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.chart}>
                                        <Chart height={52} data={data} scale={cols} width={282} padding={[0,0,0,0]}>
                                            <Geom type="area" position="year*value"  color='#F9F9F9'/>
                                            <Geom type="line" position="year*value"  color='#e9e9f0' style={{
                                            lineWidth:1}}/>
                                        </Chart>
                                    </div>                                         
                            </div>
                            {/* BTC0301·当月最新成交价 */}
                            <div className={styles.card}>
                                <div className={styles.description}>
                                        <div style={{marginTop:10,fontSize:16,color:'#333333',fontWeight:600}}>BTC0301·当月最新成交价</div>
                                        <div style={{marginTop:10,fontSize:24,color:'#00B662',fontWeight:600}}>$ 3,857.70</div>
                                        <div style={{marginTop:10,fontSize:12}}>
                                            <span style={{backgroundColor:'#F25C48',color:'#ffffff',padding:'0 8px 0 8px',height:20,lineHeight:'20px',display:'inline-block'}}>
                                                +0.24%
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.chart}>
                                        <Chart height={52} data={data} scale={cols} width={282} padding={[0,0,0,0]}>
                                            <Geom type="area" position="year*value"  color='#F9F9F9'/>
                                            <Geom type="line" position="year*value"  color='#e9e9f0' style={{
                                            lineWidth:1}}/>
                                        </Chart>
                                    </div>           
                            </div>
                            {/* BTC0329·季度最新成交价 */}
                            <div className={styles.card}>
                                    <div className={styles.description}>
                                        <div style={{marginTop:10,fontSize:16,color:'#333333',fontWeight:600}}>BTC0329·季度最新成交价</div>
                                        <div style={{marginTop:10,fontSize:24,color:'#F25C48',fontWeight:600}}>$ 3,857.70</div>
                                        <div style={{marginTop:10,fontSize:12}}>
                                            <span style={{backgroundColor:'#F25C48',color:'#ffffff',padding:'0 8px 0 8px',height:20,lineHeight:'20px',display:'inline-block'}}>
                                                +0.24%
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.chart}>
                                        <Chart height={52} data={data} scale={cols} width={282} padding={[0,0,0,0]}>
                                            <Geom type="area" position="year*value"  color='#F9F9F9'/>
                                            <Geom type="line" position="year*value"  color='#e9e9f0' style={{
                                            lineWidth:1}}/>
                                        </Chart>
                                    </div>           
                            </div>
                    </div>

                    {/* 合约 */}
                    <div style={{height:60,lineHeight:'60px',fontWeight:600,fontSize:22,color:'#333333',boxShadow:'inset 0 -1px 0 0 #F0F1FA'}}> 合约</div>                         
                    {/* BTC信息 */}
                    <div>
                        <ul className={styles.ulTableList}>
                            <li className={styles.tableHead} >
                                <span style={{width:94}}>合约</span>
                                <span style={{width:80}}>最新价</span>
                                <span style={{width:60}}>涨跌幅</span>
                                <span style={{width:80}}>最高价</span>
                                <span style={{width:80}}>最低价</span>
                                <span style={{width:120}}>持仓量</span>
                                <span style={{width:110}}>持仓金额</span>
                                <span style={{width:120}}>24h成交量</span>
                                <span style={{width:120}}>24h成交金额</span>
                            </li>
                        </ul>
                        <div className={styles.devide}> BTC</div>
                        {/* 数据 */}
                        <ul className={styles.ulTableList}>
                            <li className={styles.tableHead} >
                                <span style={{width:94}}>BTC0222·当周</span>
                                <span style={{width:80}}>3,854.5 USD</span>
                                <span style={{width:60}}>-0.08%</span>
                                <span style={{width:80}}>3865.0 USD</span>
                                <span style={{width:80}}>3839.5 USD</span>
                                <span style={{width:120}}>68,604张 ≈1,779 BTC</span>
                                <span style={{width:110}}>6,860,400 USD</span>
                                <span style={{width:120}}>330,826张 ≈8,594 BTC</span>
                                <span style={{width:120}}>33,082,600 USD</span>
                            </li>
                            <li className={styles.tableHead} >
                                <span style={{width:94}}>BTC0301·当月</span>
                                <span style={{width:80}}>3,854.5 USD</span>
                                <span style={{width:60}}>-0.08%</span>
                                <span style={{width:80}}>3865.0 USD</span>
                                <span style={{width:80}}>3839.5 USD</span>
                                <span style={{width:120}}>68,604张 ≈1,779 BTC</span>
                                <span style={{width:110}}>6,860,400 USD</span>
                                <span style={{width:120}}>330,826张 ≈8,594 BTC</span>
                                <span style={{width:120}}>33,082,600 USD</span>
                            </li>
                            <li className={styles.tableHead} >
                                <span style={{width:94}}>BTC0329·季度</span>
                                <span style={{width:80}}>3,854.5 USD</span>
                                <span style={{width:60}}>-0.08%</span>
                                <span style={{width:80}}>3865.0 USD</span>
                                <span style={{width:80}}>3839.5 USD</span>
                                <span style={{width:120}}>68,604张 ≈1,779 BTC</span>
                                <span style={{width:110}}>6,860,400 USD</span>
                                <span style={{width:120}}>330,826张 ≈8,594 BTC</span>
                                <span style={{width:120}}>33,082,600 USD</span>
                            </li>
                        </ul> 
                        {/* ETH */}
                        <div className={styles.devide}> ETH</div>
                        <ul className={styles.ulTableList}>
                            <li className={styles.tableHead} >
                                <span style={{width:94}}>ETH0222·当周</span>
                                <span style={{width:80}}>3,854.5 USD</span>
                                <span style={{width:60}}>-0.08%</span>
                                <span style={{width:80}}>3865.0 USD</span>
                                <span style={{width:80}}>3839.5 USD</span>
                                <span style={{width:120}}>68,604张 ≈1,779 BTC</span>
                                <span style={{width:110}}>6,860,400 USD</span>
                                <span style={{width:120}}>330,826张 ≈8,594 BTC</span>
                                <span style={{width:120}}>33,082,600 USD</span>
                            </li>
                            <li className={styles.tableHead} >
                                <span style={{width:94}}>ETH0301·当月</span>
                                <span style={{width:80}}>3,854.5 USD</span>
                                <span style={{width:60}}>-0.08%</span>
                                <span style={{width:80}}>3865.0 USD</span>
                                <span style={{width:80}}>3839.5 USD</span>
                                <span style={{width:120}}>68,604张 ≈1,779 BTC</span>
                                <span style={{width:110}}>6,860,400 USD</span>
                                <span style={{width:120}}>330,826张 ≈8,594 BTC</span>
                                <span style={{width:120}}>33,082,600 USD</span>
                            </li>
                            <li className={styles.tableHead} >
                                <span style={{width:94}}>ETH0329·季度</span>
                                <span style={{width:80}}>3,854.5 USD</span>
                                <span style={{width:60}}>-0.08%</span>
                                <span style={{width:80}}>3865.0 USD</span>
                                <span style={{width:80}}>3839.5 USD</span>
                                <span style={{width:120}}>68,604张 ≈1,779 BTC</span>
                                <span style={{width:110}}>6,860,400 USD</span>
                                <span style={{width:120}}>330,826张 ≈8,594 BTC</span>
                                <span style={{width:120}}>33,082,600 USD</span>
                            </li>
                        </ul>                       
                    </div>
                </div>
            </div>
       </div>)
    }
}

export default IndexPage;